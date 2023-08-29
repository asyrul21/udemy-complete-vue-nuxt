import { WEBAPIKEY } from '../../../constants';
let timer;
export default {
  async logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
    });
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
  },
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'login' });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEBAPIKEY}`;
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEBAPIKEY}`;
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate.'
      );
      throw error;
    }

    // token expiration
    const expiresIn = +responseData.expiresIn * 1000; // turn seconds to miliseconds
    // const expiresIn = 5000; // for testing
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  async autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const newExpiresIn = +tokenExpiration - new Date().getTime();

    if (newExpiresIn < 0) {
      // token is expired
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, newExpiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'signup' });
  },
  async autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};

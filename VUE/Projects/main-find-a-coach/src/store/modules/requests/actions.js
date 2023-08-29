export default {
  async fetchRequests(context) {
    const userCoachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `https://udemy-vue-course-project-2a23d-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${userCoachId}.json?auth=${token}`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }
    const requests = [];
    for (const key in responseData) {
      const req = {
        id: key,
        coachId: userCoachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };
      requests.push(req);
    }
    context.commit('setRequests', requests);
  },
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const response = await fetch(
      `https://udemy-vue-course-project-2a23d-default-rtdb.asia-southeast1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }
    // set firebase id
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
};

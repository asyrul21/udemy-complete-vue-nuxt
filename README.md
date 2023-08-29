# Course Repository for Udemy Courses [Vue the Complete Guide](https://www.udemy.com/course/vuejs-2-the-complete-guide/) and [Nuxtjs - Vuejs on Steroids](https://www.udemy.com/course/nuxtjs-vuejs-on-steroids/)

For Vue the Complete Guide course, the main course Project has been deployed [here](https://udemy-vue-course-project-2a23d.web.app).

For the Nuxtjs course, the main course project has been deployed [here](https://udemy-nuxt-project-5c0db.web.app/).

## Deployment with Firebase

Instructions taken from [Official Firebase Guide](https://console.firebase.google.com/u/3/project/udemy-vue-course-project-2a23d/hosting/sites)

```bash
# 1
npm run build

# 2
npm install -g firebase-tools

# 3
firebase login

or

firebase login --reauth

# 4
firebase init

# 5
firebase deploy

```

## Issues

1. [firebase init : Error: Failed to list Firebase projects. See firebase-debug.log for more info](https://stackoverflow.com/questions/57941289/how-do-i-solve-error-failed-to-list-firebase-projects-see-firebase-debug-log)

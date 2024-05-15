import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import Store from '../store/index'

const routes = [
  {
   e is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/UserIndexView.vue'),
    meta: { requiresAuth: true }

  },
  {
    path: '/user/create',
    name: 'user_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserCreateView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/edit/:id',
    name: 'user_edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/UserEditView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/index',
    name: 'classroom_index',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexClassroomView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/create',
    name: 'classroom_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateClassroomView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/edit/:id',
    name: 'classroom_edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditClassroomView.vue'),
    props: true,
    meta: { requiresAuth: true }
  },
  {
    path: '/assignment/index',
    name: 'assignment_index',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexAssignmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/assignment/create',
    name: 'assignment_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateAssignmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/assignment/:id/edit',
    name: 'assignment_edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditAssignmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/assignment/:id/show/',
    name: 'assignment_show',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowAssignmentView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/join',
    name: 'classroom_join',
    component: () => import(/* webpackChunkName: "about" */ '../views/JoinClassroomView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/quiz/index',
    name: 'quiz_index',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexQuizView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/quiz/create',
    name: 'quiz_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateQuizView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/quiz/:id/edit',
    name: 'quiz_edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditQuizView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/quiz/:id/show/',
    name: 'quiz_show',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowQuizView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/report',
    name: 'report',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexReportView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/project/index',
    name: 'project_index',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexProjectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/project/create',
    name: 'project_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateProjectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/project/:id/show/',
    name: 'project_show',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowProjectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/project/:id/edit',
    name: 'project_edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/EditProjectView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lectures',
    name: 'lectures',
    component: () => import(/* webpackChunkName: "about" */ '../views/IndexLectureView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/lecture/create',
    name: 'lecture_create',
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateLectureView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/classroom/:classId/lecture/:id/show/',
    name: 'lecture_show',
    component: () => import(/* webpackChunkName: "about" */ '../views/ShowLectureView.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let routerAuthcheck = localStorage.getItem('token'); //add token
  if (routerAuthcheck) {
     // user is authenticated change the state to true
    Store.commit('setUserIsAuthenticated', routerAuthcheck);
    Store.commit('setUserData', JSON.parse(localStorage.getItem('user')));
  }
  if (to.matched.some(record => record.meta.requiresAuth)){
    //check if user is authenticated
    if (routerAuthcheck) {
     
      next()
    } else {
      router.push('/login')
    }
  } else {
    next();
  }
});

export default router

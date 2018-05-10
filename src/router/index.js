import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'


import Home from '@/pages/client/Home'
import Category from '@/pages/client/Category'
import ViewPost from '@/pages/client/ViewPost'
import Login from '@/pages/client/Login'
import Register from '@/pages/client/Register'

import Dashboard from '@/pages/dashboard/Dashboard'
import DashboardCategories from '@/pages/dashboard/DashboardCategories'
import EditCategory from '@/pages/dashboard/EditCategory'
import NewPost from '@/pages/dashboard/NewPost'
import EditPost from '@/pages/dashboard/EditPost'
import SliderEdit from '@/pages/dashboard/SliderEdit'
import NewSlide from '@/pages/dashboard/NewSlide'
import EditSlide from '@/pages/dashboard/EditSlide'
import NewCategory from '@/pages/dashboard/NewCategory'


Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/dashboard-categories',
      name: 'DashboardCategories',
      component: DashboardCategories,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/new-category',
      name: 'new-category',
      component: NewCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/slideredit',
      name: 'slideredit',
      component: SliderEdit,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/newslide',
      name: 'newslide',
      component: NewSlide,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/new',
      name: 'new-post',
      component: NewPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit/:post_id',
      name: 'edit-post',
      component: EditPost,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-category/:category_id',
      name: 'edit-category',
      component: EditCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/:category_id',
      name: 'category',
      component: Category,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:category_id/:post_id',
      name: 'view-post',
      component: ViewPost,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/editslide/:slide_id',
      name: 'editslide',
      component: EditSlide,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  NProgress.start();
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});
router.afterEach((to, from, next) => {
  NProgress.done();
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ContactUsView from '../subviews/ContactUsView.vue'
import PurposeView from '../subviews/PurposeView.vue'
import ServicesView from '../views/ServicesView.vue'
import FamilyViolence from '../subviews/FamilyViolence.vue'
import AgedCare from '../subviews/AgedCare.vue'
import DisabilitySupport from '../subviews/DisabilitySupport.vue'
import ResourcesView from '../views/ResourcesView.vue'
import PreventingViolence from '../subviews/PreventingViolence.vue'
import HealthResources from '../subviews/HealthResources.vue'
import News from '../subviews/News.vue'
import FAQ from '../subviews/FAQ.vue'
import JoinUsView from '../views/JoinUsView.vue'
import Volunteer from '../subviews/Volunteer.vue'
import Work from '../subviews/Work.vue'
import AdminView from '../views/AdminView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import store from '../store/store'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    children: [
      {
        path: 'purpose',
        name: 'OurPurpose',
        component: PurposeView
      },
      {
        path: 'contact-us',
        name: 'ContactUs',
        component: ContactUsView
      }
    ]
  },
  {
    path: '/services',
    name: 'OurServices',
    component: ServicesView,
    children: [
      {
        path: 'family-violence',
        name: 'FamilyViolence',
        component: FamilyViolence
      },
      {
        path: 'aged-care',
        name: 'AgedCare',
        component: AgedCare
      },
      {
        path: 'disability-support',
        name: 'DisabilitySupport',
        component: DisabilitySupport
      }
    ]
  },
  {
    path: '/resources',
    name: 'Resources',
    component: ResourcesView,
    children: [
      {
        path: 'preventing-violence',
        name: 'PreventingViolence',
        component: PreventingViolence
      },
      {
        path: 'health-resources',
        name: 'HealthResources',
        component: HealthResources
      },
      {
        path: 'news',
        name: 'News',
        component: News
      },
      {
        path: 'faq',
        name: 'FAQ',
        component: FAQ
      }
    ]
  },
  {
    path: '/join-us',
    name: 'JoinUs',
    component: JoinUsView,
    children: [
      {
        path: 'volunteer-with-us',
        name: 'VolunteerWithUs',
        component: Volunteer
      },
      {
        path: 'work-with-us',
        name: 'WorkWithUs',
        component: Work
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView
  },
  {
    path: '/login',
    name: 'Login',
    component: FirebaseSigninView
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: FirebaseRegisterView
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: LoginView
  // },
  // {
  //   path: '/sign-up',
  //   name: 'SignUp',
  //   component: SignUpView
  // },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: AccessDenied
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = store.state.isAuthenticated

//   // Allow access to Home and Login pages for everyone
//   if (to.name === 'Home' || (to.name === 'Login' && !isAuthenticated)) {
//     next() // Proceed to the route
//   }
//   // Redirect non-authenticated users to Login page for all other routes
//   // else if (!isAuthenticated) {
//   //     next({ name: 'Login' });
//   // }
//   // Redirect authenticated users away from AccessDenied page
//   else if (to.name === 'AccessDenied' && isAuthenticated) {
//     next({ name: 'Home' })
//   }
//   // Allow access to other routes for authenticated users
//   else {
//     next() // Proceed to the route
//   }
// })

// // Check if the target route requires authentication
// if (to.name !== 'Login' && to.name !== 'AccessDenied' && !isAuthenticated) {
//     // Redirect to the Login page if the user is not authenticated
//     next({ name: 'Login' });
// } else if (to.name === 'AccessDenied' && isAuthenticated) {
//     // Redirect authenticated users away from the AccessDenied page
//     next({ name: 'Home' });
// } else {
//     // Proceed to the target route
//     next();
// }
export default router

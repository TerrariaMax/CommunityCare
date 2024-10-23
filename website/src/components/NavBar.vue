<template>
  <CNavbar expand="lg" color-scheme="light" class="bg-light">
    <CContainer fluid>
      <CNavbarBrand>
        <router-link to="/" class="title" role="button">Community Care</router-link>
      </CNavbarBrand>
      <!-- <CNavItem>
        <router-link to="/about" class="title" active-class="active">Add Book </router-link>
      </CNavItem>
      <CNavItem>
        <router-link to="/resources" class="title" active-class="active"
          >Get Book Count
        </router-link>
      </CNavItem>
      <CNavItem>
        <router-link to="/join-us" class="title" active-class="active">Weather </router-link>
      </CNavItem> -->

      <CNavbarToggler @click="visible = !visible" />
      <CCollapse class="navbar-collapse navbar-custom" :visible="visible">
        <CNavbarNav class="responsive-col">
          <CDropdown variant="nav-item" :popper="false">
            <CDropdownToggle>
              <router-link to="/about" class="title" active-class="active">About Us</router-link>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem>
                <router-link to="/about/purpose" class="title" active-class="active"
                  >Our Purpose</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/about/contact-us" class="title" active-class="active"
                  >Contact Us</router-link
                >
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown variant="nav-item" :popper="false">
            <CDropdownToggle color="secondary"
              ><router-link to="/services" class="title" active-class="active"
                >Our Services</router-link
              ></CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem>
                <router-link to="/services/family-violence" class="title" active-class="active"
                  >Family Violence</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/services/aged-care" class="title" active-class="active"
                  >Aged Care</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/services/disability-support" class="title" active-class="active"
                  >Disability Support</router-link
                >
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown variant="nav-item" :popper="false">
            <CDropdownToggle color="secondary"
              ><router-link to="/resources" class="title" active-class="active"
                >Resources</router-link
              ></CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem>
                <router-link to="/resources/preventing-violence" class="title" active-class="active"
                  >Preventing Violence</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/resources/health-resources" class="title" active-class="active"
                  >Health Resources</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/resources/news" class="title" active-class="active"
                  >News</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/resources/faq" class="title" active-class="active"
                  >FAQ</router-link
                >
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown variant="nav-item" :popper="false">
            <CDropdownToggle color="secondary"
              ><router-link to="/join-us" class="title" active-class="active"
                >Join Us</router-link
              ></CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem>
                <router-link to="/join-us/volunteer-with-us" class="title" active-class="active"
                  >Volunteer With Us</router-link
                >
              </CDropdownItem>
              <CDropdownItem>
                <router-link to="/join-us/work-with-us" class="title" active-class="active"
                  >Work With Us</router-link
                >
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <CNavItem>
            <router-link v-if="isAdmin" to="/admin" color="secondary" class="title"
              >Admin</router-link
            >
          </CNavItem>
        </CNavbarNav>

        <CNavbarNav class="ms-auto">
          <CDropdown variant="nav-item" :popper="false" class="ms-2">
            <CDropdownToggle color="secondary">Lang</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">English</CDropdownItem>
              <CDropdownItem href="#">Chinese</CDropdownItem>
              <CDropdownItem href="#">Indonesia</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <router-link v-if="!isAuthenticated" to="/login" class="ms-2">
            <CButton type="submit" color="success" variant="outline">Login</CButton>
          </router-link>
          <router-link v-if="!isAuthenticated" to="/sign-up" class="ms-2">
            <CButton type="submit" color="success" variant="outline">Sign-up</CButton>
          </router-link>
          <CButton
            v-if="isAuthenticated"
            @click="handleLogout"
            type="submit"
            color="success"
            variant="outline"
            class="ms-2"
            >Log out</CButton
          >
        </CNavbarNav>
      </CCollapse>
    </CContainer>
  </CNavbar>
</template>

<script>
import { ref, onMounted } from 'vue'
import { mapState, mapActions } from 'vuex'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init.js' // Adjust the path as necessary

import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CButton
} from '@coreui/vue'

export default {
  components: {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CButton
  },
  setup() {
    const visible = ref(false)
    const isAuthenticated = ref(false)
    const auth = getAuth()
    const userRole = ref('')

    // Check the authentication state and fetch user role
    onMounted(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        console.log('Current User:', currentUser)
        if (currentUser) {
          isAuthenticated.value = true // Update authentication state
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          if (userDoc.exists()) {
            userRole.value = userDoc.data().role // Get the user's role
          }
        } else {
          isAuthenticated.value = false // Reset if user is logged out
          userRole.value = ''
        }
      })
    })

    return {
      visible,
      userRole,
      isAuthenticated
    }
  },
  computed: {
    // ...mapState(['isAuthenticated']),
    isAdmin() {
      return this.userRole === 'Admin'
    },
    isAuthenticated() {
      return this.$store.state.isAuthenticated
    }
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      if (window.confirm('Are you sure you want to log out?')) {
        await this.logout() // Ensure logout action is awaited
        console.log('isAuthenticated after logout:', this.$store.state.isAuthenticated)
        this.$router.push({ name: 'Login' }) // Redirect to login page
      }
    }
  }
}
</script>

<style scoped>
.title {
  color: inherit;
  text-decoration: none;
}
</style>
<!-- <script>
import { ref, onMounted } from 'vue'
import { mapState, mapActions } from 'vuex'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import db from '../firebase/init.js' // Adjust the path as necessary

import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
  CButton
} from '@coreui/vue'

export default {
  components: {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
    CForm,
    CFormInput,
    CButton
  },
  setup() {
    const visible = ref(false)
    const isAuthenticated = ref()
    const auth = getAuth()
    const userRole = ref('') // To store the user's role

    // Check the authentication state and fetch user role
    onMounted(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        console.log('Current User:', currentUser)
        if (currentUser) {
          // isAuthenticated.value = true
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
          if (userDoc.exists()) {
            userRole.value = userDoc.data().role // Get the user's role
          }
        } else {
          userRole.value = '' // Reset role if user is logged out
          console.log('isAuthenticated:', isAuthenticated.value)
        }
      })
    })

    return {
      visible,
      userRole,
      isAuthenticated
    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    isAdmin() {
      return this.userRole === 'Admin' // Adjust based on your Firestore data
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      if (window.confirm('Are you sure you want to log out?')) {
        this.logout()
        // this.isAuthenticated = !this.isAuthenticated
        // console.log('isAuthenticated after logout:', this.$store.state.isAuthenticated)
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script> -->

<!-- <script>
import { ref } from 'vue'
import { mapState, mapActions } from 'vuex'
import { mapGetters } from 'vuex'

import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CNavbarToggler,
  CCollapse,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CDropdownDivider,
  CForm,
  CFormInput,
  CButton
} from '@coreui/vue'

export default {
  components: {
    CNavbar,
    CContainer,
    CNavbarBrand,
    CNavbarToggler,
    CCollapse,
    CNavbarNav,
    CNavItem,
    CNavLink,
    CDropdown,
    CDropdownToggle,
    CDropdownMenu,
    CDropdownItem,
    CDropdownDivider,
    CForm,
    CFormInput,
    CButton
  },
  setup() {
    const visible = ref(false)
    return {
      visible
    }
  },
  computed: {
    ...mapState(['isAuthenticated']),
    ...mapGetters(['userRole']),
    isAdmin() {
      return this.userRole === 'Admin'
    }
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      if (window.confirm('Are you sure you want to log out?')) {
        this.logout()
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script> -->

<style scoped>
.title {
  color: inherit;
  text-decoration: none;
}
</style>

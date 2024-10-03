<template>
  <CNavbar expand="lg" color-scheme="light" class="bg-light">
    <CContainer fluid>
      <CNavbarBrand>
        <router-link to="/" class="title" role="button">Community Care</router-link>
      </CNavbarBrand>
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
            <router-link v-if="isAdmin" to="/admin" class="title" active-class="active"
              >Admin</router-link
            >
          </CNavItem>
        </CNavbarNav>

        <CNavbarNav class="ms-auto">
          <!-- <CForm class="d-flex">
            <CFormInput type="search" class="me-2" placeholder="Search" />
          </CForm> -->
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
</script>

<style scoped>
.title {
  color: inherit;
  text-decoration: none;
}
</style>

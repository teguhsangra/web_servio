<template>
  <header
    class="header_area"
    v-if="
      $route.path != '/login' &&
      $route.path != '/forgot-password' &&
      $route.path != '/reset-password'
    "
  >
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <!-- Brand and toggle get grouped for better mobile display -->
        <router-link :to="{ path: '/' }" class="navbar-brand logo_h">
          <img src="../assets/logo.png" alt="" :width="160" :height="40" />
        </router-link>

        <button
          class="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div
          class="navbar-collapse offset collapse"
          id="navbarSupportedContent"
        >
          <ul class="nav navbar-nav menu_nav ml-auto">
            <li
            v-if="currentMember"
              class="nav-item"
              :class="[$route.name === 'my-booking' ? 'active' : '']"
            >
              <router-link :to="{ path: '/my-booking' }">
                <a class="nav-link">Booking</a>
              </router-link>
            </li>
            <li
            v-if="currentMember"
              class="nav-item"
              :class="[$route.name === 'membership' ? 'active' : '']"
            >
              <router-link :to="{ path: '/membership' }">
                <a class="nav-link">Membership</a>
              </router-link>
            </li>
            <li v-else  class="nav-item">
              <a class="nav-link" @click="logOut()">Back to MyServio</a>
            </li>

            <li class="nav-item submenu dropdown" v-if="currentMember">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-toggle="dropdown"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  {{ currentUser.user.name }}
                </div>
              </a>
              <ul class="dropdown-menu">
                <li
                  class="nav-item"
                  :class="[$route.name === 'profile' ? 'active' : '']"
                >
                  <router-link :to="{ path: '/profile' }">
                    <a class="nav-link">Profile</a>
                  </router-link>
                </li>

                <li class="nav-item">
                  <a class="nav-link" @click.prevent="logOut">Logout</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  name: "nav-bar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentMember() {
      return this.$store.state.auth.status.isMember;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
};
</script>

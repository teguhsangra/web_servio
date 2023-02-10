<template>
  <div class="container-fluid bg-mobile">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-8 d-none d-md-flex bg-image"></div>

      <!-- The content half -->
      <div class="col-md-4 bg-login">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container bg-mobile-login">
            <div class="row">
              <div class="col-lg-10 col-xl-10 mx-auto">
                <h2 class="text-center text-white">Login</h2>
                <a v-if="isMember"
                @click="changeLoginStatus()"
                  type="submit"
                  class="
                    btn btn-outline-secondary
                    text-uppercase
                    mt-3
                    mb-2
                    shadow-sm
                    text
                  "
                  style="font-weight: 600"
                >
                  <span class="fa fa-arrow-left"></span>
                </a>
                <form v-if="isMember" class="mt-5" @submit.prevent="userLogin">
                  <div class="form-group mb-3">
                    <input
                      v-model="user.email"
                      id="inputEmail"
                      type="email"
                      placeholder="Email address"
                      required=""
                      autofocus=""
                      class="form-control border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <div class="input-group" id="show_hide_password">
                      <input
                        v-model="user.password"
                        id="inputPassword"
                        :type="type"
                        placeholder="Password"
                        required=""
                        class="
                          form-control
                          border-0
                          shadow-sm
                          px-4
                          text-primary
                        "
                      />
                      <div class="input-group-addon">
                        <a @click="showPassword()"
                          ><i :class="icon" aria-hidden="true"></i
                        ></a>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-5 mb-3">
                    <div class="col-md-7">
                      <div class="custom-control custom-checkbox">
                        <input
                          id="customCheck1"
                          type="checkbox"
                          checked
                          class="custom-control-input"
                        />
                        <label
                          for="customCheck1"
                          class="custom-control-label text-white"
                          >Remember me</label
                        >
                      </div>
                    </div>
                    <div class="col-md-5">
                      <span class="ml-auto" style="text-align: ">
                        <router-link :to="{ path: '/forgot-password' }">
                          <span> forgot-password</span>
                        </router-link>
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="
                      btn btn-warning btn-block
                      text-uppercase
                      mt-3
                      mb-2
                      shadow-sm
                      text
                    "
                    style="font-weight: 600"
                    :disabled="loading"
                  >
                    <span
                      v-show="loading"
                      class="spinner-border spinner-border-sm"
                    ></span>
                    Login
                  </button>
                  <div class="form-group mt-5">
                    <p class="ml-auto text-white text-center">
                      "Please aquire your username & password to our customer
                      service representative"
                    </p>
                  </div>
                </form>
                <div v-else>
                    <a
                    @click="loginStatus('guest')"
                    type="submit"
                    class="
                      btn btn-block btn-outline-primary
                      text-uppercase
                      mt-3
                      mb-2
                      shadow-sm
                      text
                    "
                    style="font-weight: 600"
                  >
                    Login as guest
                  </a>

                    <a
                    @click="loginStatus('member')"
                      type="submit"
                      class="
                        btn btn-warning btn-block
                        text-uppercase
                        mt-3
                        mb-2
                        shadow-sm
                        text
                      "
                      style="font-weight: 600"
                      :disabled="loading"
                    >
                      Login as member
                    </a>
                </div>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "login-page",
  data() {
    return {
      isMember:false,
      loading: false,
      user: {
        email: "",
        password: "",
      },
      type: "password",
      showOrHide: "Show",
      icon: "fa fa-eye-slash",
      message: "",
    };
  },
  methods: {
    closeAlert: function () {
      this.alertOpen = false;
    },
    loginStatus(status){
      if(status == 'guest'){
        this.$store.dispatch("auth/guest").then( 
        (res) => {
            
            if(res == true){
              this.$router.push("/");
            }
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            text: "Email atau password anda salah",
            icon: "warning",
            customClass: {
              confirmButton: "btn fw-bold btn-danger",
            },
          });
        }
      );
      }else if(status == 'member'){
        console.log(status);
        this.isMember = true;
      }
    },
    changeLoginStatus(){
      this.isMember = false;
    },
    userLogin() {
      this.loading = true;

      this.$store.dispatch("auth/login", this.user).then(
        () => {
          this.$router.push("/");
        },
        (error) => {
          this.loading = false;
          Swal.fire({
            text: "Email atau password anda salah",
            icon: "warning",
            customClass: {
              confirmButton: "btn fw-bold btn-danger",
            },
          });
        }
      );
    },
    showPassword: function () {
      if (this.type == "password") {
        this.type = "text";
        this.showOrHide = "Hide";
        this.icon = "fa fa-eye";
      } else {
        this.type = "password";
        this.showOrHide = "Show";
        this.icon = "fa fa-eye-slash";
      }
    },
  },
};
</script>
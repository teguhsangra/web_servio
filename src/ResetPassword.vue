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
                <h2 class="text-center text-white">Forgot Password</h2>

                <form class="mt-5" @submit.prevent="submitForgot">
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
                    <div
                      class="invalid-feedback"
                      v-if="errors.password"
                      :class="{ 'd-block': errors.password }"
                    >
                      {{ errors.password }}
                    </div>
                  </div>

                  <div class="form-group mb-3">
                    <div class="input-group" id="show_hide_password">
                      <input
                        v-model="user.confirmPassword"
                        id="inputPassword"
                        type="password"
                        placeholder="Repeat Password"
                        required=""
                        class="
                          form-control
                          border-0
                          shadow-sm
                          px-4
                          text-primary
                        "
                      />
                      <div
                        class="invalid-feedback"
                        v-if="errors.password_confirmation"
                        :class="{ 'd-block': errors.password_confirmation }"
                      >
                        {{ errors.password_confirmation }}
                      </div>
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
                    Confirm Password
                  </button>
                  <div class="form-group mt-5">
                    <p class="ml-auto text-white text-center">
                      "Please aquire your username & password to our customer
                      service representative"
                    </p>
                  </div>
                </form>
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
import UserService from "./services/user.service";
import Swal from "sweetalert2";
export default {
  name: "reset-page",
  data() {
    return {
      loading: false,
      user: {
        email: "",
        password: "",
        confirmPassword: "",
        token: "",
      },
      type: "password",
      showOrHide: "Show",
      icon: "fa fa-eye-slash",
      errors: {},
    };
  },
  mounted: function mounted() {
    let data = this.$route.query;
    this.user.email = decodeURIComponent(data.email);
    this.user.token = data.token;
  },
  methods: {
    closeAlert: function () {
      this.alertOpen = false;
    },
    submitForgot() {
      this.loading = true;
      UserService.sendResetPassword(this.user).then(
        (response) => {
          Swal.fire({
            text: "Your password has been changed!",
            icon: "success",
            customClass: {
              confirmButtonText: "Ok",
              confirmButton: "btn btn-success",
            },
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.$router.push("/login");
            } else if (result.isDenied) {
              this.$router.push("/login");
            }
          });
        },
        (error) => {
          this.loading = false;
          this.errors = error.response.data.errors;
          Swal.fire({
            text: error.response.data.message,
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
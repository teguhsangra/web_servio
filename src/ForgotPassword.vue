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
                    Send Reset Password
                  </button>
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
import Swal from "sweetalert2";
import UserService from "./services/user.service";
export default {
  name: "forgot-page",
  data() {
    return {
      loading: false,
      user: {
        email: "",
      },
      type: "password",
      showOrHide: "Show",
      icon: "fa fa-eye-slash",
      errors: {},
    };
  },
  methods: {
    closeAlert: function () {
      this.alertOpen = false;
    },
    submitForgot() {
      this.loading = true;
      UserService.sendForgotPassword(this.user).then(
        (response) => {
          this.$router.push("/login");
        },
        (error) => {
          this.loading = false;

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
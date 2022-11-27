<template>
  <div>
    <!-- section content booking -->
    <section class="breadcrumb_area" style="min-height: 100vh">
      <div
        class="overlay bg-parallax"
        data-stellar-ratio="0.8"
        data-stellar-vertical-offset="0"
        data-background=""
        style="transform: translateY(0.544322px)"
      ></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div
              class="card"
              style="
                background: #2d4253;

                box-shadow: 0px 8px 35px rgba(0, 0, 0, 0.16);
                border-radius: 16px;
              "
            >
              <div class="card-header">
                <h4 class="text-white">Profile</h4>
              </div>
              <div class="card-body mt-3">
                <form @submit.prevent="updateProfile">
                  <div class="row">
                    <div class="col-md-12">
                      <div class="book_select_item">
                        <Label class="text-white">Name</Label>
                        <div class="input-group">
                          <input
                            v-model="form.name"
                            type="text"
                            class="form-control"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <div class="book_select_item">
                        <Label class="text-white">Phone number</Label>
                        <div class="input-group">
                          <input
                            v-model="form.mobile_phone"
                            type="tel"
                            class="form-control"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <div class="book_tabel_item">
                        <br />
                        <button
                          type="submit"
                          class="btn btn-lg btn-block btn-warning"
                          style="margin-top: 10px"
                        >
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end section content booking -->
  </div>
</template>
<script>
import UserService from "../services/user.service";
import Swal from "sweetalert2";
export default {
  name: "profile-page",
  data() {
    return {
      form: {
        user_id: "",
        name: "",
        mobile_phone: "",
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted: function mounted() {
    this.form.user_id = this.currentUser.user.id;
    this.form.name = this.currentUser.user.contact.name;
    this.form.mobile_phone = this.currentUser.user.contact.mobile_phone;
  },
  methods: {
    updateProfile() {
      UserService.updateProfile(this.form).then(
        (response) => {
          Swal.fire({
            text: "Your name and mobile phone has been changed!",
            icon: "success",
            customClass: {
              confirmButtonText: "Ok",
              confirmButton: "btn btn-success",
            },
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.getProfile();
            } else if (result.isDenied) {
              this.getProfile();
            }
          });
        },
        (error) => {
          this.content =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    },
    getProfile() {
      this.$store.dispatch("auth/me", this.form.user_id).then(
        () => {
          window.location.reload();
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
  },
};
</script>
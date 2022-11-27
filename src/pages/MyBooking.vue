<template>
  <div>
    <section class="booking_area">
      <div class="frame-location"></div>

      <div class="hotel_booking_area">
        <div class="container mx-auto">
          <div class="row d_flex justify-content-center">
            <div class="col-md-12">
              <div class="booking-area-table">
                <div class="boking_table text-center">
                  <div class="row d_flex" style="flex-wrap: nowrap">
                    <div class="col-md-6">
                      <h3 class="label-booking">Booking History</h3>
                    </div>
                    <div class="col-md-6">
                      <button
                        class="btn btn-light text-location dropdown-toggle"
                        type="button"
                        data-toggle="modal"
                        data-target="#modalFilter"
                      >
                        <i class="fa fa-th-large"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- end section content booking -->
    <section
      class="breadcrumb_area"
      style="padding: 51px 0px 84px !important; min-height: 100vh"
    >
      <div class="overlay bg-parallax"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div
            class="col-md-8 align-items-center mb-2"
            v-for="item in bookings"
            :key="item.id"
          >
            <div class="bg-servio shadow-5-strong p-5">
              <div class="row" style="flex-wrap: nowrap">
                <div class="col-md-5">
                  <h4 class="text-white">
                    <div v-if="item.room_category_id == 2">Meeting Room</div>
                    <div v-else>Co Working</div>
                  </h4>
                </div>
                <div class="col-md-5">
                  <p class="text-white">
                    {{ date(item.start_date) }}
                  </p>
                </div>
                <div class="col-md-2">
                  <h4>
                    <div v-if="item.status_name == 'open'">
                      <span class="badge badge-warning">On Process</span>
                    </div>
                    <div v-else-if="item.status_name == 'posted'">
                      <span class="badge badge-primary">Booked</span>
                    </div>
                    <div v-else-if="item.status_name == 'complete'">
                      <span class="badge badge-success">Done</span>
                    </div>
                  </h4>
                </div>
              </div>
              <hr class="vl" width="100%" />
              <div class="row" style="flex-wrap: nowrap">
                <div class="col-md-12">
                  <h4 class="text-white">{{ item.code }}</h4>
                  <p class="text-white">{{ item.cutomer_name }}</p>
                </div>
              </div>
              <div class="row d_flex align-items-center">
                <div class="col-md-10">
                  <p class="text-white">
                    Total Price
                    <br />
                    <b class="text-white font-weight-bold"
                      >Rp.{{
                        formatPrice(item.total_price + item.total_tax_price)
                      }}</b
                    >
                  </p>
                </div>
                <div class="col-md-2">
                  <button
                    type="button"
                    class="btn btn-block btn-light"
                    @click="bookingDetail(item.id)"
                    data-toggle="modal"
                    data-target="#modalDetail"
                  >
                    Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
      id="modalDetail"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style="background: #2d4253; border-radius: 16px; color: white"
        >
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalCenterTitle">
              Detail Booking
            </h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              style="color: white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-md-12">
                <table class="table table-borderless">
                  <tr class="text-white">
                    <td width="50%" class="text-left">Customer</td>
                    <td width="50%" class="text-left">
                      {{ booking_detail.name }}
                    </td>
                  </tr>
                  <tr class="text-white">
                    <td width="50%" class="text-left">Service</td>
                    <td width="50%" class="text-left">
                      {{ booking_detail.service }}
                    </td>
                  </tr>
                  <tr
                    v-for="item in booking_detail.room"
                    v-bind:key="item.id"
                    class="text-white"
                  >
                    <td width="50%" class="text-left">Room</td>
                    <td width="50%" class="text-left">
                      {{ item.room_number }}
                    </td>
                  </tr>
                  <tr class="text-white">
                    <td width="50%" class="text-left">Date</td>
                    <td width="50%" class="text-left">
                      {{ date(booking_detail.start_date) }} -
                      {{ date(booking_detail.end_date) }}
                    </td>
                  </tr>
                  <tr
                    class="text-white"
                    v-if="
                      booking_detail.start_time != null &&
                      booking_detail.end_time != null
                    "
                  >
                    <td width="50%" class="text-left">Time</td>
                    <td width="50%" class="text-left">
                      {{ booking_detail.start_time }} -
                      {{ booking_detail.end_time }}
                    </td>
                  </tr>
                  <tr class="text-white">
                    <td width="50%" class="text-left">Hour (s)</td>
                    <td width="50%" class="text-left">
                      {{ booking_detail.length_of_term }}
                    </td>
                  </tr>
                  <tr class="text-white">
                    <td width="50%" class="text-left">Total Price</td>
                    <td width="50%" class="text-left">
                      Rp. {{ formatPrice(booking_detail.total_price) }}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-md btn-warning"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="modalFilter"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      style="display: none"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalCenterTitle">Filter</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              style="color: white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleDropdownFormEmail2">Location:</label>
                  <div class="input-group">
                    <select
                      class="selectpicker form-control"
                      id="select_location"
                      v-model="search.location"
                    >
                      <option value="" selected>Select Location</option>
                      <option
                        v-for="item in locations"
                        v-bind:value="item.id"
                        v-bind:key="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleDropdownFormEmail2">Product:</label>
                  <div class="input-group">
                    <select
                      class="selectpicker form-control"
                      v-model="search.service_type"
                      data-size="5"
                      data-style="select-with-transition"
                      data-show-subtext="true"
                      data-live-search="true"
                    >
                      <option value="" selected>Select Service</option>
                      <option
                        v-for="item in service_type"
                        v-bind:value="item.id"
                        v-bind:key="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleDropdownFormEmail2">Customer:</label>
                  <div class="input-group">
                    <select
                      v-model="search.customer_id"
                      class="selectpicker form-control"
                      style="z-index: 999"
                      required
                      @change="getComplimentary()"
                    >
                      <option value="" selected>Select Customer</option>
                      <option
                        v-for="item in customer"
                        v-bind:value="item.id"
                        v-bind:key="item.id"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleDropdownFormPassword2">Date</label>
                  <div class="input-group date">
                    <input
                      v-model="search.date"
                      type="date"
                      class="form-control"
                      placeholder="Date"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-md btn-warning"
              data-dismiss="modal"
              @click="reloadPage()"
            >
              Reset
            </button>
            <a class="btn btn-primary" @click="filters()" data-dismiss="modal">
              Apply
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import UserService from "../services/user.service";
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
export default {
  name: "my-booking",
  secret: "123#$%",
  data() {
    return {
      locations: [],
      service_type: [],
      customer: [],
      bookings: [],
      search: {
        location: "",
        service_type: 2,
        customer_id: "",
        date: "",
      },
      booking_detail: {},
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {
    let data = this.$route.params;
    if (data.status) {
      this.$toast.success("Success Booking room.");
    }
    UserService.getDataLocations().then(
      (response) => {
        var data = response.data.data;
        this.locations = data;
        // this.content = response.data;
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
    UserService.getDataServiceType().then(
      (response) => {
        var data = response.data.data;
        this.service_type = data;
        // this.content = response.data;
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
    UserService.getDataContact().then(
      (response) => {
        var data = response.data.data;
        this.customer = data;
        this.search.customer_id = data[0].id;
        UserService.getDataBooking(this.search).then(
          (response) => {
            var data = response.data.data;
            this.bookings = data;
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
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    moment: function (date) {
      return moment(date);
    },
    date: function (date) {
      return moment(date).format("MMMM Do YYYY");
    },
    filters() {
      UserService.getDataBooking(this.search).then(
        (response) => {
          var data = response.data.data;
          this.bookings = data;
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
    reloadPage() {
      window.location.reload();
    },
    bookingDetail(id) {
      UserService.getDataBookingDetail(id).then(
        (response) => {
          var data = response.data.data;
          this.booking_detail = data;
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
  },
};
</script>
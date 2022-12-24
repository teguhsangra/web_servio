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
                <h4 class="text-white">Membership</h4>
              </div>
              <div class="card-body mt-3">
                <div class="row">
                  <div class="col-md-12">
                    <div class="book_select_item">
                      <Label class="text-white">Select Customer</Label>
                      <div class="input-group">
                        <select
                          v-model="data.customer_id"
                          class="selectpicker form-control"
                          style="z-index: 999"
                          required
                          @change="getBooking()"
                        >
                          <option value="" selected>Select Customer</option>
                          <option
                            v-for="item in customers"
                            v-bind:value="item.id"
                            v-bind:key="item.id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 mt-3">
                    <div class="book_select_item">
                      <Label class="text-white">Select Booking</Label>
                      <div class="input-group">
                        <select
                          v-model="data.booking_id"
                          class="selectpicker form-control"
                          style="z-index: 999"
                          required
                          @change="bookingDetail()"
                        >
                          <option value="" selected>Select Booking</option>
                          <option
                            v-for="item in bookings"
                            v-bind:value="item.id"
                            v-bind:key="item.id"
                          >
                            {{ item.code }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="row d-flex align-items-center justify-content-center"
                  v-if="booking_detail != ''"
                >
                  <div class="col-md-12 mt-5">
                    <table class="table table-borderless">
                      <tr class="text-white">
                        <td width="50%" class="text-left">Client</td>
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
                        class="text-white"
                        v-for="item in booking_detail.room"
                        v-bind:key="item.id"
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
                          Rp. {{ formatPrice(booking_detail.total_price+booking_detail.total_tax_price) }}
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
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
import moment from "moment";
import UserService from "../services/user.service";
export default {
  name: "membership",
  data() {
    return {
      customers: [],
      bookings: "",
      booking_detail: "",
      data: {
        customer_id: "",
        booking_id: "",
      },
    };
  },
  computed: {},
  mounted: function mounted() {
    UserService.getDataContact().then(
      (response) => {
        var data = response.data.data;
        this.customers = data;
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
    getBooking() {
      if (this.data.customer_id != "") {
        UserService.getDataBookingActive(this.data.customer_id).then(
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
      }
    },
    bookingDetail() {
      if (this.data.booking_id != "") {
        UserService.getDataBookingDetail(this.data.booking_id).then(
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
      }
    },
  },
};
</script>
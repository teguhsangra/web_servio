<template>
  <div>
    <!-- section content booking -->
    <section class="breadcrumb_area">
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
                <h4 class="text-white">Make a Booking</h4>
              </div>
              <div class="card-body mt-3">
                <form @submit.prevent="postBooking">

                  <div class="row" v-if="currentMember">
                    <div class="col-md-12">
                      <div class="book_select_item">
                        <Label class="text-white">Customer  <span style="color:red">*</span></Label>
                        <div class="input-group">
                          <select
                            v-model="form.customer_id"
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
                  </div>
                  <div
                    class="row"
                    v-if="complimentary.total_available_complimentary > 0 && currentMember"
                  >
                    <div class="col-md-12 mt-3">
                      <div class="book_select_item">
                        <Label class="text-white">Complimentary</Label>
                        <div class="input-group">
                          <input
                            v-model="form.total_use_complimentary"
                            type="number"
                            min="0"
                            class="form-control"
                            required
                            @change="countPrice()"
                          />
                          <div
                            class="valid-feedback"
                            style="display: block; color: #23d366"
                          >
                            Balance This Month
                            {{ complimentary.total_available_complimentary }}
                            Hours
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row" v-if="currentMember">
                    <div class="col-md-12 mt-3">
                      <div class="book_select_item">
                        <Label class="text-white">Select Contact</Label>
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            :value="contact_name"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="currentMember == false">
                    <div class="row">
                      <div class="col-md-12 mt-3">
                        <div class="book_select_item">
                          <Label class="text-white">Name Guest <span style="color:red">*</span> </Label>
                          <div class="input-group">
                            <input
                              v-model="form.customer_name"
                              type="text"
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 mt-3">
                        <div class="book_select_item">
                          <Label class="text-white">Email Guest  <span style="color:red">*</span></Label>
                          <div class="input-group">
                            <input
                              v-model="form.customer_email"
                              type="text"
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 mt-3">
                        <div class="book_select_item">
                          <Label class="text-white">Phone Guest  <span style="color:red">*</span></Label>
                          <div class="input-group">
                            <input
                              v-model="form.customer_phone"
                              type="number"
                              class="form-control"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- <div class="row mt-2">
                    <div class="col-md-12">
                      <div class="book_select_item">
                        <Label class="text-white">Select Room</Label>
                        <div class="input-group">
                          <select
                            v-model="form.room_id"
                            class="selectpicker form-control"
                            style="z-index: 999"
                            required
                            @change="getData()"
                          >
                            <option value="" selected>Select Room</option>
                            <option
                              v-for="item in room"
                              v-bind:value="item.id"
                              v-bind:key="item.id"
                            >
                              {{ item.room_number }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div> -->

                  <div class="row">
                    <div class="col-md-12 mt-3">
                      <div class="book_select_item">
                        <Label class="text-white">Select Date</Label>
                        <div class="form-group">
                          <div class="input-group date">
                            <input
                              v-model="form.start_date"
                              type="date"
                              class="form-control"
                              placeholder="Date"
                              required
                              @change="checkAvail()"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-4">
                      <div class="book_select_item">
                        <Label class="text-white">Start time</Label>
                        <div class="form-group">
                          <div class="input-group date">
                            <input
                              v-model="form.start_time"
                              type="time"
                              class="form-control timepicker text-center"
                              required
                              @change="changePeriod('start_time')"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div class="col-md-4">
                      <div class="book_select_item">
                        <Label class="text-white">End time</Label>
                        <div class="form-group">
                          <div class="input-group date">
                            <input
                              v-model="form.end_time"
                              type="time"
                              class="form-control"
                              required
                              @change="changePeriod('end_time')"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="book_select_item">
                        <Label class="text-white">Hour(s)</Label>
                        <div class="form-group">
                          <div class="input-group date">
                            <input
                              v-model="form.length_of_term"
                              type="number"
                              class="form-control"
                              placeholder="Hour"
                              min="1"
                              required
                              @change="changePeriod('length_of_term')"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card mt-5">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-4">
                          <img v-if="rooms.default_photo != null"
                          class="img-fluid frame-img"
                          :src="'https://servio.rakomsis.com/'+rooms.default_photo"  width="200" height="200"
                          alt="img"
                          />
                          <img v-else class="img-fluid frame-img"
                          src="../assets/image/banner/banner.jpeg"
                          alt="img" />
                        </div>
                        <div class="col-md-8">
                          <h3 style="color:black">{{ rooms.room_number }}</h3>
                          <p style="font-size:14px">
                            Time: {{form.start_time+' - '+form.end_time}}
                            <br>
                            {{form.length_of_term}} Hour(s)
                            <br>
                           <p> Room price: Rp.  <font style="font-weight:bold">{{ formatPrice(rooms.hourly_price) }}</font></p>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card mt-2">
                    <div class="card-body">
                      <div class="row">
                        <div class="col-md-12 mt-2">
                          <h5 style="color:black">Pricing details</h5>
                          <hr>
                          <table width="100%" class="table table-borderless">
                            <tr>
                              <td style="padding-top: 1px;padding-bottom: 1px;">
                                  <b style="color:black">TOTAL RENT</b>
                              </td>
                              <td class="text-right" style="padding-top: 1px;padding-bottom: 1px;">
                                  <b style="color:black">Rp.{{ formatPrice(form.detail_price*form.length_of_term) }}</b>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 1px;padding-bottom: 1px;">
                                  Tax (VAT/PPN) <span class="text-right">({{ formatPrice(tax_percentage*100) }}%)</span>
                              </td>
                              <td class="text-right" style="padding-top: 1px;padding-bottom: 1px;">
                                  Rp.{{ formatPrice(form.total_tax_price) }}
                              </td>
                            </tr>
                            <tr>
                              <td style="padding-top: 1px;padding-bottom: 1px;"><b>Total Amount Due</b></td>
                              <td class="text-right" style="padding-top: 1px;padding-bottom: 1px;"><b>Rp.{{ formatPrice(grand_total) }}</b></td>
                          </tr>
                          </table>
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
                          Booking
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
import moment from "moment";
import UserService from "../services/user.service";
import RoomService from "../services/room.service";
import Swal from "sweetalert2";
export default {
  name: "booking",
  data() {
    return {
      customer: [],
      contact_name: "",
      secret: "123#$%",
      room: [],
      complimentary: "",
      status: null,
      office_hour_end: 17,
      length_of_term_after_office: 0,
      tax_percentage: 0.11,
      grand_total:0,
      rooms : {},
      form: {
        location_id: "",
        customer_id: "",
        customer_status: 'N',
        contact_new_status:'Y',
        contact_id: "",
        customer_name:"",
        customer_type:"COM",
        customer_email:"",
        customer_phone:"",
        contact_status:"same_with_customer",
        status_booking:"not_member",
        room_category_id: "",
        room_id: "",
        start_date: "",
        start_time: "",
        end_time: "",
        length_of_term: "",
        detail_price: 0,
        tax_status: "exclude",
        total_price: 0,
        total_tax_price: 0,
        complimentary_id: "",
        total_use_complimentary: 0,
        after_office_hourly_price: 0,
      },
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentMember() {
      return this.$store.state.auth.status.isMember;
    },
  },
  mounted: function mounted() {
    let data = this.$route.query;

    let room_id = this.$CryptoJS.AES.decrypt(data.roomId, "123#$%").toString(
      this.$CryptoJS.enc.Utf8
    );
    this.form.room_id = room_id;

    let room_category_id = this.$CryptoJS.AES.decrypt(
      data.roomCategory,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);
    this.form.room_category_id = room_category_id;

    let location_id = this.$CryptoJS.AES.decrypt(
      data.locationId,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);
    this.form.location_id = location_id;

    let start_date = this.$CryptoJS.AES.decrypt(data.date, "123#$%").toString(
      this.$CryptoJS.enc.Utf8
    );
    this.form.start_date = start_date;

    let start_time = this.$CryptoJS.AES.decrypt(
      data.startTime,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);
    this.form.start_time = start_time;

    let end_time = this.$CryptoJS.AES.decrypt(data.endTime, "123#$%").toString(
      this.$CryptoJS.enc.Utf8
    );
    this.form.end_time = end_time;
    if(this.currentMember){
      this.form.customer_status = 'Y';
      this.form.contact_status = 'N';
      this.form.status_booking = "member";
      this.form.contact_id = this.currentUser.user.contact.id;
      this.contact_name = this.currentUser.user.contact.name;


        UserService.getDataContact().then(
        (response) => {
          var data = response.data.data;
          this.customer = data;
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
    
    UserService.getDataRooms(location_id, room_category_id).then(
        (response) => {
          var data = response.data.data;
          this.room = data;
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
    
    this.calculateTime();
    this.checkAvail();
    RoomService.getDetailRoom(room_id).then(
      (response) => {
        var data = response.data.data;
        this.rooms = data;
        this.form.room_id = data.id;
        this.form.detail_price = data.hourly_price;
        this.form.after_office_hourly_price = data.after_office_hourly_price;
        this.checkOfficeHour();
        this.countPrice();
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
    calculateTime() {
      var startTime = moment(this.form.start_time, "HH:mm");
      var endTime = moment(this.form.end_time, "HH:mm");
      var duration = moment.duration(endTime.diff(startTime));

      // duration in hours
      var hours = parseInt(duration.asHours());
      this.form.length_of_term = hours;
    },
    changePeriod(type) {
      UserService.setUpPeriod(type, this.form).then(
        (response) => {
          // var data = response.data.data;
          this.form.start_time = response.start_time;
          this.form.end_time = response.end_time;
          this.form.length_of_term = response.length_of_term;
        },
        (error) => {
          this.$toast.error("Error, Mohon dicoba kembali.");
        }
      );

      // this.checkAvail();
      // this.checkOfficeHour();
      this.countPrice();
    },
    getComplimentary() {
      var data = {
        customer_id: this.form.customer_id,
        start_date: this.form.start_date,
        room_category_id: this.form.room_category_id,
      };

      UserService.getDataCompliment(data).then(
        (response) => {
          var data = response;
          this.form.complimentary_id = data.complimentary.id;
          this.complimentary = data;
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
    getData() {
      RoomService.getDetailRoom(this.form.room_id).then(
        (response) => {
          var data = response.data.data;
          this.checkAvail();
          if (this.status != false) {
            this.rooms = data;
            this.form.room_id = data.id;
            this.form.detail_price = data.hourly_price;
            this.form.after_office_hourly_price =
              data.after_office_hourly_price;
            this.checkOfficeHour();
            this.countPrice();
          }
        },
        (error) => {
          this.form.room_id = "";
          this.form.detail_price = 0;
          this.form.after_office_hourly_price = 0;
          this.selectedRoom = "";
          this.countPrice();
        }
      );
    },
    checkAvail() {
      if (
        this.form.start_date != "" &&
        this.form.start_time != "" &&
        this.form.end_time != ""
      ) {
        var data = {
          room_id: this.form.room_id,
          start_date: this.form.start_date,
          start_time: this.form.start_time,
          end_time: this.form.end_time,
        };
        RoomService.getRoomAvail(data).then(
          (response) => {
            var data = response;
            this.status = data;

            if (data == false) {
              Swal.fire({
                text: "Maaf ruangan sudah terbooking, Silahkan memilih ruangan lain atau waktu yang tersedia.",
                icon: "warning",
                customClass: {
                  confirmButton: "btn fw-bold btn-danger",
                },
              });
            }
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
    checkOfficeHour() {
      var array_of_end_time = this.form.end_time.split(":");
      var hour_of_end_time = 0;
      var minutes_of_end_time = 0;
      var length_of_term_after_office = 0;

      if (array_of_end_time.length > 1) {
        hour_of_end_time = parseInt(array_of_end_time[0]);
        minutes_of_end_time = parseInt(array_of_end_time[1]);
      }
      if (this.office_hour_end == hour_of_end_time && minutes_of_end_time > 0) {
        length_of_term_after_office = 1;
      } else if (hour_of_end_time > this.office_hour_end) {
        length_of_term_after_office = hour_of_end_time - this.office_hour_end;
      }

      this.length_of_term_after_office = length_of_term_after_office;
    },
    countPrice() {
      var quantity = 1;
      var sub_total = 0;
      var total_price = 0;
      var total_tax_price = 0;
      
      var grand_total = 0;
      sub_total = sub_total + (this.form.detail_price * quantity * (this.form.length_of_term  - this.form.total_use_complimentary));
    
      total_price = sub_total;
      total_tax_price = total_price * parseFloat(
                    this.tax_percentage);


      total_price = Math.round(total_price);
      total_tax_price = Math.round(total_tax_price);

      var grand_total_tax = parseFloat(total_tax_price);
      var view_total_price_ac = parseFloat(total_price);

      grand_total =
        parseFloat(view_total_price_ac) + parseFloat(grand_total_tax);
        
      this.form.total_tax_price = grand_total_tax;

      this.form.total_price = total_price;
      this.grand_total = grand_total;
    },
    postBooking() {
      
      
      if (this.status == true) {
        UserService.saveBooking(this.form).then(
          (response) => {
            if(this.currentMember){
              this.$router.push({
                name: "my-booking",
                params: {
                  status: true,
                },
              });
            }else{
              this.$router.replace({
                  name: 'home', 
                  query: { status: true}
              });
            }
            
          },
          (error) => {
            this.$toast.error("Error, Mohon dicoba kembali.");
          }
        );
      } else {
        this.$toast.error(
          "Maaf ruangan sudah terbooking, Silahkan memilih ruangan lain atau waktu yang tersedia."
        );
      }
    },
  },
};
</script>
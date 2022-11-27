<template>
  <div>
    <!-- section content booking -->
    <section class="booking_area"></section>
    <!-- end section content booking -->
    <section class="location_area section_gap">
      <div class="container">
        <div class="room mb-5">
          <div class="row">
            <div class="col-md-6">
              <div class="location_area_box">
                <img
                  class="img-fluid frame-img"
                  src="../assets/image/banner/banner.jpeg"
                  alt="img"
                />
              </div>
            </div>
            <div class="col-md-6">
              <div class="about_content">
                <h5 class="title-room title_w">{{ rooms.room_number }}</h5>
                <h3 class="text-location-area hide_text">
                  <i class="fa fa-map-marker"></i> {{ location_name }}
                </h3>
                <ul class="text-white">
                  <li>4 Pax</li>
                  <li>High Speed Wireless Internet</li>
                  <li>Audio-Visual Equipment</li>
                  <li>User Friendly Video Conference Facilities</li>
                  <li>Comprehensive Choice of Food and Beverage Services</li>
                  <li>Direct Assistance of a Meeting Coordinator</li>
                  <li>Half or Full Day Meeting Packages Available</li>
                  <li>Direct Online Booking Available</li>
                </ul>
                <hr class="link hide_text" width="100%" />
                <div class="col-md-12">
                  <div class="accordion" id="accordionExample">
                    <div class="card" style="background-color: transparent">
                      <div
                        class="card-header collapsed"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <span class="font-weight-bold" style="color: white"
                          >Check Available</span
                        >
                        <span class="accicon"
                          ><i
                            class="fa fa-angle-down rotate-icon"
                            style="color: white"
                          ></i
                        ></span>
                      </div>
                      <div
                        id="collapseTwo"
                        class="collapse"
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          <div class="row">
                            <div class="col-md-12">
                              <div class="book_select_item">
                                <Label class="text-white">Select Date</Label>
                                <div class="form-group">
                                  <div class="input-group date">
                                    <input
                                      v-model="form.start_date"
                                      type="date"
                                      class="form-control"
                                      placeholder="Date"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4">
                              <div class="book_select_item">
                                <Label class="text-white">Start time</Label>
                                <div class="form-group">
                                  <div class="input-group date">
                                    <input
                                      v-model="form.start_time"
                                      type="time"
                                      class="form-control timepicker"
                                      placeholder="Date"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-6 mt-4">
                              <div class="book_select_item">
                                <Label class="text-white">End time</Label>
                                <div class="form-group">
                                  <div class="input-group date">
                                    <input
                                      v-model="form.end_time"
                                      type="time"
                                      class="form-control timepicker"
                                      placeholder="Date"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="book_tabel_item mt-2">
                    <a
                      v-if="status == null || status == false"
                      id="btn-check"
                      class="btn btn-lg btn-block btn-warning"
                      href="booking_form.html"
                      style="
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 20px;
                      "
                      @click.prevent="checkAvail()"
                      >Check</a
                    >
                    <a
                      v-if="status == true"
                      id="btn-booking"
                      class="btn btn-lg btn-block btn-warning"
                      href="booking_form.html"
                      style="
                        font-size: 16px;
                        font-weight: 600;
                        line-height: 20px;
                      "
                      @click.prevent="bookRoom()"
                      >Book Now</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import RoomService from "../services/room.service";

export default {
  name: "detail-rooms",
  location_name: "",
  secret: "123#$%",
  data() {
    return {
      rooms: {},
      form: {
        room_id: "",
        start_date: "",
        start_time: "",
        end_time: "",
      },
      status: null,
    };
  },
  mounted() {
    let data = this.$route.query;

    this.location_name = this.$CryptoJS.AES.decrypt(
      data.location_name,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);

    let id = this.$CryptoJS.AES.decrypt(data.id, "123#$%").toString(
      this.$CryptoJS.enc.Utf8
    );
    this.form.room_id = id;
    RoomService.getDetailRoom(id).then(
      (response) => {
        var data = response.data.data;
        this.rooms = data;
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
    checkAvail() {
      RoomService.getRoomAvail(this.form).then(
        (response) => {
          var data = response;

          this.status = data;
          if (data == true) {
            this.$toast.success("Ruangan tersedia");
          } else {
            this.$toast.warning("Ruangan tidak tersedia.");
          }
        },
        (error) => {
          this.$toast.error("form harus di isi");
        }
      );
    },
    bookRoom() {
      let data = this.$route.query;
      this.$router.push({
        name: "booking",
        query: {
          roomId: data.id,
          roomCategory: data.room_category_id,
          locationId: data.location_id,
          date: this.$CryptoJS.AES.encrypt(
            this.form.start_date.toString(),
            "123#$%"
          ).toString(),
          startTime: this.$CryptoJS.AES.encrypt(
            this.form.start_time.toString(),
            "123#$%"
          ).toString(),
          endTime: this.$CryptoJS.AES.encrypt(
            this.form.end_time.toString(),
            "123#$%"
          ).toString(),
        },
      });
    },
  },
};
</script>
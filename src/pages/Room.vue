<template>
  <div>
    <!-- section content booking -->
    <section class="booking_area">
      <div class="frame-location d_flex align-items-center"></div>
      <div class="hotel_booking_area">
        <div class="container">
          <div class="booking-area-table">
            <div class="col-md-12">
              <div class="boking_table">
                <div class="row">
                  <div class="col-md-8">
                    <h3 class="text-location">
                      <i class="fa fa-map-marker"></i> {{ location_name }}
                    </h3>
                  </div>
                  <div class="col-md-4">
                    <ul class="nav nav-pills">
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          aria-current="page"
                          href="#"
                          :class="[type == 'MR' ? 'active' : '']"
                          @click.prevent="Search('MR', 2)"
                          >Meeting Room</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          href="#"
                          :class="[type == 'CW' ? 'active' : '']"
                          @click.prevent="Search('CW', 3)"
                          >Coworking</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end section content booking -->
    <section class="location_area section_gap">
      <div class="container">
        <div v-for="item in rooms" :key="item.id">
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
                  <h5 class="title-room title_w">{{ item.room_number }}</h5>
                  <h3 class="text-location-area hide_text">
                    <i class="fa fa-map-marker"></i> {{ location_name }}
                  </h3>
                  <ul class="text-white">
                    <li>{{ item.number_of_workstation }} Pax</li>
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
                    <div class="book_tabel_item">
                      <br />
                      <a
                        @click.prevent="viewDetail(item.id)"
                        class="btn btn-lg btn-block btn-warning"
                        style="
                          font-size: 16px;
                          font-weight: 600;
                          line-height: 20px;
                        "
                        >View Detail</a
                      >
                    </div>
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
import UserService from "../services/user.service";
export default {
  name: "rooms",
  location_name: "",
  type: "",
  secret: "123#$%",
  data() {
    return {
      rooms: [],
    };
  },
  mounted() {
    let data = this.$route.query;

    this.location_name = this.$CryptoJS.AES.decrypt(
      data.location_name,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);

    this.type = this.$CryptoJS.AES.decrypt(data.type, "123#$%").toString(
      this.$CryptoJS.enc.Utf8
    );

    let location_id = this.$CryptoJS.AES.decrypt(
      data.location_id,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);
    let room_category_id = this.$CryptoJS.AES.decrypt(
      data.room_category_id,
      "123#$%"
    ).toString(this.$CryptoJS.enc.Utf8);

    UserService.getDataRooms(location_id, room_category_id).then(
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
    Search(type, id) {
      let data = this.$route.query;
      this.type = type;
      let location_id = this.$CryptoJS.AES.decrypt(
        data.location_id,
        "123#$%"
      ).toString(this.$CryptoJS.enc.Utf8);
      UserService.getDataRooms(location_id, id).then(
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
    viewDetail(id) {
      let data = this.$route.query;

      this.$router.push({
        name: "rooms-detail",
        query: {
          id: this.$CryptoJS.AES.encrypt(id.toString(), "123#$%").toString(),
          location_id: data.location_id,
          location_name: this.$CryptoJS.AES.encrypt(
            this.location_name.toString(),
            "123#$%"
          ).toString(),
          room_category_id: data.room_category_id,
        },
      });
    },
  },
};
</script>
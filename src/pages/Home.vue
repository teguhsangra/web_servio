<template>
  <div>
    <!-- section content booking -->
    <section class="banner_area">
      <div class="booking_table d_flex align-items-center">
        <div class="overlay bg-parallax"></div>
        <div class="container">
          <div class="banner_content text-left">
            <h2>Book your service</h2>
            <p>You are now able to book Meeting room & Coworking.</p>
          </div>
        </div>
      </div>
      <div class="hotel_booking_area position">
        <div class="container">
          <div class="hotel_booking_table">
            <div class="col-md-12">
              <div class="boking_table">
                <div class="row">
                  <div class="col-md-4">
                    <div class="book_tabel_item">
                      <Label class="label-booking">Location</Label>
                      <div class="input-group">
                        <select
                          class="nice-select wide"
                          id="select_location"
                          v-model="data.location"
                        >
                          <option value="" selected>Select Location</option>
                          <option
                            v-for="item in locations"
                            v-bind:value="{ id: item.id, name: item.name }"
                            v-bind:key="item.id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="book_tabel_item">
                      <Label class="label-booking">Service</Label>
                      <div class="input-group">
                        <select
                          class="nice-select wide"
                          v-model="data.service_type"
                        >
                          <option value="" selected>Select Service</option>
                          <option
                            v-for="item in service_type"
                            v-bind:value="{ id: item.id, name: item.code }"
                            v-bind:key="item.id"
                          >
                            {{ item.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="book_tabel_item">
                      <br />
                      <a
                        class="book_now_btn button_hover"
                        style="margin-top: 10px"
                        @click.prevent="Search"
                        >Search</a
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
    <!-- end section content booking -->
    <!-- section content area  -->
    <section class="location_area section_gap">
      <div class="container">
        <div class="row">
          <div class="col-md-8 d_flex align-items-center">
            <div class="about_content">
              <h2 class="title title_w">Manhattan Square</h2>
              <p class="text-white">
                Located on the 12th floor of Mid Tower The Manhattan Square
                Building, which at the core of TB. Simatupang area in South
                Jakarta. Easy access to Jakarta’s Central Business District, the
                Golden Triangle of Sudirman, Gatot Subroto and Kuningan, as well
                as to major thoroughfares in its surroundings, such as Kebayoran
                Baru, Pondok Indah, Antasari, Fatmawati, Kemang, and the TB.
                Simatupang Highway – all free from 3-in-1 zones – guarantees
                convenient commuting to and from ever-expanding residential
                areas.
              </p>
              <a class="button_hover location-btn" @click="viewDetail('MR')"
                >View More</a
              >
            </div>
          </div>
          <div class="col-md-4 mt-2">
            <img
              class="img-fluid frame"
              src="../assets/image/banner/ManhattanSquare.png"
              alt="img"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="location_area section_gap">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <img
              class="img-fluid frame"
              src="../assets/image/banner/SouthQuarter.png"
            />
          </div>
          <div class="col-md-6 d_flex align-items-center mt-2">
            <div class="about_content">
              <h2 class="title title_w">South Quarter</h2>
              <p class="text-white">
                Strategically located in the premium Grade A building with
                amazing surrounding facilities. We are located on the 18th floor
                Tower A South Quarter Building that is the prestigious business
                district of TB Simatupang. The main gateway is strategically
                located at an easy link to the TB Simatupang toll road. The 30
                meters wide roadway connecting RA Kartini to Lebak Bulus 1
                Street creates an extended span of new frontage to the complex
                and provides convenient access to the surrounding business
                districts, airport, seaport and the CBD
              </p>
              <a @click="viewDetail('SQ')" class="button_hover location-btn"
                >View More</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end section content area -->
  </div>
</template>
<script>
import Swal from "sweetalert2";
import UserService from "../services/user.service";
export default {
  name: "Home",
  data() {
    return {
      locations: null,
      service_type: [],
      location_name: "",
      data: {
        location: "",
        service_type: "",
      },
      secret: "123#$%",
    };
  },
  mounted() {
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
  },
  methods: {
    Search() {
      if (this.data.location != null && this.data.service_type) {
        this.$router.push({
          name: "rooms",
          query: {
            location_id: this.$CryptoJS.AES.encrypt(
              this.data.location.id.toString(),
              this.secret
            ).toString(),
            location_name: this.$CryptoJS.AES.encrypt(
              this.data.location.name.toString(),
              this.secret
            ).toString(),
            room_category_id: this.$CryptoJS.AES.encrypt(
              this.data.service_type.id.toString(),
              this.secret
            ).toString(),
            type: this.$CryptoJS.AES.encrypt(
              this.data.service_type.name.toString(),
              this.secret
            ).toString(),
          },
        });
      } else {
        Swal.fire({
          text: "Location or Service must be selected.",
          icon: "warning",
          customClass: {
            confirmButton: "btn fw-bold btn-danger",
          },
        });
      }
    },
    viewDetail(type) {
      if (type == "SQ") {
        this.$router.push({
          name: "rooms",
          query: {
            location_id: this.$CryptoJS.AES.encrypt(
              this.locations[1].id.toString(),
              this.secret
            ).toString(),
            location_name: this.$CryptoJS.AES.encrypt(
              this.locations[1].name.toString(),
              this.secret
            ).toString(),
            room_category_id: this.$CryptoJS.AES.encrypt(
              this.service_type[1].id.toString(),
              this.secret
            ).toString(),
            type: this.$CryptoJS.AES.encrypt(
              this.service_type[1].code.toString(),
              this.secret
            ).toString(),
          },
        });
      } else {
        this.$router.push({
          name: "rooms",
          query: {
            location_id: this.$CryptoJS.AES.encrypt(
              this.locations[0].id.toString(),
              this.secret
            ).toString(),
            location_name: this.$CryptoJS.AES.encrypt(
              this.locations[0].name.toString(),
              this.secret
            ).toString(),
            room_category_id: this.$CryptoJS.AES.encrypt(
              this.service_type[0].id.toString(),
              this.secret
            ).toString(),
            type: this.$CryptoJS.AES.encrypt(
              this.service_type[0].code.toString(),
              this.secret
            ).toString(),
          },
        });
      }
    },
  },
};
</script>
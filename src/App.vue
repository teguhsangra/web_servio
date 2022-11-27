<template>
  <div class="app">
    <!-- Navbar -->
    <Navbar />
    <router-view />
  </div>
</template>
<script>
// js global
import $ from "jquery";
import Navbar from "@/components/Navbar";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: { Navbar },
  mounted() {
    // this.showIntro = true;
    this.navbarFixed();
  },
  methods: {
    navbarFixed() {
      var nav_offset_top = $(".header_area").height() + 50;
      if ($(".header_area").length) {
        $(window).scroll(function () {
          var scroll = $(window).scrollTop();
          if (scroll >= nav_offset_top) {
            $(".header_area").addClass("navbar_fixed");
          } else {
            $(".header_area").removeClass("navbar_fixed");
          }
        });
      }
    },
  },
});
</script>


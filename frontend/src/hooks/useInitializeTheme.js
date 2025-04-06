import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "../assets/js/jquery.scrollUp.min.js";

export const useInitializeTheme = () => {
  const location = useLocation(); // Get current route

  useEffect(() => {
    console.log("Theme initialized for:", location.pathname);

    const hideLoader = () => {
      console.log("main.js file loaded");
      $("#preloader-active").delay(200).fadeOut("slow");
      $("body").delay(200).css({
        overflow: "visible",
      });
    };

    const showLoader = () => {
      console.log("Loader started");
      $("#preloader-active").fadeIn("slow");
      $("body").css({
        overflow: "hidden",
      });
    };

    hideLoader();

    // Set data background
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });

    $(window).on("scroll", function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $(".header-sticky").removeClass("sticky-bar");
        $(".header-sticky").removeClass("sticky");
      } else {
        $(".header-sticky").addClass("sticky-bar");
        $(".header-sticky").addClass("sticky");
      }
    });

    $.scrollUp({
      scrollName: "scrollUp", // Element ID
      topDistance: "300", // Distance from top before showing element (px)
      topSpeed: 300, // Speed back to top (ms)
      animation: "fade", // Fade, slide, none
      animationInSpeed: 200, // Animation in speed (ms)
      animationOutSpeed: 200, // Animation out speed (ms)
      scrollText: '<i class="ti-arrow-up"></i>', // Text for element
      activeOverlay: false, // CSS color for active overlay
    });

    return () => {
      console.log("Cleaning up before route change...");
    };
  }, [location.pathname]); // Re-run effect on route change
};

export default useInitializeTheme;

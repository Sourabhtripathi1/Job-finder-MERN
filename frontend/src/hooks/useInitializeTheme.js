import { useEffect } from "react";
import $ from "jquery";

export const useInitializeTheme = () => {
  useEffect(() => {
    // 1. Preloader
    const hideLoader = () => {
      console.log("main.js file loaded");
      $("#preloader-active").delay(200).fadeOut("slow");
      $("body").delay(200).css({
        overflow: "visible",
      });
    };

    const showLoader = () => {
      console.log("loader started");
      $("#preloader-active").fadeIn("slow");
      $("body").css({
        overflow: "hidden",
      });
    };

    hideLoader();

    // 8. Data Background
    $("[data-background]").each(function () {
      $(this).css(
        "background-image",
        "url(" + $(this).attr("data-background") + ")"
      );
    });

    // 9. Magnific Popup
    //  $(".single_gallery_part, .img-pop-up").magnificPopup({
    //    type: "image",
    //    gallery: {
    //      enabled: true,
    //    },
    //  });
  });
};

export default useInitializeTheme;

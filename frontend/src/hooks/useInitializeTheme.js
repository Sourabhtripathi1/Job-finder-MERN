import { useEffect } from "react";
import $ from "jquery";

export const useInitializeTheme = () => {
  useEffect(() => {
    // 1. Preloader
    const handleLoad = () => {
      console.log("main.js file loaded");
      $("#preloader-active").delay(450).fadeOut("slow");
      $("body").delay(450).css({
        overflow: "visible",
      });
    };

    // Call handleLoad when component mounts
    handleLoad();

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

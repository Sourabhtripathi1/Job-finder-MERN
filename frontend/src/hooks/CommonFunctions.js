import $ from "jquery";

export const toggleLoader = (show = false) => {
  if (show) {
    $("#preloader-active").fadeIn("slow");
    $("body").css({
      overflow: "hidden",
    });
  } else {
    $("#preloader-active").delay(200).fadeOut("slow");
    $("body").delay(200).css({
      overflow: "visible",
    });
  }
};

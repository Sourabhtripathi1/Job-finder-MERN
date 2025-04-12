import $ from "jquery";

export const toggleLoader = (show = false) => {
  if (show) {
    $("#preloader-active").css({
      display: "block",
    });
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

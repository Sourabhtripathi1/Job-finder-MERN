import $ from "jquery";

export const toggleLoader = (show = false) => {
  if (show) {
    console.log("Loader started");
    $("#preloader-active").fadeIn("slow");
    $("body").css({
      overflow: "hidden",
    });
  } else {
    console.log("main.js file loaded");
    $("#preloader-active").delay(200).fadeOut("slow");
    $("body").delay(200).css({
      overflow: "visible",
    });
  }
};

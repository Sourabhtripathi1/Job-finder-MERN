import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "ion-rangeslider/css/ion.rangeSlider.min.css";
import "ion-rangeslider/js/ion.rangeSlider.min.js";

const PriceRangeSlider = ({
  min = 0,
  max = 100,
  from = 0,
  to = 50,
  onChange,
}) => {
  const sliderRef = useRef(null);
  const inputFromRef = useRef(null);
  const inputToRef = useRef(null);
  const sliderInstance = useRef(null);

  useEffect(() => {
    const $range = $(sliderRef.current);
    const $inputFrom = $(inputFromRef.current);
    const $inputTo = $(inputToRef.current);

    $range.ionRangeSlider({
      type: "double",
      min: min,
      max: max,
      from: from,
      to: to,
      skin: "flat",
      prefix: "₹ ",
      onStart: updateInputs,
      onChange: updateInputs,
      step: 1,
      prettify_enabled: true,
      prettify_separator: ".",
      values_separator: " - ",
      hide_min_max: true,
    });

    sliderInstance.current = $range.data("ionRangeSlider");

    function updateInputs(data) {
      $inputFrom.prop("value", data.from);
      $inputTo.prop("value", data.to);

      if (onChange) {
        onchange({ max: data.to, min: data.from });
      }
    }

    $inputFrom.on("input", function () {
      let val = +$(this).prop("value");
      const to = +$inputTo.prop("value");

      if (val < min) val = min;
      else if (val > to) val = to;

      sliderInstance.current.update({ from: val });
    });

    $inputTo.on("input", function () {
      let val = +$(this).prop("value");
      const from = +$inputFrom.prop("value");

      if (val < from) val = from;
      else if (val > max) val = max;

      sliderInstance.current.update({ to: val });
    });

    // Cleanup on unmount
    return () => {
      if (sliderInstance.current) {
        sliderInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="range_item">
      {/* <div id="slider-range"></div> */}
      <input
        type="text"
        className="js-range-slider"
        ref={sliderRef}
        defaultValue=""
      />
      <div className="d-flex align-items-center">
        <div className="price_value d-flex justify-content-center">
          <span>From:</span>
          <input
            type="text"
            className="js-input-from"
            ref={inputFromRef}
            id="amount"
            readOnly={true}
          />
          <span>to</span>
          <input
            type="text"
            className="js-input-to"
            ref={inputToRef}
            id="amount"
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;

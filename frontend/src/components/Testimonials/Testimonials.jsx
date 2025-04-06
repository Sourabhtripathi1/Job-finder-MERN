import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const testimonials = [
    {
      name: "Margaret Lawson",
      position: "Creative Director",
      image: "/assets/img/testmonial/testimonial-founder.png",
      quote:
        "I am at an age where I just want to be fit and healthy. Our bodies are our responsibility! So start caring for your body and it will care for you.",
    },
    {
      name: "John Doe",
      position: "Marketing Manager",
      image: "/assets/img/testmonial/testimonial-founder.png",
      quote:
        "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing.",
    },
    {
      name: "Jane Smith",
      position: "UI/UX Designer",
      image: "/assets/img/testmonial/testimonial-founder.png",
      quote:
        "Good design is like a refrigerator—when it works, no one notices, but when it doesn’t, it stinks!",
    },
  ];

  return (
    <div className="testimonial-area testimonial-padding">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10">
            <Slider {...settings} className="h1-testimonial-active dot-style">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="single-testimonial text-center">
                  <div className="testimonial-caption">
                    <div className="testimonial-founder">
                      <div className="founder-img mb-30">
                        <img src={testimonial.image} alt={testimonial.name} />
                        <span>{testimonial.name}</span>
                        <p>{testimonial.position}</p>
                      </div>
                    </div>
                    <div className="testimonial-top-cap">
                      <p>“{testimonial.quote}”</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

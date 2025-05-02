import React, { useEffect } from "react";
import { toggleLoader } from "../../hooks/CommonFunctions";

const ContactUs = () => {
  useEffect(() => {
    toggleLoader();
  }, []);

  return (
    <section className="contact-section">
      <div className="container">
        {/* Optional Google Maps Placeholder - Remove if not implemented */}
        <div className="d-none d-sm-block mb-5 pb-4">
          <div
            id="map"
            style={{ height: 480, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundColor: "rgb(229, 227, 223)",
              }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1805.8179592305166!2d75.88959238007249!3d25.14799698771467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f851624fa2e25%3A0x4a1ef526e5dd6c72!2sRudraa%20Classes!5e0!3m2!1sen!2sin!4v1746148964963!5m2!1sen!2sin"
                style={{ border: 0, height: "100%", width: "100%" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <h2 className="contact-title">Get in Touch</h2>
          </div>
          <div className="col-lg-8">
            <form
              className="form-contact contact_form"
              action=""
              method="post"
              id="contactForm"
              noValidate>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <textarea
                      className="form-control w-100"
                      name="message"
                      id="message"
                      cols={30}
                      rows={9}
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter Message")}
                      placeholder="Enter Message"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="name"
                      id="name"
                      type="text"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter your name")}
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <input
                      className="form-control valid"
                      name="email"
                      id="email"
                      type="email"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) =>
                        (e.target.placeholder = "Enter email address")
                      }
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <input
                      className="form-control"
                      name="subject"
                      id="subject"
                      type="text"
                      onFocus={(e) => (e.target.placeholder = "")}
                      onBlur={(e) => (e.target.placeholder = "Enter Subject")}
                      placeholder="Enter Subject"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group mt-3">
                <button
                  type="submit"
                  className="button button-contactForm boxed-btn">
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-lg-3 offset-lg-1">
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-home" />
              </span>
              <div className="media-body">
                <h3>Kota, Rajasthan</h3>
                <p>Raipura, 4-C-32</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-tablet" />
              </span>
              <div className="media-body">
                <h3>+91 86198 26308</h3>
                <p>Mon to Fri 9am to 6pm</p>
              </div>
            </div>
            <div className="media contact-info">
              <span className="contact-info__icon">
                <i className="ti-email" />
              </span>
              <div className="media-body">
                <h3>
                  <span>sourabhtripathi8103@gmail.com</span>
                </h3>
                <p>Send us your query anytime!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer>
        {/*  Footer Start */}
        <div className="footer-area footer-bg footer-padding">
          <div className="container">
            <div className="row d-flex justify-content-between">
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                <div className="single-footer-caption mb-50">
                  <div className="single-footer-caption mb-30">
                    <div className="footer-tittle">
                      <h4>About Us</h4>
                      <div className="footer-pera">
                        <p>
                          Heaven frucvitful doesn't cover lesser dvsays appear
                          creeping seasons so behold.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Contact Info</h4>
                    <ul>
                      <li>
                        <p>
                          Address :Your address goes here, your demo address.
                        </p>
                      </li>
                      <li>
                        <Link to="/">Phone : +8880 44338899</Link>
                      </li>
                      <li>
                        <Link to="/">
                          Email :{" "}
                          <span
                            className="__cf_email__"
                            data-cfemail="a4cdcac2cbe4c7cbc8cbd6c8cdc68ac7cbc9">
                            [email&#160;protected]
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Important Link</h4>
                    <ul>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/">Testimonial</Link>
                      </li>
                      <li>
                        <Link to="/">Proparties</Link>
                      </li>
                      <li>
                        <Link to="/">Support</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="single-footer-caption mb-50">
                  <div className="footer-tittle">
                    <h4>Newsletter</h4>
                    <div className="footer-pera footer-pera2">
                      <p>
                        Heaven fruitful doesn't over lesser in days. Appear
                        creeping.
                      </p>
                    </div>
                    {/*  Form  */}
                    <div className="footer-form">
                      <div id="mc_embed_signup">
                        <form
                          target="_blank"
                          action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                          method="get"
                          className="subscribe_form relative mail_part">
                          <input
                            type="email"
                            name="email"
                            id="newsletter-form-email"
                            placeholder="Email Address"
                            className="placeholder hide-on-focus"
                            // onFocus="this.placeholder = ''"
                            // onBlur="this.placeholder = ' Email Address '"
                          />
                          <div className="form-icon">
                            <button
                              type="submit"
                              name="submit"
                              id="newsletter-submit"
                              className="email_icon newsletter-submit button-contactForm">
                              <img src={`/assets/img/icon/form.png`} alt="" />
                            </button>
                          </div>
                          <div className="mt-10 info"></div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row footer-wejed justify-content-between">
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                {/*  logo  */}
                <div className="footer-logo mb-20">
                  <Link to="/">
                    <img src={`/assets/img/logo/logo2_footer.png`} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="footer-tittle-bottom">
                  <span>5000+</span>
                  <p>Talented Hunter</p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                <div className="footer-tittle-bottom">
                  <span>451</span>
                  <p>Talented Hunter</p>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-4 col-sm-5">
                {/*  Footer Bottom Tittle  */}
                <div className="footer-tittle-bottom">
                  <span>568</span>
                  <p>Talented Hunter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  footer-bottom area  */}
        <div className="footer-bottom-area footer-bg">
          <div className="container">
            <div className="footer-border">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-xl-10 col-lg-10 ">
                  <div className="footer-copy-right">
                    <p>
                      {/*  Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.  */}
                      Copyright &copy;
                      <script
                        data-cfasync="false"
                        src="../../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js"></script>
                      <script>document.write(new Date().getFullYear());</script>{" "}
                      All rights reserved | This template is made with{" "}
                      <i className="fa fa-heart" aria-hidden="true"></i> by{" "}
                      <Link to="https://colorlib.com/" target="_blank">
                        Colorlib
                      </Link>
                      {/*  Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0.  */}
                    </p>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-2">
                  <div className="footer-social f-right">
                    <Link to="/">
                      <i className="fab fa-facebook-f"></i>
                    </Link>
                    <Link to="/">
                      <i className="fab fa-twitter"></i>
                    </Link>
                    <Link to="/">
                      <i className="fas fa-globe"></i>
                    </Link>
                    <Link to="/">
                      <i className="fab fa-behance"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Footer End */}
      </footer>
    </>
  );
};

export default Footer;

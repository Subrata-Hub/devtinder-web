import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content py-15 px-4 flex justify-around absolute -bottom-[350px]">
      <nav>
        <h6 className="footer-title">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className="footer-title">Company</h6>
        <a className="link link-hover">About us</a>
        <Link to="/contactus" className="link link-hover">
          Contact
        </Link>
        <a className="link link-hover">Jobs</a>
        <Link to="/concellationsandrefund" className="link link-hover">
          Cancellation and Refund
        </Link>
      </nav>
      <nav>
        <h6 className="footer-title">Legal</h6>
        <Link to="/termsandcondition" className="link link-hover">
          Terms of use
        </Link>
        <Link to="/privacy-policy" className="link link-hover">
          Privacy policy
        </Link>
        <Link to="/shippinganddelivery" className="link link-hover">
          Shipping and Delivery
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;

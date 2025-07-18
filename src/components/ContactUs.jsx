import React from "react";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4 md:p-20  text-white">
      <h1 className="text-3xl font-bold  mb-6">Contact Us</h1>
      <p className="text-sm  mb-4">
        Have questions, feedback, or need support? We're here to help!
      </p>

      <p className="mb-4">
        We value your input and are committed to providing you with the best
        possible experience on Tindervibe.online.
      </p>

      <p className="mb-6">
        <strong className="font-semibold">
          Before contacting us, please check our FAQ section (if available on
          your site) for quick answers to common questions.
        </strong>
      </p>

      <h2 className="text-2xl font-semibold  mb-4">
        General Inquiries & Support
      </h2>
      <p className="mb-2">
        For all general questions, technical support, account issues, or any
        other inquiries, please reach out to our dedicated support team. We aim
        to respond to all inquiries as quickly as possible.
      </p>
      <p className="font-semibold mb-6">
        Email:{" "}
        <a
          href="mailto:support@tindervibe.online"
          className="text-blue-600 hover:underline"
        >
          support@tindervibe.online
        </a>
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        Report a User or Safety Concern
      </h2>
      <p className="mb-2">
        Your safety and experience are paramount. If you encounter any user
        behavior that violates our Terms and Conditions, or if you have any
        safety concerns, please report them immediately. When reporting, please
        provide as much detail as possible, including usernames, screenshots (if
        applicable), and descriptions of the incident.
      </p>
      <p className="font-semibold mb-6">
        Email for Safety Concerns:{" "}
        <a
          href="mailto:safety@tindervibe.online"
          className="text-blue-600 hover:underline"
        >
          safety@tindervibe.online
        </a>
      </p>

      <h2 className="text-2xl font-semibold  mb-4">
        Business & Partnership Inquiries
      </h2>
      <p className="mb-2">
        For business proposals, partnership opportunities, press inquiries, or
        other corporate matters, please contact us at:
      </p>
      <p className="font-semibold mb-6">
        Email:{" "}
        <a
          href="mailto:business@tindervibe.online"
          className="text-blue-600 hover:underline"
        >
          business@tindervibe.online
        </a>
      </p>

      <p className="font-bold">We look forward to hearing from you!</p>
    </div>
  );
};

export default ContactUs;

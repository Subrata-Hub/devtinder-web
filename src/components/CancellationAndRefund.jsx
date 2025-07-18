import React from "react";

const CancellationAndRefund = () => {
  return (
    <div className="container mx-auto p-4 md:p-20">
      <h1 className="text-3xl font-bold  mb-6">
        Cancellation and Refund Policy
      </h1>
      <p className="text-sm  mb-4">Effective Date: July 18, 2025</p>

      <p className=" mb-4">
        This Cancellation and Refund Policy applies to premium features and
        subscriptions purchased on Tindervibe.online ("Tindervibe," "we," "us,"
        or "our").
      </p>

      <h2 className="text-2xl font-semibold  mb-4">
        1. Premium Features and Subscriptions
      </h2>
      <p className=" mb-4">
        Tindervibe may offer various premium features and subscription plans
        that enhance your user experience. These are typically offered for a set
        period (e.g., 1 month, 3 months, 6 months) and are billed in advance.
      </p>

      <h2 className="text-2xl font-semibold  mb-4">
        2. No Refunds for Digital Services
      </h2>
      <p className=" mb-4">
        Due to the nature of digital services and immediate access to premium
        features,{" "}
        <strong className="text-red-600">
          all sales of subscriptions and premium features are final and
          non-refundable.
        </strong>{" "}
        We do not offer refunds or credits for partially used subscription
        periods, changes in personal circumstances, or dissatisfaction with the
        service, unless explicitly stated otherwise in this policy or required
        by applicable consumer protection laws.
      </p>

      <h2 className="text-2xl font-semibold  mb-4">3. Automatic Renewal</h2>
      <ul className="list-disc list-inside  mb-4 ml-4">
        <li>
          Unless you cancel your subscription, it will{" "}
          <strong className="font-semibold">automatically renew</strong> at the
          end of your current subscription period.
        </li>
        <li>
          You will be charged the applicable subscription fee for the next
          period using the payment method on file.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        4. How to Cancel Your Subscription
      </h2>
      <p className=" mb-2">
        You can cancel the automatic renewal of your subscription at any time
        through your account settings on the Tindervibe website.
      </p>
      <ul className="list-disc list-inside  mb-4 ml-4">
        <li>
          Go to your "Account Settings" or "Subscription Management" section.
        </li>
        <li>
          Follow the instructions to "Cancel Subscription" or "Turn off
          Auto-Renew."
        </li>
      </ul>
      <p className=" mb-4">
        Please note that canceling your subscription will only prevent future
        renewals. You will retain access to your premium features until the end
        of your current paid subscription period.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        5. Exceptions (If Applicable)
      </h2>
      <p className=" mb-2">
        In very limited circumstances, a refund *may* be considered on a
        case-by-case basis at our sole discretion, such as:
      </p>
      <ul className="list-disc list-inside mb-4 ml-4">
        <li>
          <strong>Technical Error:</strong> If there was a demonstrable
          technical error on our part that prevented you from accessing the
          purchased features for a significant duration, and we were unable to
          resolve the issue.
        </li>
        <li>
          <strong>Duplicate Charges:</strong> If you were erroneously charged
          multiple times for the same subscription.
        </li>
      </ul>
      <p className=" mb-4">
        Any such request must be submitted to{" "}
        <a
          href="mailto:support@tindervibe.online"
          className="text-blue-600 hover:underline"
        >
          support@tindervibe.online
        </a>{" "}
        within <strong className="font-semibold">7 days</strong> of the
        transaction, along with clear evidence of the issue.
      </p>

      <h2 className="text-2xl font-semibold  mb-4">6. Changes to Pricing</h2>
      <p className=" mb-4">
        We reserve the right to change our subscription prices at any time. Any
        price changes will apply to future renewals and will be communicated to
        you in advance.
      </p>

      <h2 className="text-2xl font-semibold  mb-4">7. Account Termination</h2>
      <p className="text-gray-700 mb-4">
        If your account is terminated by Tindervibe due to a violation of our
        Terms and Conditions, you will not be eligible for any refund of unused
        subscription time or premium features.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        8. Contact Us
      </h2>
      <p className=" mb-2">
        If you have any questions about this Cancellation and Refund Policy,
        please contact us at:
      </p>
      <p className=" font-semibold">
        Email:{" "}
        <a
          href="mailto:support@tindervibe.online"
          className="text-blue-600 hover:underline"
        >
          support@tindervibe.online
        </a>
      </p>
    </div>
  );
};

export default CancellationAndRefund;

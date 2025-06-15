import React from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "Click on the Sign Up link at the top of the page and fill in your details. Once submitted, your account will be created instantly.",
  },
  {
    question: "How can I track my order?",
    answer:
      "After placing an order, you can track it from your account dashboard under the 'My Orders' section.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept all major credit/debit cards, PayPal,Mpesa and some mobile money options depending on your region.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, we have a 7-day return policy. Please contact our support team to initiate a return or exchange.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us through the Contact Us page or email support@wamalwa.com. We're available 24/7.",
  },
];

const FaqPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 pt-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#1877F2]">
        Frequently Asked Questions
      </h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-[#1877F2] p-5 rounded-lg shadow-md text-white"
          >
            <h2 className="text-xl font-semibold">{faq.question}</h2>
            <p className="mt-2 text-sm">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPrivacyPolicy } from "./helper/getPrivacyPolicy";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const PrivacyPolicy = () => {
  const privacyHtml = `
    <h2>1. Information We Collect</h2>
    <p>We collect your name, email, and usage data for service improvements...</p>

    <h2>2. How We Use Your Information</h2>
    <p>Your data is used to personalize content and improve our services.</p>

    <h2>3. Data Sharing</h2>
    <p>We do not sell your personal data. We may share it with trusted partners only when necessary.</p>

    <h2>4. Cookies</h2>
    <p>This website uses cookies to enhance your experience. <a href="/cookie-policy" class="text-blue-600 underline">Read more here</a>.</p>

    <h2>5. Contact Us</h2>
    <p>For any queries, contact <a href="mailto:support@example.com">support@example.com</a>.</p>
  `;

  const { data: privacyRes = {}, isLoading } = useQuery({
    queryKey: ["privacy"],
    queryFn: getPrivacyPolicy,
  });

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (privacyRes &&
        <div
          className="prose max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: privacyRes?.privacy_policy || privacyHtml }}   
        />
      )}
    </div>
  );
};

export default PrivacyPolicy;

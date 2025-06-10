import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-foreground">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Privacy <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Policy</span>
      </h1>

      <p className="mb-4 text-muted-foreground">
        We take your privacy seriously. This policy outlines how your data is collected, used, and protected when you interact with our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Data Collection</h2>
      <p className="mb-4 text-muted-foreground">
        We may collect personal information such as your email address and social media profile when you sign in or interact with features on our site.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Use of Information</h2>
      <p className="mb-4 text-muted-foreground">
        Your data is used solely to enhance your experience, personalize content, and improve our services. We never sell your information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Third-Party Services</h2>
      <p className="mb-4 text-muted-foreground">
        We may use third-party services like analytics or authentication providers. These services may collect limited data under their own privacy policies.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Your Control</h2>
      <p className="mb-4 text-muted-foreground">
        You can request to update or delete your information by contacting us. We support your right to control your personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Changes</h2>
      <p className="mb-4 text-muted-foreground">
        This privacy policy may be updated periodically. Any changes will be reflected on this page with a new effective date.
      </p>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Last updated: June 10, 2025
      </p>
    </div>
  );
};

export default Privacy;

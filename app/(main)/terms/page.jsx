import React from "react";

const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-foreground">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Terms of <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Service</span>
      </h1>

      <p className="mb-4 text-muted-foreground">
        By using this site, you agree to the following terms and conditions. Please read them carefully before continuing to use the platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">1. Use of Service</h2>
      <p className="mb-4 text-muted-foreground">
        You may use this platform only for lawful purposes and in accordance with these Terms. Any unauthorized or malicious use is strictly prohibited.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">2. Account Responsibility</h2>
      <p className="mb-4 text-muted-foreground">
        You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">3. Intellectual Property</h2>
      <p className="mb-4 text-muted-foreground">
        All content, logos, and designs on this site are the property of the creator and are protected by copyright and trademark laws.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">4. Modifications</h2>
      <p className="mb-4 text-muted-foreground">
        We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-2">5. Termination</h2>
      <p className="mb-4 text-muted-foreground">
        We may terminate or suspend access to our service immediately, without prior notice, for any reason, including a breach of the terms.
      </p>

      <p className="mt-10 text-center text-sm text-muted-foreground">
        Last updated: June 10, 2025
      </p>
    </div>
  );
};

export default Terms;

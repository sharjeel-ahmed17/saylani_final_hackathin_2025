import React, { Suspense } from "react";
import VerifyEmail from "@/components/VerifyEmail";

export default function OtpPage() {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <VerifyEmail/>
      </div>
    </Suspense>
  );
}

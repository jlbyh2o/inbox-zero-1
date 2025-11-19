"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/Button";
import { signIn } from "@/utils/auth-client";
import { WELCOME_PATH } from "@/utils/config";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams?.get("next");
  const error = searchParams?.get("error");

  const [loadingMicrosoft, setLoadingMicrosoft] = useState(false);

  const handleMicrosoftSignIn = async () => {
    setLoadingMicrosoft(true);
    await signIn.social({
      provider: "microsoft",
      errorCallbackURL: "/login/error",
      callbackURL: next && next.length > 0 ? next : WELCOME_PATH,
      ...(error === "RequiresReconsent" ? { consent: true } : {}),
    });
    setLoadingMicrosoft(false);
  };

  return (
    <div className="flex flex-col justify-center gap-2 px-4 sm:px-16">
      <Button
        size="2xl"
        loading={loadingMicrosoft}
        onClick={handleMicrosoftSignIn}
      >
        <span className="flex items-center justify-center">
          <Image
            src="/images/microsoft.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
          />
          <span className="ml-2">Sign in with Microsoft</span>
        </span>
      </Button>
    </div>
  );
}

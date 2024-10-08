"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { validateEmail, validatePassword } from "@/validation/auth-validations";
import { SignInService } from "@/service/api-call-service";
import { SetLocalStorageService } from "@/service/local-storage-service";

function SignIn() {
  const router = useRouter();
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const [formError, setFormError] = React.useState<string | null>(null);
  const [emailPass, setEmailPass] = React.useState<string | boolean>(false);
  const [passwordPass, setPasswordPass] = React.useState<string | boolean>(false);

  const handleEmailChange = () => {
    if (formError) {
      setFormError(null);
    }
    if (emailRef.current) {
      setEmailPass(validateEmail(emailRef.current.value));
    }
  };

  const handlePasswordChange = () => {
    if (formError) {
      setFormError(null);
    }
    if (passwordRef.current) {
      setPasswordPass(validatePassword(passwordRef.current.value));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    setEmailPass(validateEmail(email));
    setPasswordPass(validatePassword(password));

    if ((emailPass === true) && (passwordPass === true)) {
      const timeLine = new Date();
      const response = await SignInService({ email, password, timeline: timeLine.toISOString() });
      if (response && response.status === "success") {
        SetLocalStorageService("auth", response.data, true);
        console.log("Form submitted successfully");
        router.push("/board");
        router.refresh();
        return;
      }
      else {
        setFormError(response?.data);
      }
      return;
    }

    console.log("Form contains errors");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>SignIn</CardTitle>
          <CardDescription>
            You&apos;re just one step away from the app...
          </CardDescription>
        </CardHeader>
        {formError && (
          <span className="text-sm ml-2 text-red-600 font-semibold">
            {formError}
          </span>
        )}
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              required
              ref={emailRef}
              onChange={handleEmailChange}
            />
            {emailPass !== true && (
              <span className="text-sm ml-2 text-red-600 font-semibold">
                {emailPass}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="********"
              required
              ref={passwordRef}
              onChange={handlePasswordChange}
            />
            {passwordPass !== true && (
              <span className="text-sm ml-2 text-red-600 font-semibold">
                {passwordPass}
              </span>
            )}
          </div>
          <Button
            className="w-full"
            type="submit"
            disabled={!(emailPass === true && passwordPass === true)}
          >
            SignIn
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}

export default SignIn;

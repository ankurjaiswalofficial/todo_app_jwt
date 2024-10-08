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
import { SignInService } from "@/service/api-call-service";
import { GetLocalStorageService, SetLocalStorageService } from "@/service/local-storage-service";

function SignUp() {
  const router = useRouter();


  const handleVerify = async () => {
    const authToken = GetLocalStorageService("auth");
    if (!authToken) {
      router.push("/sign-up");
      router.refresh();
      return;
    }
    const timeline = new Date();
    const response = await SignInService({ token: authToken, timeline: timeline.toISOString() });
    if (response && response.status === "success") {
      SetLocalStorageService("auth", response.data, true);
      router.push("/board");
      router.refresh();
    }
    else {
      router.push("/sign-up");
      router.refresh();
    }
  };

  return (
    <Card className="w-full max-w-sm m-auto">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Just click verify and it&apos;s done :)</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full" onClick={handleVerify} >Verify yourself</Button>
      </CardContent>
    </Card>
  );
}

export default SignUp;

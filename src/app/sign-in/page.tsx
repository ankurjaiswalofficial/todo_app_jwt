"use client";
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";



function Landing() {
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const [emailError, setEmailError] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("");

  const handleSubmit = () => {
    const email = z.string().email({message: "Invalid Email"});
    const password = z.string().min(8, "Minimum 18 Characters Required").max(18, "Maximum 18 Characters Allowed");
    
    if (!email.parse(emailRef.current?.value)){
      setEmailError("fg");
      console.log("setEmailError failed")
    }
    if (!password.parse(passwordRef.current?.value)){
      setPasswordError("dsf");
      console.log("setPasswordEr failed")
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>SignIn</CardTitle>
        <CardDescription>You&apos;re just one step away from the app...</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="m@example.com"
            required
            ref={emailRef}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="********"
            required
            ref={passwordRef}
          />
        </div>
        <Button className="w-full" onClick={handleSubmit}>SignIn</Button>
      </CardContent>
    </Card>
  )
}


export default Landing;

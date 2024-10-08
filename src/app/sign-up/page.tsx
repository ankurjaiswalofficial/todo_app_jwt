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

function Landing() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Todo App</CardTitle>
        <CardDescription>Built using <b>NextJS</b> with Auth based on <b>JWT</b></CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Button className="w-full" asChild><Link href={"/sign-in"}>SignIn</Link></Button>
        <Button className="w-full" asChild><Link href={"/sign-up"}>SignUp</Link></Button>
      </CardContent>
    </Card>
  )
}


export default Landing;

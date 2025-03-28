"use server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "./_component/loginForm/loginForm";
import Image from "next/image";
import logo from "@/public/images/logo-circle.webp"

const LoginPage = async () => {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cover bg-center login-bg">
        <Card className="w-full max-w-md p-6 shadow-md">
          <CardHeader>
            <div className="flex items-center justify-center">
              <Image src={logo} alt="Utsav Logo" className="rounded h-10 w-10 animateLogo" />
            </div>
            <CardTitle className="text-center text-3xl font-bold">UTSAV</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
    </div>
    )
}

export default LoginPage;
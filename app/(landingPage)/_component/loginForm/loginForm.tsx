"use client";

import { ILoginRequest } from "@/app/types/api/request/auth";
import { ILoginFormData } from "@/app/types/components/loginForm/ILoginForm";
import { useAuth } from "@/components/context/AuthContext";
import ButtonComponent from "@/components/core/Button/Button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AuthService } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
    const { setTokenData, login } = useAuth()
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm<ILoginFormData>();

    const onLogin = async (data: ILoginFormData) => {
        try {
            setLoading(true);
            const req: ILoginRequest = {...data};
            const res: any = await AuthService.login(req);
            if(res && res.status == 200 && res.data.token) {
                setTokenData(res.data.token);
                const resp = AuthService.getUserDetail();
                if(res && res.status == 200) {
                    login(res.data)
                    toast({
                        title: "Success",
                        description: "Login Successfully"
                    })
                } else {
                    toast({
                        title: "Error",
                        description: "User Detail not found",
                        variant: "destructive",
                    })    
                }
            } else {
                toast({
                    title: "Error",
                    description: res?.response?.data?.error || "Incorrect Email Address/ Password",
                    variant: "destructive",
                })     
            }
            setTimeout(() => {
                setLoading(false);
            }, 1000);
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            toast({
                title: "Error",
                description: error?.error?.message || "Something went wrong",
                variant: "destructive",
            })     
        }
    }

    return (
        <form className="space-y-4" onSubmit={handleSubmit(onLogin)}>
            <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Input {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
                    type="email" placeholder="Enter your email" className="mt-1 w-full" />
                {errors.email && <p className="text-red-500 mt-2 text-sm">{errors.email.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Input
                    {...register("password", { required: "Password is required" })}
                    type="password" placeholder="Enter your password" className="mt-1 w-full" />
                {errors.password && <p className="text-red-500 mt-2 text-sm">{errors.password.message}</p>}
            </div>
            <ButtonComponent label="Login" onClick={() => {}} loading={loading} type="submit" customClass="w-full bg-purple-700 hover:bg-purple-800" />
        </form>
    )
}

export default LoginForm;
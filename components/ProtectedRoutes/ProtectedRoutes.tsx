"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = sessionStorage.getItem('token')
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!token) {
      toast({
        title: "Error",
        description: "UnAuthorized Access",
        variant: "destructive"
      })
      router.push("/"); // Redirect if not authenticated
    }
  }, [token, router]);

  return token ? <>{children}</> : null; // Render children only if authenticated
}

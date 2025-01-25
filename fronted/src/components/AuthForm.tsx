"use client";

import React, { FormEvent, useContext, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {UserContext} from '@/context/AuthContext'
export default function AuthForm({
  isRegister,
  action,
}: {
  isRegister: boolean;
  action?: (formData: FormData) => Promise<{
    error: boolean;
    message: string;
    data: {token?:string,name?:string,email?:string};
  }>;
  }) {
  const context = useContext(UserContext)
 const {login} = context
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string; // Extract the email field from the form

    try {
      setLoading(true);

      const response = await action!(formData);
      console.log(response);

      if (response?.error) {
        throw new Error(response.message);
      }

      // Show success toast
      toast({
        title: "Success",
        description: response.message,
        variant: "success",
      });

      // Reset form using ref if it exists
      if (formRef.current) {
        formRef.current.reset();
      }

      // Redirect to the verify-email page with email as a query parameter
      if (isRegister) {
       router.push(`/verify-email?email=${encodeURIComponent(email)}`)   
      }
      // console.log(response.data);
      
        login(response.data.token!, response.data.name!, response.data.email!)
        router.push('/')
    } catch (error) {
      const err = error as Error;
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={formRef}
      className="space-y-4"
      onSubmit={handleSubmit}
    >
      {isRegister && (
        <Input name="name" placeholder="Full Name" className="w-full"  />
      )}
      <Input
        name="email"
        type="email"
        placeholder="Email"
        className="w-full"
        
      />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        className="w-full"
        
      />
      <Button className="w-full" type="submit" disabled={loading}>
        {loading
          ? isRegister
            ? "Registering..."
            : "Logging in..."
          : isRegister
          ? "Register"
          : "Login"}
      </Button>
      {isRegister ? (
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-primary underline">Login</span>
          </Link>
        </p>
          ) :
        (
        <p className="text-center text-sm text-muted-foreground">
          Not registered Yet?{" "}
          <Link href="/register">
            <span className="text-primary underline">Register</span>
          </Link>
        </p>
          )   
              
          
      }
    </form>
  );
}

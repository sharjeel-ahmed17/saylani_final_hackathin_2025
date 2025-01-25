'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { verifyEmailAction } from "@/actions/auth.action";
import { useSearchParams } from "next/navigation";

const VerifyEmail = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || ""; // Get the email from query params
    const [otpExpire, setOtpExpire] = useState(false);
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    
    useEffect(() => {
        if (!email) {
            router.push("/register");
        }
    }, [email, router]);
    
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[0-9]{0,6}$/.test(value)) {
            setOtp(value);
        }
    };
    
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (otp.length !== 6) {
            toast({
                title: "Error",
                description: "Please enter a valid 6-digit OTP.",
                variant: "destructive",
            });
            return;
        }
    
        try {
            setLoading(true);
            const response = await verifyEmailAction(email, otp);
    
            if (!response.error) {
                toast({
                    title: "OTP Verified",
                    description: "OTP successfully verified.",
                    variant: "success",
                });
                router.push("/login");
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to verify OTP.",
                    variant: "destructive",
                });
    
                if (response.message === "User not found") {
                    router.push("/register");
                }
    
                if (response.message === "OTP has expired") {
                    setOtpExpire(true);
                }
            }
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
    
    const handleResendOtp = async () => {
        try {
            setLoading(true);
            const response = await verifyEmailAction(email, "");
            if (!response.error) {
                toast({
                    title: "OTP Resent",
                    description: "A new OTP has been sent to your email.",
                    variant: "success",
                });
                setOtpExpire(false);
                setOtp("");
            } else {
                toast({
                    title: "Error",
                    description: response.message || "Failed to resend OTP.",
                    variant: "destructive",
                });
            }
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
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Enter OTP</h2>
            {!otpExpire ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                        maxLength={6}
                        placeholder="Enter 6-digit OTP"
                        className="w-full"
                        required
                    />
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </form>
            ) : (
                <Button
                    onClick={handleResendOtp}
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Requesting" : "Send Another Request"}
                </Button>
            )}
        </div>
    )
}
export default VerifyEmail

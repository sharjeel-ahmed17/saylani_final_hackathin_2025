'use server'

import { ApiRoutes } from "@/constants/constant"

export const registerAction = async (formData: FormData) => {
    const fullname = formData.get('name')?.toString()
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    try {
        console.log(formData);

        const response = await fetch(ApiRoutes.register, {
            // const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullname, email, password })
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
        }
        const data = await response.json()
        console.log(data);

        return { error: data.error, message: data.message, data: data.data }

    } catch (error) {
        const err = error as Error
        return { error: true, message: err.message, data: null }
    }
}


export const verifyEmailAction = async (email: string, otp: string) => {
    try {
        const response = await fetch("https://backend-express-zeta.vercel.app/api/auth/verify-email", {
            // const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, otp })
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Registration failed");
        }
        const data = await response.json()
        console.log(data);

        return { error: data.error, message: data.message, data: data.data }
    } catch (error) {
        const err = error as Error
        return { error: true, message: err.message, data: null }
    }
}


export const LoginAction = async (formData: FormData) => {
    const email = formData.get('email')?.toString()
    const password = formData.get('password')?.toString()
    try {
        const response = await fetch(ApiRoutes.login, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
        }
        const data = await response.json()
        console.log(data);

        return { error: data.error, message: data.message, data: data.data }
    } catch (error) {
        const err = error as Error
        return { error: true, message: err.message, data: null }

    }
} 
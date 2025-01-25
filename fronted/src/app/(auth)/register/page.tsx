
// import { registerAction } from '@/actions/auth.action'
import { registerAction } from '@/actions/auth.action'
import AuthForm from '@/components/AuthForm'
import React, { Suspense } from 'react'

const Register = () => {
    return (
        <Suspense>
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
      
      <div className="w-96 shadow-xl p-6 bg-white rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <AuthForm isRegister={true}  action={registerAction}/>
      </div>
            </div>
            </Suspense>
  )
}

export default Register

import React from 'react'
import LoginForm from './_components/login-form'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await auth()
  if(session) {
    return redirect('/')
  }
  return (
    <>
        <LoginForm />
    </>
  )
}

export default page
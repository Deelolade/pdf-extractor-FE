"use client"
import React, { Suspense } from 'react'
import ResetPasswordForm from './ResetPasswordForm'

const page = () => {

  return <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm/>
  </Suspense>
}

export default page

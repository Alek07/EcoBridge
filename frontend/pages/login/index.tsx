import React from 'react'
import Layout from '../../components/Layout'
import LoginForm from '../../components/LoginForm'

export default function Learn(): JSX.Element {
  return (
    <Layout>
      <div className="inline-flex items-center mb-16">
        <img src="/images/ecobridge_logo.png" alt="ecobridge_logo" />
        <p className="ml-3 text-green-700 text-5xl text-center font-extrabold">
          EcoBridge
        </p>
      </div>

      <div className="flex-grow flex justify-between p-20">
        <div></div>
        <LoginForm />
      </div>
    </Layout>
  )
}

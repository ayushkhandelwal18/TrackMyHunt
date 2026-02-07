import React from 'react'
import AuthOverlay from '../components/auth/AuthOverlay'

function Auth() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      {/* We pass no onClose prop to indicate it should behave as a standalone page */}
      <AuthOverlay />
    </div>
  )
}

export default Auth

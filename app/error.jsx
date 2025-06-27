'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRobot, FaRedoAlt } from 'react-icons/fa'

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex flex-col items-center justify-center p-4">
      {/* Dark tech pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
      
      {/* Cosmic background with stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>
      
      <div className="relative max-w-2xl w-full text-center">
        {/* Error code with glowing effect */}
        <div className="mb-4">
          <h1 className="text-8xl font-black text-[#AF1010] glow-pink">500</h1>
        </div>
        
        {/* Futurama logo */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/logo.svg"
            alt="Futurama Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        
        {/* Error message */}
        <div className="bg-[#080A0E] border border-[#AF1010]/30 p-6 rounded-lg mb-8 bg-scan-lines">
          <h2 className="text-2xl font-bold mb-2 text-[#AF1010] glow-text">SYSTEM MALFUNCTION</h2>
          <p className="text-gray-300 mb-4">
            Good news, everyone! We've encountered a technical problem with the Planet Express ship.
          </p>
          <div className="flex items-center justify-center space-x-2 text-[#FF2F92]">
            <div className="h-2 w-2 rounded-full bg-[#FF2F92] animate-pulse"></div>
            <p className="font-mono text-sm">ERROR CODE: BENDER-MALFUNCTION</p>
            <div className="h-2 w-2 rounded-full bg-[#FF2F92] animate-pulse"></div>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center px-6 py-3 bg-[#080A0E] border border-[#FF2F92]/50 text-[#FF2F92] hover:bg-[#FF2F92]/10 transition-colors duration-300 rounded hover-glow w-full sm:w-auto"
          >
            <FaRedoAlt className="mr-2" />
            <span className="font-mono uppercase tracking-wider">Try Again</span>
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#080A0E] border border-[#00B8D4]/50 text-[#00B8D4] hover:bg-[#00B8D4]/10 transition-colors duration-300 rounded hover-glow w-full sm:w-auto"
          >
            <FaRobot className="mr-2" />
            <span className="font-mono uppercase tracking-wider">Return to Earth</span>
          </Link>
        </div>
      </div>
      
      {/* Tech decoration */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="flex items-center space-x-4">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#AF1010] to-transparent"></div>
          <div className="h-3 w-3 rounded-full bg-[#FF2F92] animate-pulse"></div>
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#AF1010] to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

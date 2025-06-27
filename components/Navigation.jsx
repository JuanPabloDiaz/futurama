/**
Renders a navigation component with a futuristic header inspired by Futurama's sci-fi aesthetic.
@component
@returns {JSX.Element} The rendered navigation component.
*/

import Link from 'next/link'
import { Container } from '.'
import Image from 'next/image'
import { FaRocket, FaUserAstronaut, FaRobot } from 'react-icons/fa'

export const Navigation = () => {
  return (
    <div className="sticky top-0 z-50">
      {/* Dark space background effect */}
      <div className="absolute inset-0 bg-[#080A0E] overflow-hidden border-b border-[#005CA1]/30">
        <div className="absolute inset-0 opacity-10">
          {/* Stars effect */}
          <div className="stars"></div>
        </div>
      </div>
      
      {/* Main navigation content */}
      <Container className="relative flex items-center justify-between py-2" as="nav">
        <Link href="/" className="flex items-center space-x-4 group">
          <div className="relative h-12 w-12 overflow-hidden">
            {/* Planet Express logo styling */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full transform group-hover:scale-110 transition-transform duration-300">
              {/* <FaRocket className="text-white text-lg" /> */}
              <Image
                src="/icon.png"
                alt="Planet Express Logo"
                width={100}
                height={100}
                className="h-12 w-12"
              />
            </div>
          </div>
          <div>
            <Image
              src="/logo.png"
              alt="Futurama Logo"
              width={100}
              height={100}
              className="h-10 w-full"
            />
            {/* <span className="text-xl font-black tracking-wider text-white">FUTURAMA</span> */}
            <div className="flex items-center">
              <span className="text-xs text-[#00B8D4] font-mono tracking-wider">PLANET EXPRESS</span>
              <span className="ml-1 h-1 w-1 rounded-full bg-[#FF2F92]"></span>
            </div>
          </div>
        </Link>
        
        {/* Navigation links */}
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/api/characters" target="_blank" className="text-gray-300 hover:text-[#00B8D4] transition-colors flex items-center space-x-2 font-medium">
            <FaRobot className="text-[#005CA1]" />
            <span>Backend API</span>
          </Link>
          {/* <Link href="https://futuramaapi.com" target="_blank" className="text-gray-300 hover:text-[#00B8D4] transition-colors flex items-center space-x-2 font-medium">
            <FaUserAstronaut className="text-[#005CA1]" />
            <span>Futuramaapi.com</span>
          </Link> */}
        </div>
      </Container>
      
      {/* Futuristic bottom accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#080A0E] via-[#FF2F92] to-[#080A0E]"></div>
    </div>
  )
}

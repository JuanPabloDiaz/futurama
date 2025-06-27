/**
 * Footer component with Planet Express branding
 * @component
 * @returns {JSX.Element} The rendered footer component
 */

import Image from 'next/image'
import Link from 'next/link'
import { Container } from '.'

export const Footer = () => {
  return (

<footer className="bg-[#080A0E] border-t border-[#005CA1]/30">
      {/* Stars effect background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="stars"></div>
      </div>
      
      <Container className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Planet Express logo and info */}
          <div className="flex items-center mb-6 md:mb-0">
            <div className="relative h-12 w-12 mr-4">
              <Image
                src="/icon.png"
                alt="Planet Express Logo"
                width={100}
                height={100}
                className="h-12 w-12"
              />
            </div>
            <div>
              <p className="text-sm text-[#00B8D4] font-mono tracking-wider">PLANET EXPRESS</p>
              <p className="text-xs text-gray-400">© {new Date().getFullYear()} Futurama is a registered trademark of 20th Century Fox</p>
            </div>
          </div>
          
          {/* Footer credits */}
          <div className="flex items-center space-x-4">
        <span className="text-xs text-gray-500 font-mono">Developed by
         <a href="https://linkedin.com/in/1diazdev" target="_blank" className="text-[#00B8D4] font-mono tracking-wider pl-1 hover:text-[#FF2F92] transition-colors duration-300">JUAN DIAZ</a>              

         </span> 
         <div className="h-2 w-2 rounded-full bg-[#FF2F92] animate-pulse"></div>
       </div>
        </div>
      
      </Container>
      
      {/* Futuristic top accent */}
      <div className="h-[2px] bg-gradient-to-r from-[#080A0E] via-[#FF2F92] to-[#080A0E]"></div>
    </footer>  )
}

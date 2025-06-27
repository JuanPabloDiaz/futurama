/**
 * Modern homepage that displays Futurama characters from the API
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaRocket, FaExclamationTriangle } from 'react-icons/fa'

// Componente para manejar imágenes con fallback
const CharacterImage = ({ src, alt, name }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [imgError, setImgError] = useState(false)

  // Reset error state if src changes
  useEffect(() => {
    setImgSrc(src)
    setImgError(false)
  }, [src])

  // Check if the image is from our API (which should always work)
  const isApiImage = src && src.startsWith('/api/character-avatar/')

  const handleError = () => {
    // If it's already an API image or we've already tried to handle the error, just show the fallback UI
    if (isApiImage || imgError) {
      setImgError(true)
      return
    }
    
    // Extract the character slug from the URL if possible
    let slug = ''
    try {
      if (src.includes('/characters/')) {
        const parts = src.split('/characters/')
        slug = parts[parts.length - 1].split('?')[0]
      } else {
        // Create slug from name
        slug = name.toLowerCase().replace(/\s+/g, '-')
      }
      
      // Use our API route as fallback
      const colorIndex = Math.floor(Math.random() * 5)
      const colors = ['00B8D4', 'FF2F92', '005CA1', 'AF1010', '6B5CA5']
      setImgSrc(`/api/character-avatar/${slug}?color=${colors[colorIndex]}`)
    } catch (e) {
      // If all else fails, show the fallback UI
      setImgError(true)
    }
  }

  return (
    <>
      {imgError ? (
        // Mostrar un fallback con estilo de Futurama
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#080A0E] bg-scan-lines">
          <FaExclamationTriangle className="text-[#FF2F92] text-3xl mb-2" />
          <div className="text-center px-2">
            <p className="text-[#00B8D4] text-sm font-mono glow-text">IMAGEN NO DISPONIBLE</p>
            <p className="text-white text-xs mt-1">{name}</p>
          </div>
        </div>
      ) : (
        <Image 
          src={imgSrc} 
          alt={alt} 
          fill
          sizes="100%"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={handleError}
          priority={true}
        />
      )}
    </>
  )
}

export default function HomePage() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageLoading, setImageLoading] = useState({})

  useEffect(() => {
    // Fetch characters directly from the API
    async function fetchCharacters() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(`/api/characters?t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        })

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched characters:', data)
        setCharacters(data.characters || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching characters:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-white p-4">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#005CA1] to-[#FF2F92] opacity-30 blur-lg animate-pulse"></div>
          <h1 className="relative text-3xl font-black mb-2 text-white tracking-tight">
            FUTURAMA<span className="text-[#FF2F92]">.</span>
          </h1>
        </div>
        <div className="mt-6 flex items-center space-x-3">
          <div className="h-2 w-2 rounded-full bg-[#00B8D4] animate-ping"></div>
          <p className="text-gray-400 font-mono text-sm">LOADING CHARACTER DATABASE</p>
          <div className="h-2 w-2 rounded-full bg-[#FF2F92] animate-ping" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-white p-4">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#AF1010] to-[#FF2F92] opacity-30 blur-lg"></div>
          <h1 className="relative text-3xl font-black mb-2 text-white tracking-tight">
            SYSTEM ERROR<span className="text-[#AF1010]">.</span>
          </h1>
        </div>
        <div className="bg-[#080A0E] border border-[#AF1010]/30 p-4 rounded max-w-md w-full">
          <p className="text-[#FF2F92] font-mono mb-4 text-sm">{error}</p>
          <div className="flex justify-end">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#080A0E] text-[#00B8D4] py-2 px-4 border border-[#005CA1]/50 hover:bg-[#005CA1]/10 transition-colors duration-300 font-medium text-sm uppercase"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Dark tech pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
      
      {/* Hero section */}
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#005CA1] to-[#FF2F92] opacity-30 blur-lg"></div>
            <h1 className="relative text-5xl font-black mb-2 text-white tracking-tight">
              FUTURAMA<span className="text-[#FF2F92]">.</span>
            </h1>
              {/* Futurama logo */}
        {/* <div className="relative w-64 h-64 mx-auto mb-8">
          <Image
            src="/logo.svg"
            alt="Futurama Logo"
            fill
            priority
            className="object-contain"
          />
        </div> */}
            <div className="h-1 w-24 bg-[#005CA1] mx-auto"></div>
          </div>
          
          <p className="text-xl mb-8 max-w-2xl text-gray-400 font-medium">
            CHARACTER DATABASE <span className="text-[#00B8D4]">// PLANET EXPRESS CREW</span>
          </p>
          
          <div className="bg-[#080A0E] border border-[#005CA1]/30 rounded px-6 py-3 inline-block">
            <p className="text-lg font-mono">CHARACTERS: <span className="text-[#FF2F92] font-bold">{characters.length}</span></p>
          </div>
        </div>

        {/* Character grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
          {characters.map(character => (
            <div key={character.id} className="bg-[#080A0E] rounded-md overflow-hidden border border-[#005CA1]/20 hover:border-[#00B8D4]/30 transition-all duration-300 group">
              {/* Character header with ID number */}
              <div className="flex items-center justify-between bg-[#0D1117] border-b border-[#005CA1]/20 px-3 py-2">
                <h2 className="text-lg font-bold text-white truncate">{character.name}</h2>
                <span className="text-xs font-mono text-[#00B8D4] bg-[#005CA1]/10 px-2 py-1 rounded">ID.{character.id}</span>
              </div>
              
              {/* Character image with tech frame */}
              <div className="p-4 relative">
                <div className="relative w-full aspect-square overflow-hidden border-2 border-[#080A0E] outline outline-1 outline-[#005CA1]/30 group-hover:outline-[#FF2F92]/30 transition-all">
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#FF2F92]/50"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#FF2F92]/50"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#FF2F92]/50"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#FF2F92]/50"></div>
                  
                  {/* Character image with fallback system */}
                  <CharacterImage 
                    src={character.avatar} 
                    alt={character.name} 
                    name={character.name}
                  />
                  
                  {/* Tech overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] to-transparent opacity-40"></div>
                </div>
              </div>
              
              {/* Character info */}
              <div className="px-4 pb-4">
                {/* Tags row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="bg-[#080A0E] text-[#00B8D4] text-xs px-2 py-1 border border-[#005CA1]/30 font-mono">{character.gender}</span>
                  {character.species && (
                    <span className="bg-[#080A0E] text-[#FF2F92] text-xs px-2 py-1 border border-[#FF2F92]/30 font-mono">{character.species}</span>
                  )}
                </div>
                
                {/* Description with tech styling */}
                <p className="text-gray-400 mb-4 line-clamp-2 text-sm">{character.description}</p>
                
                {/* Action button */}
                <Link 
                  href={`/characters/${character.slug}`}
                  className="block text-center bg-[#080A0E] text-[#00B8D4] py-2 px-4 border border-[#005CA1]/50 hover:bg-[#005CA1]/10 transition-colors duration-300 font-medium tracking-wider text-sm uppercase"
                >
                  Access File
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-[#005CA1]/20 mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-8 h-8 bg-[#AF1010] rounded-full flex items-center justify-center mr-3">
              <span className="text-white font-bold text-xs">PE</span>
            </div>
            <p className="text-gray-400 font-mono text-sm">PLANET EXPRESS <span className="text-[#00B8D4]">© {new Date().getFullYear()}</span></p>
          </div>
          <div className="flex items-center space-x-4">
           <span className="text-xs text-gray-500 font-mono">Developed by
            <a href="https://linkedin.com/in/1diazdev" target="_blank" className="pl-1 hover:text-[#FF2F92] transition-colors duration-300">Juan Diaz</a>
            </span> 
            <div className="h-2 w-2 rounded-full bg-[#FF2F92] animate-pulse"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

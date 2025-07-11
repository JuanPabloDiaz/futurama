/**
 * Simple character detail page that displays information about a single Futurama character
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.slug - Character slug
 */

'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaExclamationTriangle } from 'react-icons/fa'

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
          className="object-contain"
          onError={handleError}
          priority={true}
        />
      )}
    </>
  )
}

export default function CharacterDetailPage({ params }) {
  const [character, setCharacter] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // State for "Read More" functionality for sayings
  const [showAllSayings, setShowAllSayings] = useState(false)

  useEffect(() => {
    // Fetch character details directly from the API
    async function fetchCharacterDetails() {
      try {
        // Add cache-busting timestamp
        const timestamp = Date.now()
        const response = await fetch(
          `/api/characters/${params.slug}?t=${timestamp}`,
          {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache',
              Pragma: 'no-cache',
            },
          },
        )

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched character details:', data)
        setCharacter(data.character || null)
        // Las citas vienen en data.quotes
        setQuotes(data.quotes || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching character details:', err)
        setError(err.message)
        setLoading(false)
      }
    }

    fetchCharacterDetails()
  }, [params.slug])

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
          <p className="text-gray-400 font-mono text-sm">ACCESSING CHARACTER FILE</p>
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
            ACCESS DENIED<span className="text-[#AF1010]">.</span>
          </h1>
        </div>
        <div className="bg-[#080A0E] border border-[#AF1010]/30 p-4 rounded max-w-md w-full">
          <p className="text-[#FF2F92] font-mono mb-4 text-sm">{error}</p>
          <div className="flex justify-between">
            <Link
              href="/"
              className="bg-[#080A0E] text-[#00B8D4] py-2 px-4 border border-[#005CA1]/50 hover:bg-[#005CA1]/10 transition-colors duration-300 font-medium text-sm uppercase"
            >
              Return to Character Database
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#080A0E] text-[#FF2F92] py-2 px-4 border border-[#FF2F92]/50 hover:bg-[#FF2F92]/10 transition-colors duration-300 font-medium text-sm uppercase"
            >
              Retry Access
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center text-white p-4">
        <div className="relative mb-6">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#AF1010] to-[#FF2F92] opacity-30 blur-lg"></div>
          <h1 className="relative text-3xl font-black mb-2 text-white tracking-tight">
            FILE NOT FOUND<span className="text-[#AF1010]">.</span>
          </h1>
        </div>
        <div className="bg-[#080A0E] border border-[#AF1010]/30 p-4 rounded max-w-md w-full">
          <p className="text-gray-400 font-mono mb-4">Character file does not exist in the database or has been deleted.</p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="bg-[#080A0E] text-[#00B8D4] py-2 px-4 border border-[#005CA1]/50 hover:bg-[#005CA1]/10 transition-colors duration-300 font-medium text-sm uppercase"
            >
              Return to Character Database
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Calculate which sayings to display
  const allSayings = character.sayings || [];
  const initialSayings = allSayings.slice(0, 6);
  const remainingSayings = allSayings.slice(6);

  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      {/* Cosmic background with stars */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="stars-small"></div>
        <div className="stars-medium"></div>
        <div className="stars-large"></div>
      </div>
      
      <div className="container mx-auto p-4 relative z-10">
        {/* Back navigation with retro-futuristic styling */}
        <Link
          href="/"
          className="inline-flex items-center mb-6 text-[#00B8D4] hover:text-[#FF2F92] transition-colors group"
        >
          <span className="mr-2 bg-[#080A0E] border border-[#005CA1]/50 p-1 rounded-full group-hover:border-[#FF2F92]/50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </span>
          <span className="font-mono text-sm uppercase tracking-wider">Return Home</span>
        </Link>

        {/* Character profile container */}
        <div className="bg-[#080A0E] border border-[#005CA1]/30 rounded-lg overflow-hidden shadow-lg shadow-[#00B8D4]/10">
          {/* Character header with Planet Express styling */}
          <div className="bg-[#080A0E] p-4 relative overflow-hidden">
            {/* Futuristic circuit pattern overlay */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            
            {/* Tube-like header design */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center">
                <h1 className="text-3xl font-black text-white tracking-tight">{character.name?.full || character.name}</h1>
              </div>
              <div className="bg-[#080A0E] px-3 py-1 rounded-full border border-white/20">
                <span className="text-xs font-mono text-[#00B8D4]">ID.{character.id || '???'}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Character image and basic info with retro-futuristic styling */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Character image with futuristic frame */}
              <div className="w-full lg:w-1/3">
                <div className="relative">
                  {/* Tech frame with glowing elements */}
                  <div className="relative border-2 border-[#080A0E] outline outline-1 outline-[#005CA1]/50 rounded-md overflow-hidden">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[#FF2F92]/70 z-10"></div>
                    <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[#FF2F92]/70 z-10"></div>
                    <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[#FF2F92]/70 z-10"></div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[#FF2F92]/70 z-10"></div>
                    
                    {/* Character image */}
                    <div className="aspect-square relative">
                      <CharacterImage
                        src={character.avatar}
                        alt={character.name?.full || `${character.name?.first || ''} ${character.name?.last || ''}`}
                        name={character.name}
                      />
                      
                      {/* Tech overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080A0E] to-transparent opacity-30"></div>
                      
                      {/* Scan line effect */}
                      <div className="absolute inset-0 bg-scan-lines opacity-10"></div>
                    </div>
                  </div>
                  
                  {/* Character stats panel */}
                  <div className="mt-4 bg-[#0D1117] border border-[#005CA1]/30 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-[#00B8D4] font-mono text-sm uppercase">Character Stats</h3>
                      <div className="h-2 w-2 rounded-full bg-[#00B8D4] animate-pulse"></div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      {/* Nombre completo y sus partes */}
                      {character.name?.first && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">First Name:</span>
                          <span className="text-white font-medium">{character.name.first}</span>
                        </div>
                      )}
                      
                      {character.name?.middle && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Middle Name:</span>
                          <span className="text-white font-medium">{character.name.middle}</span>
                        </div>
                      )}
                      
                      {character.name?.last && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Last Name:</span>
                          <span className="text-white font-medium">{character.name.last}</span>
                        </div>
                      )}
                      
                      {/* Información básica */}
                      {character.gender && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gender:</span>
                          <span className="text-white font-medium">{character.gender}</span>
                        </div>
                      )}
                      
                      {character.species && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Species:</span>
                          <span className="text-white font-medium">{character.species}</span>
                        </div>
                      )}
                      
                      {character.homePlanet && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Planet:</span>
                          <span className="text-white font-medium">{character.homePlanet}</span>
                        </div>
                      )}
                      
                      {character.age && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Age:</span>
                          <span className="text-white font-medium">{character.age}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Character details with neon styling */}
              <div className="w-full lg:w-2/3">
                {/* About section with glowing header */}
                <div className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-[#00B8D4] flex items-center">
                    <span className="inline-block w-3 h-3 bg-[#00B8D4] mr-2"></span>
                    About
                  </h2>
                  <div className="bg-[#0D1117] border border-[#005CA1]/30 p-4 rounded-md">
                    <div className="space-y-3">
                      {character.description ? (
                        <p className="text-gray-300">{character.description}</p>
                      ) : (
                        <p className="text-gray-300">
                          {character.name?.full || character.name} is a {character.gender === 'Male' ? 'male' : character.gender === 'Female' ? 'female' : ''} {character.species} from {character.homePlanet || 'unknown origin'}.
                          {character.occupation ? ` Currently working as ${character.occupation}.` : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Occupations with retro-futuristic styling */}
                {character.occupation && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-[#FF2F92] flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#FF2F92] mr-2"></span>
                      Occupation
                    </h2>
                    <div className="bg-[#0D1117] border border-[#005CA1]/30 p-4 rounded-md">
                      <ul className="flex flex-wrap gap-2">
                        {/* Convertimos la ocupación en un array si es un string */}
                        {(typeof character.occupation === 'string' 
                          ? [character.occupation] 
                          : Array.isArray(character.occupation) 
                            ? character.occupation 
                            : []
                        ).map((occupation, index) => (
                          <li
                            key={index}
                            className="bg-[#080A0E] text-[#FF2F92] px-3 py-1 border border-[#FF2F92]/30 text-sm font-mono"
                          >
                            {occupation}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Skills with neon styling */}
                {character.skills && character.skills.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-[#00B8D4] flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#00B8D4] mr-2"></span>
                      Skills
                    </h2>
                    <div className="bg-[#0D1117] border border-[#005CA1]/30 p-4 rounded-md">
                      <ul className="flex flex-wrap gap-2">
                        {character.skills.map((skill, index) => (
                          <li
                            key={index}
                            className="bg-[#080A0E] text-[#00B8D4] px-3 py-1 border border-[#00B8D4]/30 text-sm font-mono"
                          >
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                 {/* Sayings with neon styling */}
                 {allSayings.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-bold mb-3 text-[#00B8D4] flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#00B8D4] mr-2"></span>
                      Iconic Phrases
                    </h2>
                    <div className="bg-[#0D1117] border border-[#005CA1]/30 p-4 rounded-md">
                      <ul className="flex flex-wrap gap-2">
                        {/* Display initial 10 sayings */}
                        {initialSayings.map((saying, index) => (
                          <li
                            key={`initial-saying-${index}`} // Unique key
                            className="bg-[#080A0E] text-[#00B8D4] px-3 py-1 border border-[#00B8D4]/30 text-sm font-mono"
                          >
                            {saying}
                          </li>
                        ))}

                        {/* Conditionally display the rest of the sayings */}
                        {showAllSayings &&
                          remainingSayings.map((saying, index) => (
                            <li
                              key={`remaining-saying-${index}`} // Unique key
                              className="bg-[#080A0E] text-[#00B8D4] px-3 py-1 border border-[#00B8D4]/30 text-sm font-mono"
                            >
                              {saying}
                            </li>
                          ))}
                      </ul>

                      {/* "Read More/Less" button */}
                      {allSayings.length > 10 && (
                        <button
                          onClick={() => setShowAllSayings(!showAllSayings)}
                          className="mt-4 text-[#00B8D4] hover:text-[#008FB2] text-sm font-bold focus:outline-none"
                        >
                          {showAllSayings ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Character quotes with holographic styling */}
            {quotes && quotes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-[#00B8D4] flex items-center">
                  <span className="inline-block w-3 h-3 bg-[#00B8D4] mr-2"></span>
                  Famous Quotes
                </h2>
                <div className="bg-[#0D1117]/80 backdrop-blur-sm border border-[#00B8D4]/20 p-5 rounded-md">
                  {quotes.map((quote, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <blockquote className="relative">
                        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#00B8D4] to-[#FF2F92]"></div>
                        <p className="pl-4 py-1 italic text-[#E2F8FF] text-lg">
                          &ldquo;{typeof quote === 'string' ? quote : quote.quote || quote.saying || quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
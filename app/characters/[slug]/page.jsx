/**
 * Simple character detail page that displays information about a single Futurama character
 * @param {Object} props - Component props
 * @param {Object} props.params - Route parameters
 * @param {string} props.params.slug - Character slug
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CharacterDetailPage({ params }) {
  const [character, setCharacter] = useState(null)
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
        setQuotes(data.character_quotes || [])
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
              Return to Database
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
              Return to Database
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <Link
        href="/"
        className="inline-block mb-4 text-blue-500 hover:underline"
      >
        &larr; Back to All Characters
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Character header */}
        <div className="bg-yellow-400 p-4">
          <h1 className="text-3xl font-bold text-center">{character.name}</h1>
        </div>

        <div className="p-4">
          {/* Character image and basic info */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <Image
                src={character.avatar}
                alt={character.name}
                width={300}
                height={300}
                className="w-full h-auto rounded-lg shadow-md"
                onError={e => {
                  e.target.onerror = null
                  e.target.src =
                    'https://via.placeholder.com/300x300?text=Character'
                }}
              />
            </div>

            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-semibold mb-2">About</h2>
              <p className="mb-4">{character.description}</p>

              {character.gender && (
                <p className="mb-2">
                  <span className="font-semibold">Gender:</span>{' '}
                  {character.gender}
                </p>
              )}

              {character.occupations && character.occupations.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Occupations:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {character.occupations.map((occupation, index) => (
                      <li
                        key={index}
                        className="bg-blue-100 px-3 py-1 rounded-full text-sm"
                      >
                        {occupation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {character.skills && character.skills.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-1">Skills:</h3>
                  <ul className="flex flex-wrap gap-2">
                    {character.skills.map((skill, index) => (
                      <li
                        key={index}
                        className="bg-green-100 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Character images */}
          {character.images && character.images.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Images</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {character.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-lg overflow-hidden shadow-md"
                  >
                    <Image
                      src={image}
                      alt={`${character.name} ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-auto"
                      onError={e => {
                        e.target.onerror = null
                        e.target.src =
                          'https://via.placeholder.com/400x300?text=Image+Not+Found'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Character quotes */}
          {quotes && quotes.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Famous Quotes</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                {quotes.map((item, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <blockquote className="italic border-l-4 border-yellow-400 pl-4 py-1">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

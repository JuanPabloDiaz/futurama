/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the Futurama characters data.
 */

import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Transform Futurama character data to match the expected format
  const transformedCharacters = characters.map(character => {
    // Create a slug from the character's first and last name
    const fullName = `${character.name.first} ${character.name.last}`.trim()
    const slug = fullName.toLowerCase().replace(/\s+/g, '-')
    
    // Use character's image from the data if available, otherwise create a reliable fallback URL
    // We'll use a consistent pattern for the avatar URLs that won't rely on external services
    let avatarUrl = character.images?.main || character.images?.[0] || ''
    
    // If no image is available in the data, use a reliable fallback
    if (!avatarUrl) {
      // Use a consistent pattern based on character ID for color
      const colorIndex = character.id % 5
      const colors = ['00B8D4', 'FF2F92', '005CA1', 'AF1010', '6B5CA5']
      avatarUrl = `/api/character-avatar/${slug}?color=${colors[colorIndex]}`
    }
    
    return {
      id: character.id,
      name: `${character.name.first} ${character.name.last}`.trim(),
      slug: slug,
      avatar: avatarUrl,
      gender: character.gender || 'unknown'
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ characters: transformedCharacters })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  return response
}

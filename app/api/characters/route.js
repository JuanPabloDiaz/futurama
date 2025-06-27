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
    
    // Generate a placeholder image URL with the character name
    // Using placeholder.com for simple colored placeholders with text
    const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
    const avatarUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(character.name)}`
    
    return {
      id: character.id,
      name: `${character.name.first} ${character.name.last}`.trim(),
      slug: slug,
      avatar: avatarUrl,
      description: `${fullName} is a character from Futurama.`,
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

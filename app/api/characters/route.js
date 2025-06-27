/**
 * Retrieves a list of characters from the characters.json file with all available data.
 * @returns {Promise<Object>} A promise that resolves to an object containing the complete Futurama characters data.
 */

import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'

export async function GET() {
  // Transform Futurama character data to include all available fields
  const transformedCharacters = characters.map(character => {
    // Create a slug from the character's first and last name
    const fullName = `${character.name.first} ${character.name.last}`.trim()
    const slug = fullName.toLowerCase().replace(/\s+/g, '-')
    
    // Use character's image from the data if available, otherwise leave empty
    let avatarUrl = character.images?.main || ''
    let image1 = character.images?.['head-shot'] || character.images?.main || ''
    let image2 = character.images?.main || ''
    
    // Define skills based on character name - similar to individual endpoint
    let skills = ['Future Living', 'Space Travel']
    
    if (fullName === 'Philip Fry') {
      skills = ['Pizza Delivery', 'Time Travel Survival', 'Video Games']
    } else if (fullName === 'Bender Rodriguez') {
      skills = ['Bending', 'Theft', 'Cooking', 'Drinking']
    } else if (fullName === 'Turanga Leela') {
      skills = ['Piloting', 'Martial Arts', 'Leadership']
    } else if (fullName === 'Hubert Farnsworth') {
      skills = ['Inventing', 'Science', 'Doomsday Devices']
    } else if (fullName === 'Amy Wong') {
      skills = ['Engineering', 'Martian Farming', 'Languages']
    } else if (fullName === 'Hermes Conrad') {
      skills = ['Bureaucracy', 'Limbo', 'Organization']
    }
    
    // Process quotes for display - take up to 5 random sayings
    let character_quotes = []
    if (character.sayings && character.sayings.length > 0) {
      // Take up to 5 random sayings
      const randomSayings = [...character.sayings]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
      
      character_quotes = randomSayings
    }
    
    // Create an enhanced character object with all available details
    return {
      id: character.id,
      name: {
        first: character.name.first || '',
        middle: character.name.middle || '',
        last: character.name.last || '',
        full: fullName
      },
      slug: slug,
      gender: character.gender || 'unknown',
      species: character.species || 'unknown',
      homePlanet: character.homePlanet || 'unknown',
      occupation: character.occupation || 'unknown',
      age: character.age || 'unknown',
      avatar: avatarUrl,
      images: {
        main: character.images?.main || '',
        'head-shot': character.images?.['head-shot'] || '',
        additional: [image1, image2].filter(img => img)
      },
      sayings: character.sayings || [],
      quotes: character_quotes,
      skills: skills
    }
  })

  // Add cache control headers to prevent caching
  const response = NextResponse.json({ characters: transformedCharacters })
  response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  
  return response
}

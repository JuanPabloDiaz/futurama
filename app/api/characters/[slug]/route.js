/**
 * Retrieves a Futurama character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    // Find the character by first and last name converted to slug format
    const character = characters.find(item => {
      const fullName = `${item.name.first} ${item.name.last}`.trim()
      const slug = fullName.toLowerCase().replace(/\s+/g, '-')
      return slug === params.slug
    })
    
    if (!character) {
      return new NextResponse('not found', { status: 404 })
    }

    // Create a slug from the character's name
    const fullName = `${character.name.first} ${character.name.last}`.trim()
    const slug = fullName.toLowerCase().replace(/\s+/g, '-')
    
    // Use character's actual image if available, otherwise generate placeholder
    let avatarUrl, image1, image2
    
    if (character.images && character.images.main) {
      avatarUrl = character.images.main
      image1 = character.images.main
      image2 = character.images.main
    } else {
      // Generate placeholder image URLs with the character name
      const backgroundColor = Math.floor(Math.random() * 16777215).toString(16) // Random color
      avatarUrl = `https://via.placeholder.com/200x200/${backgroundColor}/FFFFFF?text=${encodeURIComponent(fullName)}`
      image1 = `https://via.placeholder.com/400x300/${backgroundColor}/FFFFFF?text=${encodeURIComponent(fullName)}`
      image2 = `https://via.placeholder.com/300x400/${backgroundColor}/FFFFFF?text=${encodeURIComponent(fullName)}`
    }
    
    // Create an enhanced character object with additional details
    const enhancedCharacter = {
      id: character.id,
      name: fullName,
      slug: slug,
      description: `${fullName} is a character from Futurama.`,
      gender: character.gender || 'unknown',
      species: character.species || 'unknown',
      homePlanet: character.homePlanet || 'unknown',
      occupation: character.occupation || 'Unknown',
      avatar: avatarUrl,
      images: [image1, image2],
      age: character.age || 'unknown'
    }

    // Use actual character sayings if available, otherwise use generic ones
    let character_quotes = []
    
    if (character.sayings && character.sayings.length > 0) {
      // Take up to 5 random sayings
      const randomSayings = [...character.sayings]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5)
        
      character_quotes = randomSayings.map(saying => ({ quote: saying }))
    } else {
      // Generic fallback quotes
      character_quotes = [
        { quote: `Hi, I'm ${fullName}.` },
        { quote: `Welcome to the future!` },
        { quote: `That's just the way things are in the future.` }
      ]
    }

    // Add skills based on character
    if (fullName === 'Philip Fry') {
      enhancedCharacter.skills = ['Pizza Delivery', 'Time Travel Survival', 'Video Games']
    } else if (fullName === 'Bender Rodriguez') {
      enhancedCharacter.skills = ['Bending', 'Theft', 'Cooking', 'Drinking']
    } else if (fullName === 'Turanga Leela') {
      enhancedCharacter.skills = ['Piloting', 'Martial Arts', 'Leadership']
    } else if (fullName === 'Hubert Farnsworth') {
      enhancedCharacter.skills = ['Inventing', 'Science', 'Doomsday Devices']
    } else if (fullName === 'Amy Wong') {
      enhancedCharacter.skills = ['Engineering', 'Martian Farming', 'Languages']
    } else if (fullName === 'Hermes Conrad') {
      enhancedCharacter.skills = ['Bureaucracy', 'Limbo', 'Organization']
    } else {
      enhancedCharacter.skills = ['Future Living', 'Space Travel']
    }

    // Add cache control headers to prevent caching
    const response = NextResponse.json({
      character: enhancedCharacter,
      character_quotes
    })
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    
    return response
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

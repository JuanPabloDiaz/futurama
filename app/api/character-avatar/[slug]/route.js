/**
 * API route that generates a character avatar image when no image is available
 * This creates a reliable fallback image with the character's initial
 */

import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { slug } = params;
  const { searchParams } = new URL(request.url);
  const color = searchParams.get('color') || '00B8D4';
  
  // Get character name from slug
  const name = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Get the first letter of the name for the avatar
  const initial = name.charAt(0).toUpperCase();
  
  // Create an SVG avatar with the character's initial
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#080A0E" />
      <rect x="5" y="5" width="190" height="190" fill="#0D1117" stroke="#${color}" stroke-width="2" />
      
      <!-- Corner accents -->
      <path d="M5,5 L25,5 L25,7 L7,7 L7,25 L5,25 Z" fill="#${color}" />
      <path d="M195,5 L175,5 L175,7 L193,7 L193,25 L195,25 Z" fill="#${color}" />
      <path d="M5,195 L25,195 L25,193 L7,193 L7,175 L5,175 Z" fill="#${color}" />
      <path d="M195,195 L175,195 L175,193 L193,193 L193,175 L195,175 Z" fill="#${color}" />
      
      <!-- Grid pattern -->
      <path d="M0,50 L200,50" stroke="#${color}22" stroke-width="1" />
      <path d="M0,100 L200,100" stroke="#${color}22" stroke-width="1" />
      <path d="M0,150 L200,150" stroke="#${color}22" stroke-width="1" />
      <path d="M50,0 L50,200" stroke="#${color}22" stroke-width="1" />
      <path d="M100,0 L100,200" stroke="#${color}22" stroke-width="1" />
      <path d="M150,0 L150,200" stroke="#${color}22" stroke-width="1" />
      
      <!-- Character initial -->
      <text x="100" y="115" font-family="monospace" font-size="70" font-weight="bold" fill="#${color}" text-anchor="middle">${initial}</text>
      
      <!-- Planet Express logo hint -->
      <circle cx="100" cy="160" r="15" fill="#${color}33" />
      <path d="M90,160 L110,160" stroke="#${color}" stroke-width="2" />
      <path d="M100,150 L100,170" stroke="#${color}" stroke-width="2" />
    </svg>
  `;
  
  // Return the SVG as an image
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}

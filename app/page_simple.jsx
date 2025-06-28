/**
 * Homepage that displays Futurama characters
 */

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { getAllCharacters } from '@/lib/characters'

// Metadata para SEO
export const metadata = {
  title: 'Futurama Characters Database',
  description: 'Explore all your favorite Futurama characters in one place. Browse detailed profiles of Fry, Bender, Leela, and the entire Planet Express crew.',
}

// Disable caching for this page
export const revalidate = 0

export default async function Page() {
  const data = await getAllCharacters()
  
  return (
    <main>
      <Container className="py-8">
        {/* Hero section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            FUTURAMA<span className="text-[#FF2F92]">.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Explore the complete collection of Futurama characters
          </p>
          <div className="text-[#00B8D4] font-mono text-sm">
            {data?.characters?.length || 0} Characters in Database
          </div>
        </div>

        {/* Characters grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data?.characters?.map(item => (
            <Link
              href={`/characters/${item.slug}`}
              key={item.slug || item.id}
              className="bg-[#080A0E] border border-[#005CA1]/30 rounded-lg overflow-hidden hover:border-[#00B8D4]/50 transition-all duration-300 hover:scale-105"
            >
              <div className="aspect-square relative">
                <Image
                  src={item.images?.main || '/placeholder.png'}
                  alt={item.name?.english || item.name?.full || 'Character'}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-white font-bold text-sm truncate">
                  {item.name?.english || item.name?.full || 'Unknown'}
                </h3>
                {item.species && (
                  <p className="text-gray-400 text-xs mt-1">
                    {item.species}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {(!data?.characters || data.characters.length === 0) && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">No Characters Found</h2>
            <p className="text-gray-400">
              The character database appears to be empty.
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}

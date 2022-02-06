import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import { ClockIcon } from '@heroicons/react/outline'

export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync('content')

  const recepten = files.map((fileName) => {
    const slug = fileName.replace('.md', '')
    const readFile = fs.readFileSync(`content/${fileName}`, 'utf-8')
    const { data: frontmatter } = matter(readFile)
    
    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      recepten,
    },
  }
}

export default function Home({ recepten }) {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">
        Waar ga je je bier vandaag aan verkwisten?
      </h1>

      <div className="border w-full p-4 grid gap-4 grid-cols-1">
        {recepten.map(({ slug, frontmatter }) => (
          <Link href={`recepten/${slug}`}>
            <a alt={frontmatter.recipeTitle}>
              <div 
                key={slug} 
                className="flex flex-col p-5 h-64 rounded-md bg-center bg-cover overflow-hidden text-white relative"
                style={{ backgroundImage: 'url(recepten/' + frontmatter.image + ')'}}
              >
                <div className="mt-auto z-10">
                  <h1 className="font-medium text-xl">{frontmatter.recipeTitle}</h1>
                  <div className="flex items-center space-x-1.5 mt-0.5">
                    <ClockIcon className="h-5 w-5"/>
                    <span className="font-light">{frontmatter.time}</span>
                  </div>
                </div>
                <div className="absolute bg-gradient-to-b from-transparent to-black opacity-60 w-full h-1/2 mt-auto inset-0"></div>
            </div>
              
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import { ClockIcon } from '@heroicons/react/outline'
import Footer from '../components/Footer'
import Head from 'next/head'

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

function RecipeCard (props) {
  return (
    <Link href={`/recepten/${props.slug}`}>
      <a alt={props.recipeTitle}>
        <div className="flex flex-col h-64 rounded-md overflow-hidden text-white relative group">
          <div className="mt-auto z-10 p-5">
            <h1 className="font-medium text-xl leading-6">{props.recipeTitle}</h1>
            <div className="flex items-center space-x-1.5 mt-2">
              <ClockIcon className="h-5 w-5 transform group-hover:rotate-[50deg] duration-1000"/>
              <span className="font-light">{props.time}</span>
            </div>
          </div>
          <div className="absolute w-full h-full bg-cover bg-center  transform group-hover:scale-105 duration-1000" style={{ backgroundImage: 'url(recepten/' + props.image + ')'}}></div>
          <div className="absolute bg-gradient-to-b from-transparent to-black opacity-60 w-full h-2/3 mt-auto inset-0"></div>
      </div>
      </a>
    </Link>
  )
}

export default function Home({ recepten }) {
  return (
    <>
      <div className="min-h-screen flex flex-col md:border-t-4 border-amber-100">
        <div className="max-w-7xl w-full mx-auto p-8">
          <h1 className="text-3xl md:text-4xl md:mt-8 font-bold text-gray-900 max-w-lg"> Waar ga je je bier vandaag aan verkwisten?</h1>

          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {recepten.map(({ slug, frontmatter }) => (
              <RecipeCard key={slug} slug={slug} recipeTitle={frontmatter.recipeTitle} time={frontmatter.time} image={frontmatter.image} />
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}

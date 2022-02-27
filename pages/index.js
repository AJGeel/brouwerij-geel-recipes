import React, { useState, useEffect } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import { ClockIcon } from '@heroicons/react/outline'
import Footer from '../components/Footer'

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
        <div className="flex flex-col h-48 md:h-64 rounded-md overflow-hidden text-white relative group">
          <div className="mt-auto z-10 p-5">
            <h1 className="font-medium text-xl leading-6">{props.recipeTitle}</h1>
            <div className="flex items-center space-x-1.5 mt-2">
              <ClockIcon className="h-5 w-5 transform group-hover:rotate-[50deg] duration-1000"/>
              <span className="font-light">{props.time}</span>
            </div>
          </div>
          <div className="absolute w-full h-full bg-cover bg-center transform group-hover:scale-105 duration-1000" 
          style={{ 
            backgroundColor: '#ede8e1',
            backgroundImage: 'url(recepten/' + props.image + ')'}}></div>
          <div className="absolute bg-gradient-to-b from-transparent to-black opacity-60 w-full h-2/3 mt-auto inset-0"></div>
      </div>
      </a>
    </Link>
  )
}

function MetaTags () {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>Brouwerij Geel — Recepten om te maken met je bier! 🍻</title>
      <meta name="title" content="Brouwerij Geel — Recepten om te maken met je bier! 🍻"/>
      <meta name="description" content="Elke dag vraag je het je weer af: waar ga ik mijn bier vandaag aan verkwisten? Wij hebben het antwoord: deze recepten! Van omelet tot cocktail tot ijs, Brouwerij Geel neemt je mee op reis."/>
      {/* Open Graph */}
      <meta property="og:type" content="website"/>
      <meta property="og:url" content="https://brouwerij-geel-recipes.netlify.app"/>
      <meta property="og:title" content="Brouwerij Geel — Recepten om te maken met je bier! 🍻"/>
      <meta property="og:description" content="Elke dag vraag je het je weer af: waar ga ik mijn bier vandaag aan verkwisten? Wij hebben het antwoord: deze recepten! Van omelet tot cocktail tot ijs, Brouwerij Geel neemt je mee op reis. "/>
      <meta property="og:image" content="https://brouwerij-geel-recipes.netlify.app/bg-social-share.png"/>
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="twitter:url" content="https://brouwerij-geel-recipes.netlify.app"/>
      <meta property="twitter:title" content="Brouwerij Geel — Recepten om te maken met je bier! 🍻"/>
      <meta property="twitter:description" content="Elke dag vraag je het je weer af: waar ga ik mijn bier vandaag aan verkwisten? Wij hebben het antwoord: deze recepten! Van omelet tot cocktail tot ijs, Brouwerij Geel neemt je mee op reis. "/>
      <meta property="twitter:image" content="https://brouwerij-geel-recipes.netlify.app/bg-social-share.png"/>
    </Head>
  )
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default function Home({ recepten }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title= `You clicked ${count} times`
  })

  return (
    <>
      <MetaTags />
      <div className="min-h-screen flex flex-col md:border-t-4 border-amber-100">
        <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
          <h1 className="text-3xl md:text-4xl mt-8 font-bold text-gray-900 max-w-lg"> Waar ga je je bier vandaag aan verkwisten?</h1>
          
          <button className="px-3 py-1 rounded-md shadow-md text-gray-900 border-2 border-gray-100 my-8 hover:bg-gray-900 hover:text-white duration-150 ease-in-out" onClick={() => setCount(count + 1)}>Je hebt {count} keer geklikt.</button>

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

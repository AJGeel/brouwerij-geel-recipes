import React, { useState, useEffect } from 'react'
import fs from 'fs'
import matter from 'gray-matter'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
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
  const router = useRouter()

  return (
    <Link href={`/recepten/${props.slug}`}>
      <a 
        alt={props.recipeTitle}
        onClick={() => router.push(`/recepten/${props.slug}`)}>
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

// function shuffle(array) {
//   let currentIndex = array.length,  randomIndex;

//   // While there remain elements to shuffle...
//   while (currentIndex != 0) {

//     // Pick a remaining element...
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     // And swap it with the current element.
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex], array[currentIndex]];
//   }

//   return array;
// }


// function Example() {
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     document.title = `You clicked ${count} times`;
//   });

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }

function GeefRandom(props) {
  const router = useRouter()
  const randIndex = Math.floor(Math.random() * props.recepten.length)
  const randomRecipeSlug = props.recepten[randIndex].slug

  return (
    <button 
      className="px-4 py-3 rounded-md bg-gray-100 text-gray-900 hover:bg-amber-500 hover:text-white duration-150 flex items-center justify-center space-x-2 flex-shrink-0"
      onClick={() => router.push(`/recepten/${randomRecipeSlug}`)}> 
      <span>Geen idee</span>
      <svg className="" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.9803 3.34191C17.9803 3.32173 17.9687 3.30374 17.9617 3.28357C17.9512 3.23571 17.9315 3.19005 17.9039 3.14907C17.9039 3.13343 17.8877 3.11544 17.8761 3.0998C17.8504 3.06258 17.8208 3.02817 17.788 2.99658L14.8763 0.180472C14.6989 0.0204762 14.4482 -0.0383274 14.2148 0.0250126C13.9813 0.0883526 13.7988 0.264928 13.7334 0.490934C13.668 0.716928 13.7287 0.959497 13.894 1.13122L15.6197 2.80156H13.6902C12.8221 2.80187 11.9964 3.16472 11.4247 3.79702L4.65152 11.2881C4.345 11.627 3.90289 11.8222 3.4377 11.8239H0.694977C0.446625 11.8239 0.217168 11.9522 0.0930718 12.1604C-0.0310239 12.3684 -0.0310239 12.6249 0.0930718 12.8329C0.217168 13.041 0.446616 13.1693 0.694977 13.1693H3.4377C4.30571 13.169 5.13157 12.8061 5.70311 12.1738L12.4717 4.68273C12.7797 4.34209 13.2247 4.14674 13.6925 4.1469H15.6244L13.8986 5.81724C13.7607 5.94173 13.6808 6.11502 13.6776 6.29754C13.6742 6.48005 13.7477 6.656 13.881 6.78504C14.0143 6.91407 14.1961 6.98507 14.3847 6.98194C14.5733 6.97866 14.7523 6.9014 14.8807 6.76799L17.7996 3.94952C17.8324 3.91808 17.8618 3.88352 17.8876 3.84645C17.8876 3.83082 17.9062 3.81283 17.9154 3.79719V3.79703C17.943 3.75606 17.9628 3.71054 17.9733 3.66253C17.9733 3.64235 17.9872 3.62437 17.9918 3.60419C18.0057 3.51692 18.0019 3.42778 17.9802 3.34191L17.9803 3.34191Z" fill="currentColor"/>
        <path d="M17.8759 12.8695C17.8759 12.8538 17.8945 12.8359 17.9037 12.8202V12.8201C17.9313 12.7791 17.951 12.7336 17.9615 12.6856C17.9615 12.6654 17.9754 12.6474 17.9801 12.6272V12.6274C17.9979 12.5407 17.9979 12.4516 17.9801 12.3649C17.9801 12.3448 17.9685 12.3268 17.9615 12.3066C17.951 12.2588 17.9313 12.2131 17.9037 12.1721C17.9037 12.1565 17.8875 12.1385 17.8759 12.1228C17.8538 12.087 17.8281 12.0532 17.7995 12.022L14.8761 9.20133C14.6987 9.04134 14.4481 8.98238 14.2146 9.04588C13.9811 9.10922 13.7987 9.28579 13.7332 9.5118C13.6678 9.73763 13.7285 9.98036 13.8938 10.1521L15.6196 11.8224H13.6693C13.2125 11.8207 12.7776 11.6327 12.4716 11.3044L10.5397 9.22825C10.4202 9.0842 10.2447 8.99396 10.0545 8.97879C9.86417 8.96378 9.67577 9.02508 9.53373 9.14848C9.39154 9.27188 9.30816 9.44642 9.30299 9.63114C9.29782 9.81585 9.3715 9.99461 9.50659 10.1252L11.4385 12.2014C12.0095 12.8151 12.8229 13.1654 13.6762 13.1654H15.6267L13.901 14.8357H13.9008C13.763 14.9602 13.6832 15.1335 13.6798 15.316C13.6765 15.4986 13.7499 15.6745 13.8832 15.8035C14.0165 15.9326 14.1983 16.0037 14.3869 16.0005C14.5754 15.9973 14.7545 15.9201 14.8831 15.7865L17.7995 12.9726C17.8283 12.9407 17.8538 12.9061 17.8759 12.8695L17.8759 12.8695Z" fill="currentColor"/>
        <path d="M0.695011 4.14746H3.45163C3.91116 4.14777 4.34889 4.33686 4.65607 4.66763L6.58795 6.7438H6.58811C6.70752 6.88784 6.883 6.97809 7.07332 6.99326C7.26351 7.00827 7.45191 6.94696 7.59411 6.82356C7.73614 6.70017 7.81968 6.52563 7.82469 6.34091C7.82986 6.1562 7.75618 5.97744 7.62109 5.84684L5.68921 3.77067C5.11817 3.15697 4.30492 2.80664 3.4516 2.80664H0.694978C0.446625 2.80664 0.217168 2.93489 0.0930718 3.14289C-0.0310239 3.35106 -0.0310239 3.60741 0.0930718 3.81557C0.217168 4.02374 0.446617 4.15183 0.694978 4.15183L0.695011 4.14746Z" fill="currentColor"/>
      </svg>
    </button>
  )
}

export default function Home({ recepten }) {
  // const [count, setCount] = useState(0)

  // useEffect(() => {
  //   document.title= `You clicked ${count} times`
  // })

  return (
    <>
      <MetaTags />
      <div className="min-h-screen flex flex-col md:border-t-4 border-amber-100">
        <div className="max-w-7xl w-full mx-auto p-5 sm:p-8">
          <h1 className="text-3xl md:text-4xl mt-8 font-bold text-gray-900 max-w-lg"> Waar ga je je bier vandaag aan verkwisten?</h1>

          <div className="flex space-x-2 items-center mt-8 overflow-x-auto">
            {/* <button className="px-4 py-3 rounded-md text-gray-900 bg-gray-100 hover:bg-amber-500 hover:text-white duration-150 ease-in-out flex-shrink-0" onClick={() => setCount(count + 1)}>Je hebt {count} keer geklikt.</button> */}

            <GeefRandom recepten={recepten}/>
          </div>

          <div className="w-full grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12">
            {recepten.map(({ slug, frontmatter }) => (
              <RecipeCard key={slug} slug={slug} recipeTitle={frontmatter.recipeTitle} time={frontmatter.time} image={frontmatter.image}/>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

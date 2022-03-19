import fs from 'fs'
import React from 'react'
import matter from 'gray-matter'
import md from 'markdown-it'
import { RWebShare } from 'react-web-share'
import { ShareIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../../components/Footer'

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* Helper functions */

export async function getStaticPaths() {
    // Retrieve all our slugs
    const files = fs.readdirSync('content')

    const paths = files.map((fileName) => ({
        params: {
            slug: fileName.replace('.md', ''),
        },
    }))

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({ params: { slug } }) {
    const fileName = fs.readFileSync(`content/${slug}.md`, 'utf-8');
    const { data: frontmatter, content } = matter(fileName);
    return {
        props: {
            frontmatter,
            content,
            slug
        },
    }
}

function removeAsterisks (s) {
    // Remove unwanted characters from description blurb: asterisks, numericals, line breaks in various OSes
    s = s.replaceAll('*', '').replaceAll('1.', '').replaceAll('2.', '').replaceAll(/(\r\n|\n|\r)/gm, '')
    s = 'Bereiding:' + s

    return s
}

function truncateString (string, amount) {
    // Truncate a string to a specified amount
    return string.substring(0, amount);
}

function contentToSEO (content) {
    return truncateString(removeAsterisks(content), 155) + '...'
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* Partial components */

function LoadingIndicator(props) {
    return (
        <svg className={props.className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

function Ingredient(props) {
    return (
        <div className="rounded-md flex items-center justify-between space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gray-100 rounded-md">
                {props.image === 'placeholder' ? <LoadingIndicator className="animate-spin m-1.5 h-5 w-5 text-gray-400"/> : <Image src={'/recepten/ingredienten/' + props.image + '.png'} width="32" height="32" />}
            </div>
            <p className="flex-grow">{props.name}</p>
            <p className="text-gray-400 font-thin">{props.amount}</p>
        </div>
    )
}

function RecipeImage(props) {
    return (
        <div className="w-full mb-8 md:rounded-md bg-center bg-cover flex flex-col h-64 sm:h-80 md:h-96 relative overflow-hidden" style={{ backgroundImage: 'url(' + props.image + ')'}}>
            <h1 className="md:hidden text-white font-bold text-2xl p-5 mt-auto z-10">{props.recipeTitle}</h1>
            <div className="absolute bg-gradient-to-b from-transparent to-black opacity-60 md:opacity-0 w-full h-1/2 mt-auto inset-0"></div>
        </div>
    )
}

function RecipeHeader(props) {
    const preparedURL = 'https://brouwerij-geel-recipes.netlify.app/recepten/' + props.slug;
    const preparedTitle = 'Bekijk de ' + props.name + ' op'

    return (
        <div className="w-full flex items-center justify-between md:border-t-4 border-amber-100">
            <Link href="/">
                <button 
                    className="w-16 h-16 flex items-center justify-center hover:bg-gray-100 cursor-pointer active:scale-90 duration-150 group"
                    alt="Terug naar de homepage">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
                </button>
            </Link>
            <h1 className="font-bold text-2xl text-gray-900">
                Recept
                <span className="hidden md:inline-block">: {props.name}</span>
            </h1>
            <RWebShare 
                data={{
                    text: preparedTitle,
                    url: preparedURL,
                    title: "Deel dit recept met je makkers 👨‍👩‍👧‍👦",
                }}
                sites={["whatsapp", "mail", "facebook", "copy"]}
                closeText={"Sluiten"}
                // Hieronder zou een callback gezet kunnen worden.
                // onClick={() => console.log("Shared successfully!")}
            >
                <button 
                    className="w-16 h-16 flex items-center justify-center hover:bg-gray-100 cursor-pointer active:scale-90 duration-150 group"
                    alt="Deel dit recept"
                    >
                    <ShareIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
                </button>
            </RWebShare>
        </div>
    )
}

function MetaTags (props) {
    const preparedContent = contentToSEO(props.content)
    const preparedTitle = 'Recept: ' + props.recipeTitle + ' — Brouwerij Geel 🍻'
    const preparedImage = 'https://brouwerij-geel-recipes.netlify.app/recepten/' + props.image
    const preparedURL = 'https://brouwerij-geel-recipes.netlify.app/recepten/' + props.slug

    return (
      <Head>
        {/* Primary Meta Tags */}
        <title>{preparedTitle}</title>
        <meta name="title" content={preparedTitle}/>
        <meta name="description" content={preparedContent}/>
        {/* Open Graph */}
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={preparedURL}/>
        <meta property="og:title" content={preparedTitle}/>
        <meta property="og:description" content={preparedContent}/>
        <meta property="og:image" content={preparedImage}/>
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content={preparedURL}/>
        <meta property="twitter:title" content={preparedTitle}/>
        <meta property="twitter:description" content={preparedContent}/>
        <meta property="twitter:image" content={preparedImage}/>
      </Head>
    )
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
/* View */

export default function RecipePage({ frontmatter, content, slug }) {
    return (
        <>
            <MetaTags recipeTitle={frontmatter.recipeTitle} content={content} image={frontmatter.image} slug={slug}/>
            <div className="min-h-screen flex flex-col text-gray-900">
                <RecipeHeader name={frontmatter.recipeTitle} slug={slug}/>
                <div className="max-w-3xl mx-auto">
                    <RecipeImage image={frontmatter.image} recipeTitle={frontmatter.recipeTitle} />
                    <div className="flex flex-col-reverse md:flex-row md:space-x-12 px-6">
                        <div>
                            <h2 className="font-medium text-lg">Bereiding</h2>
                            <div className="mt-4 text-gray-600 prose" dangerouslySetInnerHTML={{ __html: md().render(content) }} />
                        </div>
                        <div className="md:w-64 mb-16 md:mb-0 flex-shrink-0">
                            <h2 className="font-medium text-lg">Ingrediënten</h2>
                            <div className="mt-4 space-y-1.5">
                                {frontmatter.ingredients.map((i) => (
                                    <Ingredient key={i.name} name={i.name} image={i.image} amount={i.amount} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

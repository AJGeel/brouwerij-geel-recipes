import fs from 'fs'
import React from 'react'
import matter from 'gray-matter'
import md from 'markdown-it'
import { ShareIcon, ChevronLeftIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import Footer from '../../components/Footer'

function Ingredient(props) {
    return (
        <div className="rounded-md flex items-center justify-between space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gray-100 rounded-md">
                <img src={'ingredienten/' + props.image + '.png'} />
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
    return (
        <div className="w-full flex items-center justify-between md:border-t-4 border-amber-100">
            <Link href="/">
                <button 
                    className="w-16 h-16 flex items-center justify-center cursor-pointer active:scale-90 duration-150 group"
                    alt="Back to homepage">
                    <ChevronLeftIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
                </button>
            </Link>
            <h1 className="font-bold text-2xl text-gray-900">
                Recept
                <span className="hidden md:inline-block">: {props.name}</span>
            </h1>
            <button 
                className="w-16 h-16 flex items-center justify-center cursor-pointer active:scale-90 duration-150 group"
                alt="Share this recipe"
                onClick={() => alert('Geduld, jonge padawan... ⏳ \n\nSpoedig zult gij deze recepten met uw mede-padawans kunnen delen. Maar alleen als gij er klaar voor zijt...')}>
                <ShareIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
            </button>
        </div>
    )
}

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
        },
    };
}

export default function RecipePage({ frontmatter, content }) {
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="min-h-screen flex flex-col text-gray-900">
                <RecipeHeader name={frontmatter.recipeTitle} />
                <div className="max-w-3xl mx-auto">
                    <RecipeImage image={frontmatter.image} recipeTitle={frontmatter.recipeTitle} />
                    <div className="flex flex-col-reverse md:flex-row md:space-x-12 px-6">
                        <div>
                            <h2 className="font-medium text-lg">Instructies</h2>
                            <div className="mt-4 text-gray-600 prose" dangerouslySetInnerHTML={{ __html: md().render(content) }} />
                        </div>
                        <div className="md:w-64 mb-16 md:mb-0 flex-shrink-0">
                            <h2 className="font-medium text-lg">Ingrediënten</h2>
                            <div className="mt-4 space-y-1.5">
                                <Ingredient name="Porter" image="porter" amount="100 ml"/>
                                <Ingredient name="Eieren" image="ei" amount="5×"/>
                                <Ingredient name="Slagroom" image="slagroom" amount="500 ml"/>
                                <Ingredient name="Vanillepeul" image="vanillepeul" amount="1/2×"/>
                                <Ingredient name="Suiker" image="suiker" amount="150 g"/>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

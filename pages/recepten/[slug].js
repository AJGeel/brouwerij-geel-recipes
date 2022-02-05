// @dev slug md parsing based on https://www.pullrequest.com/blog/build-a-blog-with-nextjs-and-markdown/

import React from 'react'
import matter from 'gray-matter'
import {ShareIcon, ChevronLeftIcon} from '@heroicons/react/outline'

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
        <div className="w-full flex items-center justify-between border-t-4 border-amber-100 select-none">
            <div className="w-16 h-16 flex items-center justify-center cursor-pointer active:scale-90 duration-150 group">
                <ChevronLeftIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
            </div>
            <h1 className="font-bold text-2xl text-gray-900">
                Recept
                <span className="hidden md:inline-block">: {props.name}</span>
            </h1>
            <div className="w-16 h-16 flex items-center justify-center cursor-pointer active:scale-90 duration-150 group">
                <ShareIcon className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 duration-150"/>
            </div>
        </div>
    )
}

function Footer() {
    return (
        <div className="w-full bg-gradient-to-b from-transparent to-amber-100 flex-grow mt-16 min-h-[120px]"></div>
    )
}

function PostTemplate({content, data}) {
    // This holds the data between `---` from the .md file
    const frontmatter = data

    return (
        <>
        <div className="min-h-screen flex flex-col">

            <RecipeHeader name={data.recipeTitle} />

            <div className="max-w-3xl mx-auto">
                <RecipeImage image={data.image} recipeTitle={data.recipeTitle} />
                <div className="flex flex-col-reverse md:flex-row md:space-x-12 px-6">
                    <div>
                        <h2 className="font-medium text-lg">Instructies</h2>
                        <div className="mt-4 whitespace-pre-line text-gray-600">{content}</div>
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

PostTemplate.getInitialProps = async (context) => {
    const { slug } = context.query
    
    // Import our .md file using the `slug` from the URL
    const content = await import(`../../content/${slug}.md`)
    
    // Parse .md data through `matter`
    const data = matter(content.default)
    
    // Pass data to our component props
    return { ...data }
  }

export default PostTemplate

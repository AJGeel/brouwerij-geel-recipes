import Footer from '../components/Footer'
import Image from 'next/image'
import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col md:border-t-4 border-amber-100">
            <div className="max-w-7xl w-full mx-auto p-5 sm:p-8 flex-grow flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-4xl md:mt-8 font-bold text-gray-900 max-w-lg mx-auto text-center"> Whoops, dit recept konden we niet vinden...</h1>

                <Link href="/">
                    <div className="flex flex-col rounded-md overflow-hidden mt-12 cursor-pointer group hover:shadow-lg duration-1000">
                        <Image className="transform group-hover:scale-105 duration-1000" src="/oh-jee.gif" width="498" height="280" />
                        <button className="w-full bg-amber-500 group-hover:bg-gray-900 duration-1000 text-white text-lg px-4 py-3 z-10">
                            Doe mij dan maar de homepagina 🤷
                        </button>
                    </div>
                </Link> 

            </div>

            <Footer />
        </div>
    )
}

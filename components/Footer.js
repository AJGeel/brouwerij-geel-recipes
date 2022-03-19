import React, { Component } from 'react'
import BrouwerijGeelLogo from '../public/brouwerij-geel.svg'

export default function Footer() {
    return (
        <div className="w-full bg-gradient-to-b from-transparent to-amber-100 flex-grow mt-16 min-h-[120px] flex justify-center">
            <div 
            className="mt-auto mb-10 text-gray-900 hover:text-gray-600 duration-150 cursor-pointer animate-bounce"
            onClick={() => alert('Brouwerij Geel... What else?')}>
                <BrouwerijGeelLogo width="100" height="62"/>
            </div>
        </div>
    )
}

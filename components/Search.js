import React, { Component } from 'react'

export default function Search() {
    return (
        <>
            <script catche-key="85534acd-dcec-481c-a14e-f0caa578d5c2" type="module" crossOrigin src="https://cdn.jsdelivr.net/gh/CatcheSearch/catche-search-widget@0.1.0/dist/index.min.js"></script>
            {/* Next line is optional to preload modules */}
            <link rel="modulepreload" href="https://cdn.jsdelivr.net/gh/CatcheSearch/catche-search-widget@0.1.0/dist/vendor.min.js"></link>
        </>
    )
}

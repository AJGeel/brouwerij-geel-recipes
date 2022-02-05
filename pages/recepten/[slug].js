// @dev slug md parsing based on https://www.pullrequest.com/blog/build-a-blog-with-nextjs-and-markdown/

import React from 'react'
import matter from 'gray-matter'

function PostTemplate({ content, data}) {
    // This holds the data between `---` from the .md file
    const frontmatter = data

    return (
        <>
            <h1>{frontmatter.title}</h1>
            <div className="whitespace-pre-line">{content}</div>
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

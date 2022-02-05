import React from 'react'

function Home(props) {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900">
        {props.question}
      </h1>

      <div className="">

      </div>
    </div>
  )
}

Home.getInitialProps = () => {
  return {
    question: 'Waar ga je je bier vandaag aan verkwisten?'
  }
}

export default Home

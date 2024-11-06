import React from 'react'
import PostPage from '../components/Posts'
import FilterSection from '../components/Posts/FilterSection'

const Homepage = () => {
  return (
    <div className='bg-homepage' >
      <FilterSection />
      <PostPage />
    </div>
  )
}

export default Homepage
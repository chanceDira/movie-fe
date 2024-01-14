import React from 'react'
import Navbar from '../components/navbar/Navbar'
import MovieCard from '../components/MovieCard/MovieCard'

const Home = () => {
  return (
    <div className='relative w-9/12 h-full'>

<Navbar />

<div className='mt-28 grid grid-cols-1 md:grid-cols-4 gap-4 '>


<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />
<MovieCard />


</div>

    </div>
  )
}

export default Home
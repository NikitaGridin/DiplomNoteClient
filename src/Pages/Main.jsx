import React from 'react'
import { observer } from 'mobx-react-lite'
import PopularTrack from '../Components/PopularTrack'
import PopularAlbuns from '../Components/PopularAlbum'
import PopularAuthor from '../Components/PopularAuthor'
import AllGenres from '../Components/AllGenres'

const Main = observer(() => {
  return (
    <div className='w-9/12 mx-auto'>
      <PopularTrack />
      <PopularAlbuns />
      <PopularAuthor/>
      <AllGenres />
    </div>
  )
})

export default Main
import React from 'react'
import { observer } from 'mobx-react-lite'
import NewTrack from '../Components/NewTrack'
import NewAlbum from '../Components/NewAlbum'


const NewRelease = observer(() => {
  return (
    <div className='w-9/12 mx-auto'>
      <NewTrack />
      <NewAlbum />
    </div>
  )
})

export default NewRelease
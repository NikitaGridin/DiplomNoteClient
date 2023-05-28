import React from 'react'
import PopularTrack from '../Components/PopularTrack'
import { observer } from 'mobx-react-lite'

const Main = observer(() => {
  return (
    <div className='w-9/12 mx-auto'>
      <PopularTrack />
    </div>
  )
})

export default Main
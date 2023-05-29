import React from 'react'
import { observer } from 'mobx-react-lite';

const Genre = observer(({genre}) => {

  return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}>
        <img className='rounded-lg w-full h-60 object-cover' src={import.meta.env.VITE_IMG_URL+genre.img} alt="" />
        <div className='m-3'>
          <div className='font-bold text-sm mb-2'>{genre.title}</div>
          <div className='text-sm font-light mb-2'>{genre.nickname}</div>
          <div className='text-[10px] font-light mb-2'>{genre.popular_genre}</div>
          <div className='text-[10px] font-light mb-2'>{genre.count_tracks} треков</div>
        </div>
    </div>
  )
})

export default Genre
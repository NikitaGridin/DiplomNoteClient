import React from 'react'
import { observer } from 'mobx-react-lite';

const Author = observer(({author}) => {

    return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}>
        <img className='rounded-lg w-full h-80 object-cover' src={import.meta.env.VITE_IMG_URL+author.img} alt="" />
        <div className='m-3'>
          <div className='font-bold text-sm mb-2'>{author.title}</div>
          <div className='text-sm font-light mb-2'>{author.nickname}</div>
          <div className='text-[10px] font-light mb-2'>{author.popular_genre}</div>
          <div className='text-[10px] font-light mb-2'>{author.auditions} прослушиваний</div>
        </div>
    </div>
  )
})

export default Author
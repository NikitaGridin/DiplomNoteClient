import React from 'react'
import { observer } from 'mobx-react-lite';
import ModalAlbum from './ModalAlbum';

const Album = observer(({album,deleteAlbum}) => {
  const [modal, setModal] = React.useState(false)

  const handleModal = () =>{
    setModal(!modal)
  }
    return (
    <div
      className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}
      onClick={()=>handleModal()}>
      {
        modal &&
          <ModalAlbum album={album} close={handleModal} deleteAlbum={deleteAlbum}/>
      }
        <img className='rounded-lg w-full h-80 object-cover' src={import.meta.env.VITE_IMG_URL+album.img} alt="" />
        <div className='m-3'>
          <div className='font-bold text-sm mb-2'>{album.title}</div>
          <div className='text-sm font-light mb-2'>{album.User.nickname}</div>
          <div className='text-[10px] font-light mb-2'>{album.auditions} прослушиваний</div>
        </div>
    </div>
  )
})

export default Album
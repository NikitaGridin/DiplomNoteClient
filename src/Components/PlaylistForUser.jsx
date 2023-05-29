import React from 'react';
import Album from './Album';
import axios from 'axios';
import userStore from '../store/userStore';
import { observer } from 'mobx-react-lite';

const AlbumForUser = observer(() => {
  const [tracks, setTracks] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const userId = userStore.userData.id;

  React.useEffect(() => {
    if (userStore.userData.id) {
      handleChangePart();
    }  
  }, [userStore.userData]);
  
  const handleChangePart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}libray/allPlaylist/${currentPart}/${userId}`);
      setTracks(prevTracks => prevTracks.concat(data));
      setCurrentPart(currentPart + 1);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const deleteAlbum = (id) => {
    const newTracks = tracks.filter(track => track.id !== id)
    setTracks(newTracks)
  }
  return (
    <div className='mb-[120px]'>
      {
        loading && <div className='absolute flex w-full h-screen bg-white justify-center items-center z-10 top-0 left-0'>Загрузка</div>
      }
      <div className='grid grid-cols-4 gap-10 mb-14'>
        {
             tracks.map((playlist,i)=>{
              return(
              <div key={i} className={`rounded-lg border shadow-lg hover:border-orange-300 transition-all cursor-pointer`}>
                <img className='rounded-lg w-full h-80 object-cover' src={import.meta.env.VITE_IMG_URL+playlist.img} alt="" />
                <div className='m-3'>
                  <div className='font-bold text-sm mb-2'>{playlist.title}</div>
                  <div className='text-sm font-light mb-2'>{playlist.User.nickname}</div>
                  <div className='text-[10px] font-light mb-2'>{playlist.auditions} прослушиваний</div>
                </div>
            </div>
              )
          })
        }
      </div>
      {
        tracks.length > 0 &&
      <div className='text-center'>
        <button className='border border-[#8A8A8A] text-[#8A8A8A] text-sm py-3 px-4 rounded-xl inline-block' onClick={handleChangePart}>
          Посмотреть ещё
        </button>
      </div>

      }
    </div>
  );
})

export default AlbumForUser;
import React from 'react'
import axios from 'axios';

const Playlists = () => {
    const [playlists, setPlaylists] = React.useState([]);
    const [currentPart, setCurrentPart] = React.useState(1);

    const handleChangePart = async () => {
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}playlist/all/${currentPart}`);
          setPlaylists(prevPlaylists => prevPlaylists.concat(data));
          setCurrentPart(currentPart + 1);
        } catch (error) {
          console.log(error?.response?.data);
        }
      };

      React.useEffect(() => {
        handleChangePart();
      }, []);
  return (
    <div className='w-9/12 mx-auto'>
        <h1 className='font-bold text-2xl mb-7'>Плейлисты</h1>
        <div className='grid grid-cols-4 gap-10 mb-14'>
        {
            playlists.map((playlist,i)=>{
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
        <div className='text-center'>
        <button className='border border-[#8A8A8A] text-[#8A8A8A] text-sm py-3 px-4 rounded-xl inline-block' onClick={handleChangePart}>
          Посмотреть ещё
        </button>
        </div>
    </div>
  )
}

export default Playlists
import React from 'react'
import Track from './Track'
import userStore from '../store/userStore';
import Close from '../assets/close.svg';
import axios from 'axios';

const ModalAlbum = ({album,close,deleteAlbum}) => {
    const [isAdded,setIsAdded] = React.useState(false);
    const [isAddedTracks,setIsAddedTracks] = React.useState(false);

    const handleDeleteAlbum = async (e) => {
          try {
            const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}libray/deleteAlbum/${userStore.userData.id}/${album.id}`);
            setIsAdded(false); 
            deleteAlbum(album.id)
          } catch (error) {
            console.log(error?.response?.data);
          }
        };
        const handleAddAlbum = async (e) => {
          try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}libray/addAlbum`,
            {userId: userStore.userData.id, albumId: album.id});
            setIsAdded(true);
          } catch (error) {
            console.log(error?.response?.data);
          }
        };
        const getAddedAlbums = async () => {
          try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}libray/addedAlbums/${userStore.userData.id}`);
            userStore.setAlbums(data);
            setIsAdded(userStore.albumsData.includes(album.id));
          } catch (error) {
            console.log(error?.response?.data);
          }
        };

        const getAddedTracks = async () => {
          try {
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}libray/addedTracks/${userStore.userData.id}`);
            userStore.setTracks(data);
            setIsAddedTracks(userStore.tracksData.includes(album.id));
          } catch (error) {
            console.log(error?.response?.data);
          }
        };
  

React.useEffect(()=>{
  getAddedAlbums();
  getAddedTracks();
},[])

  return (
    <div 
        className='fixed w-full h-screen bg-black/40 top-0 left-0 flex justify-center items-center cursor-default'
        onClick={() => close()}  
        >
            <div 
                className='w-1/3 rounded-lg bg-white p-10 relative'
                onClick={e => e.stopPropagation()}>   
                            <img src={Close} className='absolute right-5 top-5 cursor-pointer' alt="" onClick={() => close()}/>                 
            <div className='grid grid-cols-2 gap-10'>
                <img className='rounded-lg object-cover h-60 w-full' src={import.meta.env.VITE_IMG_URL+album.img} alt="" />
                <div className=''>
                    <div className='font-bold text-sm mb-2'>{album.title}</div>
                    <div className='text-sm font-light mb-2'>{album.User.nickname}</div>
                    <div className='text-[10px] font-light mb-2'>{album.auditions} прослушиваний</div>
                    {
                    isAdded
                    ? userStore.isAuth && <button className='text-white bg-[#2eec19] py-2 px-3 rounded-lg mt-28' onClick={()=>handleDeleteAlbum()}>Добавлен</button>
                    : userStore.isAuth && <button className='text-white bg-[#1986EC] py-2 px-3 rounded-lg mt-28' onClick={()=>handleAddAlbum()}>Добавить</button>
                    
                  }
                </div>
            </div>
            <div className='grid gap-5 mt-14'>
                {album.Tracks.map((track, i) => {
                    return <Track key={i} num={i + 1} track={track} addedTracks={userStore.tracksData}  trackId={album.Tracks[i].id} url={import.meta.env.VITE_AUDIO_URL+album.Tracks[i].audio} img={import.meta.env.VITE_IMG_URL+album.img} ttle={album.Tracks[i].title} authorId={album.User.id} authorNickname={album.User.nickname} coautors={album.Tracks[i].CoauthorAlias}/>;
              })}
                </div>
            </div>
    </div>
  )
}

export default ModalAlbum
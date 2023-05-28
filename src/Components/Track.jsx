import React from 'react'
import h_f from '../assets/h_f.svg'
import h_e from '../assets/h_e.svg'
import PopupTrack from './PopupTrack'
import {Link} from 'react-router-dom';
import userStore from '../store/userStore'
import { observer } from 'mobx-react-lite';
import axios from 'axios';

const Track = observer(({num, track,addedTracks}) => {
    const [isAdded,setIsAdded] = React.useState(false);
    const [popup,setPopup] = React.useState(false);
    const handlePopupTrack =()=>{
        setPopup(!popup);
    }

    const handleDeleteTrack = async () => {
        try {
          const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}libray/deleteTrack/${userStore.userData.id}/${track.id}`);
          setIsAdded(false); // устанавливаем isAdded в false, чтобы кнопка на экране изменилась на "Добавить"
        } catch (error) {
          console.log(error?.response?.data);
        }
      };
      const handleAddTrack = async () => {
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}libray/addTrack`,
          {userId: userStore.userData.id, trackId: track.id});
          setIsAdded(true); // устанавливаем isAdded в true, чтобы кнопка на экране изменилась на "Добавить"
        } catch (error) {
          console.log(error?.response?.data);
        }
      };

    
      React.useEffect(() => {
        setIsAdded(addedTracks.includes(track.id));
      }, [addedTracks, track]);

    const button = isAdded ? (
      <button onClick={()=>handleDeleteTrack()}><img src={h_f} className='w-6 mr-5'/></button>
    ) : (
      <button onClick={()=>handleAddTrack()}><img src={h_e} className='w-6 mr-5'/></button>
    );  
    return (
    <div className='flex py-2 px-5 justify-between bg-gray-100 rounded-lg relative'>
        <div className='flex items-center'>
            <div className='mr-5'>{num}</div>
            <img className='w-16 h-16 object-cover rounded-2xl mr-5' src={track.Album.img} alt="" />
            <div>
                <div className='font-bold text-lg mb-1'>{track.title}</div>
                <div className='font-normal text-xs'>
                    <Link className='mr-2'>{track.Album.User.nickname}</Link>
                    {
                    track.CoauthorAlias.map((e,i) => <Link key={i}>{e.User.nickname}</Link>)
                    }
                </div>
            </div>
        </div>
        <div className='flex items-center'>
            {button}           
            <div className='mr-5'>2:42</div>
            <div onClick={()=>handlePopupTrack()}>...</div>
            {
                popup &&
                <PopupTrack onClose={setPopup}/>
            }
        </div>
    </div>
  )
})

export default Track
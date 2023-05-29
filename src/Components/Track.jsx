import React from 'react'
import h_f from '../assets/h_f.svg'
import h_e from '../assets/h_e.svg'
import P_block from '../assets/p_block.svg'
import Pa_block from '../assets/pa_block.svg'
import PopupTrack from './PopupTrack'
import {Link} from 'react-router-dom';
import userStore from '../store/userStore'
import currentTrackStore from '../store/currentTrackStore'
import { observer } from 'mobx-react-lite';
import axios from 'axios';

const Track = observer(({
  num,
  addedTracks,
  delOn,
  url,
  img,
  title,
  authorId,
  authorNickname,
  coautors,
  trackId,
  wait
}) => {
    const [isAdded,setIsAdded] = React.useState(false);
    const [popup,setPopup] = React.useState(false);
    const [action,setAction] = React.useState(false);

    const handlePopupTrack =(e)=>{
      e.stopPropagation(); // Останавливаем передачу события
      setPopup(!popup);
    }
    const getAddedTracks = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}libray/addedTracks/${userStore.userData.id}`);
        // userStore.setTracks(data);
        setIsAdded(data.includes(trackId));
      } catch (error) {
        console.log(error?.response?.data);
      }
    };
    React.useEffect(() => {
      getAddedTracks();
    }, [addedTracks, trackId]);

    const handleAddAudition = async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}audition/add`,{
          idUser: userStore.userData.id,
          idTrack: trackId
        });
      } catch (error) {
        console.log(error?.response?.data);
      }
    };

    const playTrack = async () => {
      if(userStore.userData.id){
        handleAddAudition();
      }
      if(currentTrackStore.currentTrack.id === trackId){
        currentTrackStore.togglePlayPause();
      }
      else{
      currentTrackStore.setCurrentTrack({
        id:trackId,
        url:url,
        img:img,
        title:title,
        authorId:authorId,
        authorNickname:authorNickname,
        coautors:coautors
      })
      currentTrackStore.setCurrentTime(0)
    }
    };

    const handleDeleteTrack = async (e) => {
      e.stopPropagation(); // Останавливаем передачу события
        try {
          const { data } = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}libray/deleteTrack/${userStore.userData.id}/${trackId}`);
          setIsAdded(false); 
          if(delOn){
            delOn(trackId);
          }
        } catch (error) {
          console.log(error?.response?.data);
        }
      };
      const handleAddTrack = async (e) => {
        e.stopPropagation(); // Останавливаем передачу события
        try {
          const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}libray/addTrack`,
          {userId: userStore.userData.id, trackId: trackId});
          setIsAdded(true);
        } catch (error) {
          console.log(error?.response?.data);
        }
      };


      const accept = async (e) => {
        e.stopPropagation(); // Останавливаем передачу события
        try {
          const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
          {userId: userStore.userData.id, trackId: trackId, status: 2});
          setAction(false)
        } catch (error) {
            console.log(error?.response?.data);
          }
        };
        const cancel = async (e) => {
          e.stopPropagation(); // Останавливаем передачу события
          try {
            const { data } = await axios.put(`${import.meta.env.VITE_BACKEND_URL}changeStatus/track`,
            {userId: userStore.userData.id, trackId: trackId, status: 3});
            setAction(true)
          } catch (error) {
            console.log(error?.response?.data);
          }
        };



    const button = isAdded ? (
      <button onClick={(e)=>handleDeleteTrack(e)}><img src={h_f} className='w-6 mr-5'/></button>
    ) : (
      <button onClick={(e)=>handleAddTrack(e)}><img src={h_e} className='w-6 mr-5'/></button>
    );  

    const buttonSet = action ? (
      <button onClick={(e)=>accept(e)}>Подтвердить</button>
    ) : (
      <button onClick={(e)=>cancel(e)}>Отменить</button>
    ); 

    return (
    <div
    className={`flex py-2 px-5 justify-between shadow-lg border rounded-lg relative items-center cursor-pointer hover:border-yellow-400 transition-all ${currentTrackStore.currentTrack.id === trackId ? 'border-yellow-400' : ''}`}
    onClick={()=>playTrack()}
    >
        <div className='flex items-center'>
            <div className='mr-5'>{num}</div>
            <div>
            {currentTrackStore.currentTrack.id === trackId && (
          <div className='absolute'>
            {currentTrackStore.isPlaying ? <img src={Pa_block} alt="" /> : <img src={P_block} alt="" />}
          </div>
        )}
              <img className='w-12 h-12 object-cover rounded-xl mr-5' src={img} alt="" />
            </div>
            <div>
                <div className='font-bold text-lg mb-1'>{title}</div>
                <div className='font-normal text-xs'>
                    <Link className='mr-2'>{authorNickname}</Link>
                    {
                    coautors.map((e,i) => <Link key={i}>{e.User.nickname}</Link>)
                    }
                </div>
            </div>
        </div>
        {
          !wait &&
        <div className='flex items-center'>
          {
            userStore.isAuth &&
            button          
          }
            <div onClick={(e)=>handlePopupTrack(e)}>...</div>
            {
              popup &&
                <PopupTrack onClose={setPopup}/>
            }
        </div>
        }
        {
          wait &&
          buttonSet
        }
    </div>
  )
})

export default Track
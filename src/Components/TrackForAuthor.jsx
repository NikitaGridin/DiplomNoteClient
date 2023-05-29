import React from 'react';
import Track from './Track';
import axios from 'axios';
import userStore from '../store/userStore';
import { observer } from 'mobx-react-lite';

const TrackForUser = observer(() => {
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
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}track/tracksForAuthor/${currentPart}/${userId}`);
      setTracks(prevTracks => prevTracks.concat(data));
      setCurrentPart(currentPart + 1);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  const deleteTrack = (id) => {
    const newTracks = tracks.filter(track => track.id !== id)
    setTracks(newTracks)
  }
  return (
    <div className='mb-[120px]'>
      {
        loading && <div className='absolute flex w-full h-screen bg-white justify-center items-center z-10 top-0 left-0'>Загрузка</div>
      }
      <div className='grid grid-cols-2 gap-10 mb-14'>
        {tracks.map((track, i) => {
          return <Track key={i} num={i + 1} track={track} addedTracks={userStore.tracksData}  trackId={track.id} url={import.meta.env.VITE_AUDIO_URL+track.audio} img={import.meta.env.VITE_IMG_URL+track.Album.img} ttle={track.title} authorId={track.Album.User.id} authorNickname={track.Album.User.nickname} coautors={track.CoauthorAlias}/>;
        })}
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

export default TrackForUser;
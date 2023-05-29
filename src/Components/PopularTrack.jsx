import React from 'react';
import Track from './Track';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import userStore from '../store/userStore';

const PopularTrack = observer(() => {
  const [tracks, setTracks] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handleChangePart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}track/mostListenedTracksInCurrentMonth/${currentPart}`);
      setTracks(prevTracks => prevTracks.concat(data));
      setCurrentPart(currentPart + 1);
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  React.useEffect(() => {
    handleChangePart();
  }, []);
  return (
    <div className='mb-[120px]'>
      {
        loading && <div className='absolute flex w-full h-screen bg-white justify-center items-center z-10 top-0 left-0'>Загрузка</div>
      }
      <h1 className='font-bold text-2xl mb-7'>Главное за месяц</h1>
      <div className='grid grid-cols-2 gap-10 mb-14'>
        {tracks.map((track, i) => {
          return <Track key={i} num={i + 1} track={track} addedTracks={userStore.tracksData}  trackId={track.id} url={import.meta.env.VITE_AUDIO_URL+track.audio} img={import.meta.env.VITE_IMG_URL+track.Album.img} title={track.title} authorId={track.Album.User.id} authorNickname={track.Album.User.nickname} coautors={track.CoauthorAlias}/>;
        })}
      </div>
      <div className='text-center'>
        <button className='border border-[#8A8A8A] text-[#8A8A8A] text-sm py-3 px-4 rounded-xl inline-block' onClick={handleChangePart}>
          Посмотреть ещё
        </button>
      </div>
    </div>
  );
})

export default PopularTrack;
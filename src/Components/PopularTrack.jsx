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
      setLoading(true); // устанавливаем значение loading в true
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}track/all/${currentPart}`);
      setTracks(prevTracks => prevTracks.concat(data));
      setCurrentPart(currentPart + 1);
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false); // устанавливаем значение loading в false после завершения запроса
    }
  };

  React.useEffect(() => {
    handleChangePart();
  }, []);

  return (
    <div>
      {
        loading && <div className='absolute flex w-full h-screen bg-white justify-center items-center z-10 top-0 left-0'>Загрузка</div>
      }
      <h1 className='font-bold text-2xl mb-7'>Главное за месяц</h1>
      <div className='grid grid-cols-2 gap-20 mb-14'>
        {tracks.map((track, i) => {
          return <Track key={i} num={i + 1} track={track} addedTracks={userStore.tracksData}/>;
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
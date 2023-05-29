import React from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';
import userStore from '../store/userStore';

import Track from '../Components/Track'
import Album from '../Components/Album'

const Search = observer(() => {
  const [search, setSearch] = React.useState('');
  const [users, setUsers] = React.useState([]);
  const [albums, setAlbums] = React.useState([]);
  const [tracks, setTracks] = React.useState([]);
  const [req, setReq] = React.useState(false);
  
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let timerId = null;
    if (search) {
      timerId = setTimeout(() => {
        handleSearch(search);
        setReq(true)
      }, 500);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [search]);

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}search/search/${value}`);
      setUsers(data.users)
      setAlbums(data.albums)
      setTracks(data.tracks)
    } catch (error) {
      console.log(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}search/search/`);
    setUsers([]);
    setAlbums([]);
    setTracks([]);
    setReq(false)
    setSearch('');  
  }
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className='w-9/12 mx-auto'>
      <div className='flex items-start'>
      <input
        type="text"
        placeholder='Текст для поиска'
        className='border-black border-b-[1px] w-full mb-10 pb-2'
        onChange={handleChange}
        value={search}
      />
      <button
          onClick={()=>handleClear()}
          className='bg-black text-white px-5 text-sm py-2 rounded-lg'>
        Очистить
      </button>
      </div>
      <div className='relative'>
        {loading &&
        <div className='absolute top-0 left-0 w-full h-screen z-10 flex justify-center bg-white'>LOADING...</div>}
        {
            albums.length === 0 &&  users.length === 0 && tracks.length === 0 && req &&
            <h1 className='text-center text-2xl font-semibold'>Ничего не найдено!</h1>
        }
              {
        users.length > 0 && 
        <div className='mb-28'>
      <h1 className='font-bold text-2xl mb-7'>Музыканты</h1>
      <div className='grid grid-cols-4 gap-10'>
          {
            users.map((user,i)=>{
            return(
              <div className='flex items-center'>
                <img
                  src={import.meta.env.VITE_IMG_URL+user.img}
                  className='w-20 h-20 object-cover rounded-full mr-5'
                />
                {user.nickname}
                </div>
            )
            })
          }
      </div>
        </div>
      }
      {
        albums.length > 0 && 
        <div className='mb-28'>
        <h1 className='font-bold text-2xl mb-7'>Альбомы</h1>
        <div className='grid grid-cols-4 gap-10'>
          {
            albums.map((album,i)=><Album key={i} album={album}/>)
          }
      </div>
        </div>
      }
      {
        tracks.length > 0 && 
        <div className=''>
        <h1 className='font-bold text-2xl mb-7'>Аудиозаписи</h1>
        <div className='grid grid-cols-2 gap-10'>
            {tracks.map((track, i) => {
              return <Track key={i} num={i + 1} track={track} addedTracks={userStore.tracksData}/>;
            })}
          </div>
        </div>
      }
      </div>
    </div>
  );
});

export default Search;
import { useParams } from 'react-router-dom';
import React from 'react'
import axios from 'axios';
import TrackForAuthor from '../Components/TrackForAuthor'
import AlbumForAuthor from '../Components/AlbumForAuthor'
import WaitAccept from '../Components/WaitAccept'
import userStore from '../store/userStore';

const AuthorPage = () => {
  const { id } = useParams();
  const [user,setUser] = React.useState();
  const [view, setView] = React.useState('tracks')
  const [addTrackForm, setAddTrackForm] = React.useState(false);
  const cover = React.useRef(null); // Define the cover ref here

  const onSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    
    // Добавляем поля из формы в formData
    formData.append('title', e.target.title.value)
    formData.append('type', e.target.type.value)
    formData.append('userId', userStore.userData.id)
    formData.append('genres', e.target.genre.value)
    formData.append('coauthors', [1,2,3])
    formData.append('img', cover.current.files[0])
    
    tracks.forEach((track, index) => {
      formData.append('titleTrack', track.title);
      formData.append('audio', track.audio);
    });
    
    // Отправляем formData на сервер
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/album/add`, formData)
      .then(response => {
        // Обработка успешного ответа от сервера
        console.log(response.data);
      })
      .catch(error => {
        // Обработка ошибок при отправке данных на сервер
        console.log(error);
      });
  }

  const [tracks, setTracks] = React.useState([{
    title: '',
    audio: ''
  }]);
  
  const addTrack = (e) => {
    e.stopPropagation()
    setTracks([
      ...tracks, 
      {
        title: '',
        audio: ''
      }
    ]) 
  }  

  const getUser = async () => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}user/one/${id}`);
      setUser(data);
    } catch (error) {
        console.log(error?.response?.data);
    }
  };
  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <div className='w-9/12 mx-auto'>
      {
        addTrackForm && 
        <div className='fixed top-0 left-0 w-full h-screen bg-black/30 z-20 flex justify-center items-center' onClick={()=>setAddTrackForm(!addTrackForm)}>
          <form action="" onClick={(e)=>e.stopPropagation()} onSubmit={onSubmit} className='w-1/2 bg-white rounded-lg px-4 py-8 grid grid-cols-1'>
            <h1>Добавить альбом</h1>
            <input type="text" name='title' placeholder='Название релиза'/>
            <select name="type" id="">
              <option value="">Тип релиза</option>
              <option value="1">EP</option>
              <option value="2">Альбом</option>
              <option value="3">Сингл</option>
            </select>
            <select name="genre" id="">
              <option value="1">Жанр</option>
              <option value="2">Рок</option>
              <option value="3">Рэп</option>
              <option value="4">Поп</option>
            </select>
            <input  
            type="file" 
            name='cover'   
            placeholder='Обложка'
            ref={cover} 
          />            
    {tracks.map((track, index) => (
    <div key={index}>
      <input 
        type="text" 
        placeholder="Название трека"
        value={track.title}
        onChange={e => {
          const newTracks = [...tracks];
          newTracks[index].title = e.target.value;
          setTracks(newTracks);
        }}      
       /> 
      <input 
        type="file"  
        placeholder="Аудио"     
        onChange={e => {    
          const newTracks = [...tracks];
          newTracks[index].audio = e.target.files[0]; // add file to track object
          setTracks(newTracks);   
        }}        
       />    
    </div>   
  ))}
  <button onClick={(e)=>addTrack(e)}>
    Добавить ещё трек
  </button>
  <button type="submit">Отправить</button>
          </form>
        </div>
      }
        {
            user &&
            <>
            <div className='grid grid-cols-4 mb-10'>
                <img src={import.meta.env.VITE_IMG_URL+user.img} alt="" className='w-64 h-64 object-cover rounded-full'/>
                <div>
                    <div className='mb-4'>Исполнитель</div>
                    <div className='font-bold text-4xl mb-4'>{user.nickname}</div>
                    <div>{user.subscribes} подписчиков</div>
                {
                  userStore.userData.id == id &&
                  <button className='cursor-pointer border py-2 px-4 rounded-lg' onClick={()=>setAddTrackForm(!addTrackForm)}>Добавить альбом</button>
                }
                </div>
            </div>
        <div className='mb-10'>
         <button 
           onClick={() => setView('tracks')}
           className={`${view === 'tracks' ? 'border-b-4 border-[#1986EC]' : ''} mr-8`}
           >
           Треки
         </button>
         <button 
           onClick={() => setView('albums')}  
           className={`${view === 'albums' ? 'border-b-4 border-[#1986EC]' : ''} mr-8`}
           >
           Альбомы
         </button>
         <button 
           onClick={() => setView('waitAccept')}
           className={`${view === 'waitAccept' ? 'border-b-4 border-[#1986EC]' : ''}`}
           > 
           Ждут подтверждения
         </button> 
         </div>
  
        {view === 'tracks' && <TrackForAuthor />}       
        {view === 'albums' && <AlbumForAuthor />}  
        {view === 'waitAccept' && <WaitAccept />}
            </>
        }
    </div>
  )
}

export default AuthorPage

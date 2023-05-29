import React from 'react';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import Author from './Author'

const PopularAlbuns = observer(() => {
  const [authors, setAuthors] = React.useState([]);
  const [currentPart, setCurrentPart] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  const handleChangePart = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}author/all/${currentPart}`);
      setAuthors(prevAuthors => prevAuthors.concat(data));
      setCurrentPart(currentPart + 1);
    } catch (error) {
      console.log(error?.response?.data);
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
      <h1 className='font-bold text-2xl mb-7'>Популярные исполнители</h1>
      <div className='grid grid-cols-4 gap-10 mb-14'>
          {
            authors.map((author,i)=><Author key={i} author={author}/>)
          }
      </div>
      <div className='text-center'>
        <button className='border border-[#8A8A8A] text-[#8A8A8A] text-sm py-3 px-4 rounded-xl inline-block' onClick={handleChangePart}>
          Посмотреть ещё
        </button>
      </div>
    </div>
  );
})

export default PopularAlbuns;
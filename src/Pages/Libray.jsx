import React from 'react'

import TrackForUser from '../Components/TrackForUser'
import AlbumForUser from '../Components/AlbumForUser'
import PlaylistForUser from '../Components/PlaylistForUser'
import { observer } from 'mobx-react-lite'

const Library = observer(() => {
    const [view, setView] = React.useState('tracks')
  
    return (
      <div className='w-9/12 mx-auto'>
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
           onClick={() => setView('playlists')}
           className={view === 'playlists' ? 'border-b-4 border-[#1986EC]' : ''}
           > 
           Плейлисты
         </button>  
         </div>
  
        {view === 'tracks' && <TrackForUser />}       
        {view === 'albums' && <AlbumForUser />}  
        {view === 'playlists' && <PlaylistForUser />}
        {/* {view === 'artists' && <Artists />} */}
      </div>   
    )
  })
  
  export default Library
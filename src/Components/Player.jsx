import React, { useEffect, useRef, useState } from 'react'
import prev from '../assets/prev.svg'
import play from '../assets/play.svg'
import next from '../assets/next.svg'
import vol from '../assets/vol.svg'
import PopupTrack from './PopupTrack'
import h_f from '../assets/h_f.svg'

const Player = () => {
    const [popup,setPopup] = React.useState(false);
    const handlePopupTrack =()=>{
        setPopup(!popup);
    }
    const popupRef = useRef(null);
    const [popupVolume, setPopupVolue] = useState(false);
    const handlePopupVolume =()=>{
        setPopupVolue(!popupVolume);
    }

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setPopupVolue(false);
        }
      };
    
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  return (
    <div className='fixed bottom-5 py-2 px-8 flex bg-gray-200 rounded-xl w-2/3 mx-auto left-0 right-0 items-center'>
        <div className='flex mr-16'>
            <img src={prev} alt="" className='mr-4'/>
            <img src={play} alt="" className='mr-4'/>
            <img src={next} alt="" />
        </div>
        <div className='flex mr-44'>
            <img className='w-14 h-14 object-cover rounded-2xl mr-5' src='https://sun9-7.userapi.com/impg/A17iKkRYkUQqY4RUdrjN4pHxIoZOs8vJlNZl4g/N-LEYS2d5-8.jpg?size=1619x2160&quality=95&sign=2cd0f1199cf770175db2992f9b6092b9&type=album' alt="" />
            <div>
                <div className='font-bold text-xl'>1989</div>
                <div>Taylor Swift</div>
            </div>
        </div>
        <div className='flex w-1/3 items-center'>
            <div className='mr-5'>0:36</div>
            <div className='w-full bg-white h-2 rounded-lg relative'>
                <div className='absolute bg-black h-full w-1/2 rounded-lg'></div>
            </div>
            <div className='ml-5'>2:24</div>
        </div>
        <div className='ml-20 relative'>
            <img src={vol} alt="" onClick={()=>handlePopupVolume()}/>
            {
                popupVolume && 
                <div ref={popupRef} className='absolute bg-white h-36 w-3 -top-40 border left-0 right-0 mx-auto rounded-lg border-black/20'>
                    <div className='w-full h-1/2 bg-black absolute bottom-0 rounded-lg'></div>
                </div>
            }
        </div>
        <div className='flex items-center ml-20'>
            <div><img src={h_f} alt="" className='w-10 mr-5'/></div>
            <div onClick={()=>handlePopupTrack()}>...</div>
            {
                popup &&
                <PopupTrack onClose={setPopup}/>
            }
        </div>
    </div>
  )
}

export default Player
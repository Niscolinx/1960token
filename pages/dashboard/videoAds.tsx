import React from 'react'
import ReactPlayer from 'react-player/youtube' 


function videoAds() {
  return (
      <div className='grid justify-center'>
          

          <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' style={{
            width: '100%',
            height: '100%'
          }}/>
      </div>
  )
}

export default videoAds
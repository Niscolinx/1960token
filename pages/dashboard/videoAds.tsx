import React from 'react'
import ReactPlayer from 'react-player/youtube'

function videoAds() {
    return (
        <div className='grid justify-center h-[78vh]'>
            <div className='grid'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                    width='300px'
                />
            </div>
        </div>
    )
}

export default videoAds

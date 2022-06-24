import React from 'react'
import ReactPlayer from 'react-player/youtube'

function videoAds() {
    return (
        <div className='grid justify-center h-[78vh]'>
            <div className='grid self-center'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                    width='100%'
                    controls={false}
                    light={true}
                />
            </div>
        </div>
    )
}

export default videoAds

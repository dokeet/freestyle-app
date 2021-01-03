import Word from "../components/Word"
import { useState } from "react"
import * as YoutubePlayer from 'react-player/youtube'
import * as SoundCloudPlayer from 'react-player/soundcloud'

export default function IndexPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSoundcloud, setShowsoundcloud] = useState(false)
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=vjWwR5FGj1k")

  const handlePlay = (e) => {
    console.log('is playing')
    console.log(e)
    setIsPlaying(true)
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
  const handleOnChange = (e) => {
    if (e.target.value.includes('youtube')) {
      setShowsoundcloud(false)
    }
    if(e.target.value.includes('soundcloud')){
      setShowsoundcloud(true)
    }
    if(isPlaying){
      setIsPlaying(false)
    }
    setVideoUrl(e.target.value)
  }
  return (
    <div>
      <div className="py-20">
        <h1 className="text-5xl text-center text-accent-1">
          <Word isPlaying={isPlaying} />
          <div className="max-w-xs mx-auto flex items-center">
            <label className="text-base" htmlFor="link">link: </label> 
            <input name="link" id="link" className="block w-full mx-auto text-xs" type="text" onChange={handleOnChange} defaultValue={videoUrl} />
          </div>
          <div>
            <p className="text-lg">You can add youtube or soundclound link</p>
          </div>
          <button className="text-5xl" onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg> : <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}</button>
          <div className="mx-auto">
            {showSoundcloud ? <SoundCloudPlayer url={videoUrl}
              onPlay={handlePlay}
              onPause={handlePause}
              className="mx-auto"
              /> :
              <div className="bg-white relative">
              <YoutubePlayer url={videoUrl}
                onPlay={handlePlay}
                onPause={handlePause}
                className="mx-auto z-0 absolute"
                playing={isPlaying}
              />
              <div className="fixed w-full h-full bg-white"></div>
             </div> 
            }
          </div>
        </h1>
      </div>
    </div>
  )
}

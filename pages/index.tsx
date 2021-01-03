import Word from "components/Word"
import { useState } from "react"
import * as YoutubePlayer from 'react-player/youtube'
import * as SoundCloudPlayer from 'react-player/soundcloud'

export default function IndexPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSoundcloud, setShowsoundcloud] = useState(false)
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=vjWwR5FGj1k")

  const handlePlay = (e) => {
    console.log('is playing')
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
          <div className="mx-auto">
            {showSoundcloud ? <SoundCloudPlayer url={videoUrl}
              onPlay={handlePlay}
              onPause={handlePause}
              className="mx-auto"
            /> :
              <YoutubePlayer url={videoUrl}
                onPlay={handlePlay}
                onPause={handlePause}
                className="mx-auto"
              />
            }
          </div>
        </h1>
      </div>
    </div>
  )
}

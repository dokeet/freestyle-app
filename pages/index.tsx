import Word from "../components/Word"
import { useState, useRef, useEffect } from "react"
import * as YoutubePlayer from 'react-player/youtube'
import * as SoundCloudPlayer from 'react-player/soundcloud'

export default function IndexPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSoundcloud, setShowsoundcloud] = useState(false)
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=vjWwR5FGj1k")
  const [progress, setProgress] = useState(0)
  const [maxProgress, setMaxProgress] = useState(0)
  const [timeString, setTimeString] = useState("")
  const [isSeeking, setIsSeeking] = useState(false)
  const [seconds, setSeconds] = useState(10)
  const playerRef = useRef(null)
  const handlePlay = () => {
    setIsPlaying(true)
  }
  const handleOnReady = (e) => {
    setMaxProgress(e.getDuration())
  }
  const handlePause = () => {
    setIsPlaying(false)
  }
  const handleOnChange = (e) => {
    setTimeString("00:00:00")
    if (e.target.value.includes('youtube')) {
      setShowsoundcloud(false)
    }
    if (e.target.value.includes('soundcloud')) {
      setShowsoundcloud(true)
    }
    if (isPlaying) {
      setIsPlaying(false)
    }
    setVideoUrl(e.target.value)
  }
  const handleProgress = (e) => {
    if (!isSeeking) {
      setProgress(e.playedSeconds)
    }
  }
  const handleSeeking = (e) => {
    setProgress(e.target.value)
  }
  useEffect(() => {
    const date = new Date(0);
    date.setSeconds(progress); // specify value for SECONDS here
    const timeString = date.toISOString().substr(11, 8);
    setTimeString(timeString)
  }, [progress])
  const handleSeekingDown = () => {
    setIsSeeking(true)
  }
  const handleSeekingUp = () => {
    setIsSeeking(false)
    playerRef.current.seekTo(progress)
  }
  useEffect(() => {
    setMaxProgress(playerRef?.current?.getDuration())
  }, [videoUrl, progress])

  return (
    <div>
      <div className="py-20 text-center">
        <h1 className="text-5xl text-center text-accent-1">
          <Word isPlaying={isPlaying} seconds={seconds} />
        </h1>
          <h3 className="text-2xl">
            {seconds === 10 && 'Easy mode'}
            {seconds === 5 && 'Hard mode'}
            {seconds === 3 && 'Extreme mode'}
          </h3>
          <div className="max-w-xs mx-auto flex items-center">
            <label className="text-base" htmlFor="link">link: </label>
            <input name="link" id="link" className="block w-full mx-auto text-xs" type="text" onChange={handleOnChange} defaultValue={videoUrl} />
          </div>
          <div>
            <p className="text-lg">You can add youtube or soundclound link</p>
          </div>
          <div className="flex items-center justify-center">
            <button className="text-5xl" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <PlayIcon /> : <StopIcon />}
            </button>
            <input
              className="w-60"
              type='range' min={0} max={maxProgress} step='any'
              value={progress}
              onMouseDown={handleSeekingDown}
              onChange={handleSeeking}
              onMouseUp={handleSeekingUp}
            />
            <p className="text-base">{timeString}</p>
          </div>
          <div className="grid place-items-center">
            {showSoundcloud ? <SoundCloudPlayer url={videoUrl}
              onPlay={handlePlay}
              onPause={handlePause}
              className="mx-auto"
            /> :
              <YoutubePlayer
                ref={playerRef}
                url={videoUrl}
                onPlay={handlePlay}
                onPause={handlePause}
                onReady={handleOnReady}
                className="grid-area"
                playing={isPlaying}
                controls={true}
                height={0}
                onProgress={handleProgress}
                config={{
                  youtube: {
                    playerVars: {
                      controls: 1
                    }
                  }
                }}
              />
            }
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center">
              <h2 className="text-2xl">Set Easy mode: (10s) </h2>
              <button className="bg-gray-400 p-2 text-lg text-white" onClick={() => setSeconds(10)}>select</button>
            </div>
            <div className="flex items-center justify-center">
              <h2 className="text-2xl">Set Hard mode:  (5s)</h2>
              <button className="bg-gray-400 p-2 text-lg text-white" onClick={() => setSeconds(5)}>select</button>
            </div>
            <div className="flex items-center justify-center">
              <h2 className="text-2xl">Set Extreme mode:  (3s)</h2>
              <button className="bg-gray-400 p-2 text-lg text-white" onClick={() => setSeconds(3)}>select</button>
            </div>
          </div>
        
      </div>
    </div>
  )
}

const PlayIcon = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path></svg>

const StopIcon = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
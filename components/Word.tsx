import { useEffect, useState } from "react";
import words from "utils/word-generator";
const Word = ({ isPlaying }) => {
  const [word, setWord] = useState(words)

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      setWord(words)
    }, 5000);

    return () => {
      clearTimeout(timer)
    }
  }, [isPlaying, word])

  return <div>
    <p className="text-sm">{isPlaying ? 'Playing: ' : 'Stopped'}</p>
    <h1 className="text-7xlxl py-4">{isPlaying ? `${word}` : `Palabra`}</h1>
  </div>
}
export default Word
import React, { useRef, useState } from 'react';
import { list1 } from 'playlist';

function pad2(number) {
  return (number < 10 ? '0' : '') + number

}

const App = () => {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlay, setPlay] = useState(false);

  const thunderAudioRef = useRef();
  const [isThunderMute, setThunderMute] = useState(true)

  const riverAudioRef = useRef();
  const [isRiverMute, setRiverMute] = useState(true)

  const handleLoadedDataEvent = () => {
    console.log(list1[audioIndex].name);
    if (!isPlay) {
      audioRef.current.play();
      setPlay(true);
    }
  };

  const handleEndedEvent = () => {
    if (audioIndex === list1.length - 1) {
      setAudioIndex(0);
      setPlay(false);
      return;
    }

    setAudioIndex(audioIndex + 1);
    setPlay(false);
  };

  const handlePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlay(!isPlay);
  };

  return (
    <div className='w-screen h-screen flex bg-primary justify-center'>
        <audio
         ref={audioRef}
         src={process.env.PUBLIC_URL + list1[audioIndex].name}
         onEnded={handleEndedEvent}
         onLoadedData={handleLoadedDataEvent}
         onTimeUpdate={() => {
           setCurrentTime(audioRef.current.currentTime)
          }}
        />
        <audio
         ref={thunderAudioRef}
         src={process.env.PUBLIC_URL + 'thunderstorm.m4a'}
         onTimeUpdate={() => {
          var buffer = 1.2
          if(thunderAudioRef.current.currentTime > thunderAudioRef.current.duration - buffer){
            thunderAudioRef.current.currentTime = 4
          }
         }}
         muted={isThunderMute}
         autoPlay
        />
        <audio
         ref={riverAudioRef}
         src={process.env.PUBLIC_URL + 'riverstream.m4a'}
         onTimeUpdate={() => {
          var buffer = 1.2
          if(riverAudioRef.current.currentTime > riverAudioRef.current.duration - buffer){
            riverAudioRef.current.currentTime = 2
          }
         }}
         muted={isRiverMute}
         autoPlay
        />
        <div className="p-16">
          <div className="flex pb-10">
            <div className="text-gold mr-4">
              {pad2(Math.floor(currentTime / 3600))}:{pad2(Math.floor(currentTime / 60))}:
              {pad2(Math.floor(currentTime % 60))}
            </div>
             <button className="text-gold ml-4 focus:outline-none" onClick={handlePlayClick}>[{isPlay ? 'PAUSE' : 'PLAY'}]</button>
           </div>
          <p className="text-gold uppercase py-4">list one</p>
          {list1.map( (e, i) => {
            if (i === audioIndex) {
              return <p className="text-highlight">[{e.name.substring(0, e.name.length - 4)}]</p>
            }
            return <p className="text-gold cursor-pointer" onClick={() => {
              setAudioIndex(i);
              setPlay(false);
            }}>{e.name.substring(0, e.name.length - 4)}</p>
          })}
        </div>

        <div className="p-16">
          <button className="text-hope focus:outline-none block" onClick={() => {setThunderMute(!isThunderMute)}}>
            [{isThunderMute ? 'ON' : 'OFF'}] Thunder Rain
          </button>
          <button className="text-hope focus:outline-none" onClick={() => {setRiverMute(!isRiverMute)}}>
            [{isRiverMute ? 'ON' : 'OFF'}] River stream
          </button>
        </div>
    </div>
  );
};

export default App;

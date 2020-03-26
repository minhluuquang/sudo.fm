import React, { useRef, useState } from "react";

const App = () => {
  const audioRef = useRef();
  const [isPlay, setPlay] = useState(false);

  const handlePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlay(!isPlay);
  };

  return (
    <div className="bg-primary w-screen h-screen">
      <button onClick={handlePlayClick}>Play/Pause</button>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + "Unity.m4a"} />
    </div>
  );
};

export default App;

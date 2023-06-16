import React, { useRef } from 'react';

const VideoHover = ({ imageSrc, videoSrc }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div
      className="container" id='no_padding' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <img src={imageSrc} alt="error"/>
		  <video className="video" src={videoSrc} autoPlay={false} muted ref={videoRef}></video>
    </div>
  );
};
export default VideoHover;

function Video(props) {

    const gameLevel = props.gameLevel
    const display = props.display
    console.log(display)

    return (
        <video key={gameLevel.video_src} className="gdriveVideo video_level"  id="myVideo" preload="auto" style={{display:display}} controls>
                <source src={gameLevel.video_src} type='video/mp4'/>
        </video>
    )
}


export default Video;
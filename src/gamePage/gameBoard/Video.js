

function Video(props) {

    const gameLevel = props.gameLevel

    return (
        <div>
            <div>
            Copy my moves:
            </div>
            <video key={gameLevel.video_src} className="gdriveVideo" preload="auto" width="300" height="250" controls>
                <source src={gameLevel.video_src} type='video/mp4'/>
            </video>
        </div>
    )
}


export default Video;
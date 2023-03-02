// import { useNavigate } from 'react-router-dom'
// import { setGame } from "./GameProvider";

function Question(props) {

    return (
        <div>
            {console.log(props.txt)}
            <div>user name: {props.txt.user}</div>
            <div>{props.txt.content}</div>
            {props.txt.answers.map((answer) => {
                    return <div>user name: {answer.user} - {answer.content}</div>
                })
            }
        </div>
      );
  }
  
  export default Question; 
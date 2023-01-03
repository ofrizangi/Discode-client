import { setToken, getToken } from "./userManagment/authorization";

function Games(props) {

    function logout(){
        setToken(null)
        props.setIsLogged(false)
    }

    return (
        <div>
            { console.log(getToken())}
            <h1> Welcome to Discode Game page </h1>
            <button className="btn btn-primary" onClick={logout}>  Logout  </button>
        </div>
      );
  }
  
  export default Games;
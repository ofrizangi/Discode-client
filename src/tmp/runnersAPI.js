import * as Constants from '../constants'




const runnersAPI = () => {

    async function get_compile_status(token){
        console.log("toktok" , token)
        const requestOptions = {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY},
        };
        const response = await fetch(`${process.env.REACT_APP_RAPID_API_URL}/${token}?base64_encoded=true`, requestOptions)
        return await response.json();
        // if (response.ok) {
        //     return await response.json();
        // }
    }

    async function handle_compile(code){
        console.log("codeeee" , code)
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY},
            params: {
                base64_encoded: 'true', 
                fields : "*"
            },
            body: JSON.stringify({
                submissions: [
                  {
                    language_id: Constants.JAVASCRIPT_LANGUAGE_ID,
                    source_code: btoa(code),
                  },
                ],
            }),
        };
        const response = await fetch(process.env.REACT_APP_RAPID_API_URL_BATCH, requestOptions)
        const data = await response.json()
        console.log(data)
        if(response.ok){
            console.log("dataaaa" , await get_compile_status(data[0].token))
        }
    }



    return {
        handle_compile
    };


}


export const {handle_compile} = runnersAPI();

import getUserNameFromToken from "./getUserNameFromToken";

const getCart = async()=>{

    const token = localStorage.getItem('token');

    const username = getUserNameFromToken();

    const API_URL = `http://localhost:8080/cart/${username}`;

    try{
        const response = await fetch(API_URL,{
            method:'GET',
            headers:{
                "Authorization":`Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        if(response.ok){
            const items = await response.json();

            return items;
        }else{
            console.log("Response status "+response.status);
            return null;
        }
    }catch(error){
        console.log("Error occured as "+error);
    }
}

export default getCart;
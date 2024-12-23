import getUserNameFromToken from "./getUserNameFromToken";

const addItemToCart = async(id) =>{
    const username = getUserNameFromToken();

    const formData = new FormData();
    console.log("id is "+id);
    formData.append("id",id);
    formData.append("username", username);
    
    //seding item to backend

    const token = localStorage.getItem('token');

    const API_URL = 'http://localhost:8080/addtocart';

    try{
        const response = await fetch(API_URL,{
            method: 'POST',
            headers:{
                "Authorization": `Bearer ${token}`,
                
            },
            body:formData,
        });

        if(!response.ok){
            console.log("Response status :"+response.status);
        }else{
            console.log("Item added");
        }
    }catch(error){
        console.log(error);
    }
}

export default addItemToCart;
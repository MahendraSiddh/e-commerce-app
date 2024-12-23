import getUserNameFromToken from "./getUserNameFromToken";

const removeItemFromCart = async(id)=>{

    const token = localStorage.getItem('token');

    const username = getUserNameFromToken();

    const formData = new FormData();

    formData.append("id",id);
    formData.append("username",username);

    const API_URL = `http://localhost:8080/cart/${id}`;

    try{
        const response = await fetch(API_URL,{
            method: 'POST',
            headers:{
                "Authorization": `Bearer ${token}`,

            },
            body:formData
        })

        if(!response.ok)
        {
            console.log("Response status is :"+response.status);
        }else{
            console.log("Item is removed");
            window.location.reload();
        }
    }catch(error){
        console.log(error);
    }
}

export default removeItemFromCart;
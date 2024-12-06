function isUserLogedin (){
    const user = localStorage.getItem("user");

    if(user) return true;
    else return false;
}
export default isUserLogedin;

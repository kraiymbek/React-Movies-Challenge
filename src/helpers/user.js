import axios from "axios"



export const createUser = (user) => {
        const url = 'http://127.0.0.1:8000/api/users/register/';
        console.log("createUserInside");
        console.log(user);
        return axios.post(url,user);
}


export const login = (email,password) =>{
    const url =  'http://127.0.0.1:8000/api/users/login/';
    return axios.post(url,{
        email:email,
        password: password
    })
}
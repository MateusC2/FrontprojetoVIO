import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.80:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

const sheets = {
    getUsers:()=>api.get("user"),
    postLogin:(user) => api.post("login/", user),
    deleteUser:(id) => api.delete("user/"+id)
}

export default sheets;  
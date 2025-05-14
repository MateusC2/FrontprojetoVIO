import axios from "axios";

const api = axios.create({
    baseURL:"http://10.89.240.85:5000/api/v1/",
    headers:{
        'accept':'application/json'
    }
});

api.interceptors.request.use(
    (config) =>{
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

const sheets = {
    getUsers:()=>api.get("user/"),
    postLogin:(user) => api.post("login/", user),
    deleteUser:(id) => api.delete("user/"+id),
    deleteEvento:(id) => api.delete("evento/"+id),
    getAllEventos:()=>api.get("evento/"),
    createIngresso:(dados) => api.post("ingresso",dados),
}

export default sheets;  
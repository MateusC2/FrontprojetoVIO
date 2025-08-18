import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
  headers: {
    accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && error.response.data.auth === false) {
        localStorage.setItem("refresh_token", true);
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        window.location.href = "/";
      }
      if (error.response.status === 403 && error.response.data.auth === false) {
        localStorage.setItem("refresh_token", true);
        localStorage.removeItem("token");
        localStorage.removeItem("authenticated");
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

const sheets = {
  getUsers: () => api.get("user/"),
  postLogin: (user) => api.post("login/", user),
  postCadastro: (user) => api.post("user/", user),
  deleteUser: (id) => api.delete("user/" + id),
  deleteEvento: (id) => api.delete("evento/" + id),
  getAllEventos: () => api.get("evento/"),
  createIngresso: (dados) => api.post("ingresso", dados),

  createEvento: (form, imagem) => {
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (imagem) data.append("imagem", imagem);

    return api.post("/evento", data, {
      headers: {
        "Content-Type": "multpart/form-data",
        Accept: "application/json",
      },
    });
  },
};

export default sheets;

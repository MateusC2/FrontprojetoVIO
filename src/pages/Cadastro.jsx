import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios"; // Certifique-se de que 'api.postRegister' está disponível aqui

function Cadastro() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    data_nascimento: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser();
  };

  async function registerUser() {
    try {
      const response = await api.postCadastro(user); 
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "Erro ao cadastrar usuário.");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{
            margin: 1,
            backgroundColor: "brown",
            width: 70,
            height: 70,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Cadastre-se
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            required
            fullWidth
            id="name"
            label="Nome Completo"
            name="name"
            margin="normal"
            value={user.name}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': { color: 'brown' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'brown', borderRadius: 8 },
                '&:hover fieldset': { borderColor: '#795548' },
                '&.Mui-focused fieldset': { borderColor: 'brown' },
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            type="email"
            value={user.email}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': { color: 'brown' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'brown', borderRadius: 8 },
                '&:hover fieldset': { borderColor: '#795548' },
                '&.Mui-focused fieldset': { borderColor: 'brown' },
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="password"
            label="Senha"
            name="password"
            margin="normal"
            type="password"
            value={user.password}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': { color: 'brown' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'brown', borderRadius: 8 },
                '&:hover fieldset': { borderColor: '#795548' },
                '&.Mui-focused fieldset': { borderColor: 'brown' },
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="cpf"
            label="CPF"
            name="cpf"
            margin="normal"
            value={user.cpf}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': { color: 'brown' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'brown', borderRadius: 8 },
                '&:hover fieldset': { borderColor: '#795548' },
                '&.Mui-focused fieldset': { borderColor: 'brown' },
              },
            }}
          />
          <TextField
            required
            fullWidth
            id="data_nascimento"
            label="Data de Nascimento"
            name="data_nascimento"
            margin="normal"
            type="date"
            InputLabelProps={{ shrink: true }} // Para que o label não sobreponha a data
            value={user.data_nascimento}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': { color: 'brown' },
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'brown', borderRadius: 8 },
                '&:hover fieldset': { borderColor: '#795548' },
                '&.Mui-focused fieldset': { borderColor: 'brown' },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "brown",
              borderRadius: 8,
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
              '&:hover': { backgroundColor: '#795548' },
            }}
          >
            Cadastrar
          </Button>
          <Button
            type="button"
            fullWidth
            variant="outlined"
            component={Link}
            to="/"
            sx={{
              backgroundColor: "brown",
              borderRadius: 8,
              color: "white",
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
              '&:hover': { backgroundColor: '#795548' },
            }}
          >
            Voltar para Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;
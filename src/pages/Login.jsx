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
import api from "../axios/axios";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };

  async function login() {
    await api.postLogin(user).then(
      (response) => {
        alert(response.data.message);
        localStorage.setItem("authenticated", true);
        localStorage.setItem("token", response.data.token)
        navigate("users/");
      },
      (error) => {
        console.log(error);
        alert(error.response.data.error);
      }
    );
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
            width: 70, // Reduzindo o tamanho do Avatar
            height: 70,
          }}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Vio
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            margin="normal"
            value={user.email}
            onChange={onChange}
            sx={{
              '& label.Mui-focused': {
                color: 'brown',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'brown',
                  borderRadius: 8,
                },
                '&:hover fieldset': {
                  borderColor: '#795548', // Tom mais escuro no hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'brown',
                },
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
              '& label.Mui-focused': {
                color: 'brown',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'brown',
                  borderRadius: 8,
                },
                '&:hover fieldset': {
                  borderColor: '#795548', // Tom mais escuro no hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'brown',
                },
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
              '&:hover': {
                backgroundColor: '#795548', // Tom mais escuro no hover
              },
            }}
          >
            Entrar
          </Button>
          <Button
            type="button" // Alterado para 'button'
            fullWidth
            variant="outlined"
            component={Link}
            to="/cadastro"
            sx={{
              backgroundColor: "brown",
              borderRadius: 8,
              color:"white",
              boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: '#795548', // Tom mais escuro no hover
              },
            }}
          >
            Cadastro
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
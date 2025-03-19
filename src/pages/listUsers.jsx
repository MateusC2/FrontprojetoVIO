import { useState, useEffect } from "react";
// Imports para criação de tabela
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
// TableHead é onde colocamos os titulos
import TableHead from "@mui/material/TableHead";
// TableBody é onde colocamos o conteúdo
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import api from "../axios/axios";
import { Button } from "@mui/material";
import { Link , useNavigate} from "react-router-dom";

function listUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  function logout(){
    localStorage.removeItem("authenticated");
    navigate("/")
  }

  async function getUsers() {
    // Chamada da Api
    await api.getUsers().then(
      (response) => {
        console.log(response.data.users);
        setUsers(response.data.users);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }

  const listUsers = users.map((user) => {
    return (
      <TableRow key={user.id_usuario}>
        <TableCell align="center">{user.name}</TableCell>
        <TableCell align="center">{user.email}</TableCell>
        <TableCell align="center">{user.cpf}</TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    // if(!localStorage.getItem("authenticated")){
    //   navigate("/")
    // }
    getUsers();
  }, []);

  return (
    <div>
      {users.lenght === 0 ?(<p>Carregando usuarios</p>): (
      <div>
      <h5>Lista de usuários</h5>
      <TableContainer component={Paper} style={{ margin: "2px" }}>
        <Table size="small">
          <TableHead style={{ backgroundColor: "brown", borderStyle: "solid" }}>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">CPF</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{listUsers}</TableBody>
        </Table>
      </TableContainer>
      <Button fullWidth variant="contained" component={Link} to="/" onClick={logout}>
        SAIR
      </Button>
      </div>
      )}
    </div>
  );
}
export default listUsers;

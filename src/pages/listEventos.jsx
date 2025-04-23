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
import { Button, IconButton, Alert, Snackbar } from "@mui/material";
// import { DeleteOutlineIcon } from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDelete from "../components/ConfirmDelete";

function ListEvents() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({
    //Visibilidade (false=oculta; true = visivel)
    open: false,
    //Nivel do alerta (sucess, error , warning, etc)
    severity: "",
    //Mensagem que será exibida
    message: "",
  });
  //Função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity: severity, message: message });
  };
  //Função para fechar o alerta
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };
  const navigate = useNavigate();

  const [userToDelete, setuserToDelete] = useState("");
  const [ModalOpen, setModalOpen] = useState(false);

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  const openDeleteModal = (id, nome) => {
    setuserToDelete({ id: id, nome: nome });
    setModalOpen(true);
  };

  async function getAllEventos() {
    // Chamada da Api
    await api.getAllEventos().then(
      (response) => {
        console.log(response.data.events);
        setEvents(response.data.events);
      },
      (error) => {
        console.log("Erro ", error);
      }
    );
  }
  async function deleteEvento() {
    try {
      const response = await api.deleteEvento(userToDelete.id);
      await getAllEventos();
      //Mensagem informativa de successo
      showAlert("success", response.data.message);
      //Mensagem informativa de successo
    } catch (error) {
      console.log("Erro ao deletar usuario...", error);
      //Mensagem informativa de error
      showAlert("error", error.response.data.message);
    }
  }

  const listEvents = events.map((events) => {
    return (
      <TableRow key={events.id_evento}>
        <TableCell align="center">{events.nome}</TableCell>
        <TableCell align="center">{events.descricao}</TableCell>
        <TableCell align="center">{events.data_hora}</TableCell>
        <TableCell align="center">{events.local}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => openDeleteModal(events.id_evento, events.nome)}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  useEffect(() => {
    // if(!localStorage.getItem("authenticated")){
    //   navigate("/")
    // }
    getAllEventos();
  }, []);

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <ConfirmDelete
          open={ModalOpen}
          userName={userToDelete.nome}
          onConfirm={deleteEvento}
          onClose={() => setModalOpen(false)}
        />
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      {events.length === 0 ? (
        <h1>Carregando Evento</h1>
      ) : (
        <div>
          <br />
          <h1>Lista de Eventos</h1>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "brown", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvents}</TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            style={{ backgroundColor: "brown", borderStyle: "solid" }}
            to="/"
            onClick={logout}
          >
            SAIR
          </Button>
          <p></p>
          <Button
            fullWidth
            variant="contained"
            component={Link}
            style={{ backgroundColor: "brown", borderStyle: "solid" }}
            to="/users"
          >
            Lista Salas Usuarios
          </Button>
        </div>
      )}
    </div>
  );
}
export default ListEvents;

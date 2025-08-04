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
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ModalCriarIngresso from "../components/ModalCriarIngresso";

function listEvents() {
  const [events, setEvents] = useState([]);
  const [alert, setAlert] = useState({
    // visibilidade (false = oculto; true= visivel)
    open: false,

    // Nivel do alerta (sucess, error, warning, etc)
    severity: "",

    // Mensagem que sera exibida
    message: "",
  });

  //função para exibir o alerta
  const showAlert = (severity, message) => {
    setAlert({ open: true, severity, message });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  const navigate = useNavigate();
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

  async function deleteEvento(id) {
    try {
      await api.deleteEvento(id);
      await getAllEventos();
      // mensagem informativa
      showAlert("success", "Evento Excluido com Sucesso!");
    } catch (error) {
      console.log("Erro ao deletar usuário...", error);
      showAlert("error", error.response.data.error);
    }
  }

  const listEvents = events.map((event) => {
    return (
      <TableRow key={event.id_evento}>
        <TableCell align="center">{event.nome}</TableCell>
        <TableCell align="center">{event.descricao}</TableCell>
        <TableCell align="center">{event.data_hora}</TableCell>
        <TableCell align="center">{event.local}</TableCell>

        <TableCell align="center">
          <IconButton onClick={() => deleteEvento(event.id_evento)}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => abrirModalIngresso(event)}>
            <AddIcon color="black" />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  });

  function logout() {
    localStorage.removeItem("authenticated");
    navigate("/");
  }

  function redUsers() {
    navigate("/users");
  }

  useEffect(() => {
    // if (!localStorage.getItem("authenticated")) {
    //   navigate("/");
    // }
    getAllEventos();
  }, []);

  const [eventoSelecionado, setEventoSelecionado] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const abrirModalIngresso = (evento) => {
    setEventoSelecionado(evento);
    setModalOpen(true);
  };

  const fecharModalIngresso = () => {
    setModalOpen(false);
    setEventoSelecionado("");
  };

  return (
    <div>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.severity}
          sx={{
            width: "100%",
          }}
        >
          {alert.message}
        </Alert>
      </Snackbar>

      <ModalCriarIngresso
        open={modalOpen}
        onClose={fecharModalIngresso}
        eventoSelecionado={eventoSelecionado}
      />

      {events.length === 0 ? (
        <h1>Carregando Eventos</h1>
      ) : (
        <div>
          <h5>Lista de Eventos</h5>
          <TableContainer component={Paper} style={{ margin: "2px" }}>
            <Table size="small">
              <TableHead
                style={{ backgroundColor: "red", borderStyle: "solid" }}
              >
                <TableRow>
                  <TableCell align="center">Nome Evento</TableCell>
                  <TableCell align="center">Descrição</TableCell>
                  <TableCell align="center">Data e Hora</TableCell>
                  <TableCell align="center">Local</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                  <TableCell align="center">Criar Ingresso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{listEvents}</TableBody>
            </Table>
          </TableContainer>
          <Button fullWidth variant="contained" to="/" style={{ backgroundColor: "red", borderStyle: "solid" }} onClick={logout}>
            SAIR
          </Button>
          <div>
            <br />
          </div>
          <Button fullWidth variant="contained" to="/events" style={{ backgroundColor: "red", borderStyle: "solid" }} onClick={redUsers}>
            Lista de Usuarios
          </Button>
        </div>
      )}
    </div>
  );
}
export default listEvents;

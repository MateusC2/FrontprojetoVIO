import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
  Typography,
} from "@mui/material";




function ConfirmDelete({open, onClose, onConfirm, userName}) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            Tem certeza que deseja excluir o usuário:
          </Typography>
          <p>{userName}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="error" onClick={onConfirm}>Excluir</Button>
        </DialogActions>
      </Dialog>
    );


}

export default ConfirmDelete;
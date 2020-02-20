
import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function Login({open, closeLogin}) {

  function handleLogin() {
    console.log();
  }

  return (
    <Dialog open={open} onClose={closeLogin} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your username and password to login.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="username"
          label="Username"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeLogin} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLogin} color="primary">
          Login
        </Button>
      </DialogActions>
    </Dialog>
  )
}
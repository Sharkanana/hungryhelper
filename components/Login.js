
import React, {useState, useEffect, useContext} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "./form/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import userContext from "../contexts/user";

export default function Login({open, closeLogin}) {

  const [errorMsg, updateErrorMsg] = useState('');

  const {user, updateUser} = useContext(userContext);

  return (
    <Dialog open={open} onClose={closeLogin} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Login</DialogTitle>

      <Formik
        initialValues={{
          username: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required(),
          password: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {

          axios.post('/api/login', values)
            .then(res => {

              let data = res.data;
              localStorage.setItem('jwtToken', data.token);
              axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');

              user.username = data.user.username;
              user.email = data.user.email;
              user.loggedIn = true;
              updateUser(user);

              closeLogin();
            })
            .catch(error => updateErrorMsg(error.response.data.msg))
            .then(() => setSubmitting(false))
        }}
      >
        {({submitForm, isSubmitting}) => (
          <Form>
            <DialogContent>
              <DialogContentText>
                Please enter your username and password to login.
              </DialogContentText>
              <TextField
                autoFocus
                required
                margin="dense"
                name="username"
                label="Username"
                type="text"
                fullWidth
              />
              <TextField
                required
                margin="dense"
                name="password"
                label="Password"
                type="password"
                fullWidth
              />
              <Typography>
                {errorMsg}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeLogin} color="primary">
                Cancel
              </Button>
              <Button onClick={submitForm} disabled={isSubmitting} color="primary">
                Login
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}
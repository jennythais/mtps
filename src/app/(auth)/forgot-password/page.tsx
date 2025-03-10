"use client";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "@/store";
import { authActions } from "@/store/auth";
import { LoadingButton } from "@mui/lab";
import ErrorMessage from "@/app/components/@shared/text/ErrorMessage";
import Link from "next/link";

interface FormData {
  email: string;
}
const defaultValues: FormData = {
  email: "",
};
const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
      })
    ),
  });
  const onSubmit = (form: FormData) => {
    dispatch(
      authActions.forgotPassword({
        email: form.email,
      })
    );
    setSnackbarMessage(`Email has been sent to ${form.email}`);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  return (
    <div className="container h-screen w-screen flex flex-col items-center justify-center">
      <Link href="/login" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "black" }}
        >
          Back
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col items-center justify-center mb-10">
        <div className="flex flex-col space-y-2 text-center">
          <p className="text-lg text-muted-foreground">
            Enter your email to reset your password
          </p>
        </div>
      </div>
      <div className="mx-auto flex w-full flex-col items-center justify-center mb-10">
        <Card sx={{ width: "400px" }}>
          <CardContent sx={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)" }}>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <FormControl
                fullWidth
                sx={{
                  mb: "30px",
                  mt: "20px",
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      autoFocus
                      label="Email"
                      value={field.value}
                      onChange={field.onChange}
                      error={Boolean(errors.email)}
                      placeholder="Enter your email"
                    />
                  )}
                />
                {errors.email && <ErrorMessage error={errors.email} />}
              </FormControl>
              <LoadingButton
                variant="contained"
                sx={{
                  width: "fit-content",
                  backgroundColor: "black",
                  margin: "0 auto",
                  display: "flex",
                }}
                loading={loading[authActions.login.typePrefix]}
                type="submit"
              >
                Send mail
              </LoadingButton>
            </form>
          </CardContent>
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default ForgotPassword;

"use client";
import { useDispatch, useSelector } from "@/store";
import { authActions } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Icon,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import { userActions } from "@/store/me";
import ErrorMessage from "@/app/components/@shared/text/ErrorMessage";
import IconifyIcon from "@/app/components/@shared/icon/IconifyIcon";

interface FormData {
  email: string;
  password: string;
}
const defaultValues: FormData = {
  email: "",
  password: "",
};
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(
      yup.object().shape({
        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
        password: yup.string().required("Password is required"),
      })
    ),
  });
  const onSubmit = async (form: FormData) => {
    try {
      const res = await dispatch(
        authActions.login({
          email: form.email,
          password: form.password,
        })
      ).unwrap();
      if (res?.data?.data?.role === "student") {
        router.push("/student");
      } else {
        router.push("/faculty");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container h-screen w-screen flex flex-col items-center justify-center">
      <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
        <Button
          variant="contained"
          sx={{ color: "white", backgroundColor: "black" }}
        >
          Back
        </Button>
      </Link>
      <div className="mx-auto flex w-full flex-col items-center justify-center mb-10">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-lg text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
      </div>
      <Card>
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
                    sx={{
                      ".MuiInputLabel-root.Mui-focused": {
                        color: "black",
                      },
                      ".MuiInputLabel-root": {
                        color: "black",
                      },
                      ".MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                )}
              />
              {errors.email && <ErrorMessage error={errors.email} />}
            </FormControl>
            <FormControl
              fullWidth
              sx={{
                mb: "10px",
              }}
            >
              <InputLabel
                htmlFor="password"
                sx={{
                  "&.Mui-focused": {
                    color: "black",
                  },
                }}
              >
                Password
              </InputLabel>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <OutlinedInput
                    autoFocus
                    onBlur={field.onBlur}
                    label="Password"
                    value={field.value}
                    onChange={field.onChange}
                    error={Boolean(errors.password)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    id="password"
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <IconifyIcon
                            icon={
                              showPassword
                                ? "mdi:eye-outline"
                                : "mdi:eye-off-outline"
                            }
                            fontSize={20}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                    sx={{
                      "&.MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "black",
                          borderWidth: "2px",
                        },
                      },
                    }}
                  />
                )}
              />
              {errors.password && <ErrorMessage error={errors.password} />}
            </FormControl>
            <Box
              sx={{
                mb: "40px",
              }}
            >
              <Link
                href="/forgot-password"
                style={{
                  fontSize: "14px",
                  fontFamily: "var(--font-montserrat",
                }}
              >
                Forgot password?
              </Link>
            </Box>

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
              Sign In
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { theme } from "../../styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/validateForm";
import axios from "axios";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export function Signup() {
    const [feedback, setFeedback] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state === null) {
            navigate("/user/role"); // still problem when user hits previous page or next page using browser arrows
            // solve this issue in useeffect of UserRole page
        } else {
            navigate("/signup");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const isValid = validateForm(formData, setFeedback, "signup");

        if (isValid) {
            // frontend validation done, all fields are valid, do further process here

            try {
                const {
                    data: { userId, message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/signup`,
                    {
                        userData: {
                            name: formData.get("name"),
                            email: formData.get("email"),
                            phone: formData.get("phone"),
                            location: formData.get("location"),
                            password: formData.get("password"),
                            role: location.state,
                        },
                    },
                    { withCredentials: true }
                );

                // setFeedback(message);
                if (userId) {
                    navigate("/");
                    // save the user to global state here, useReducer
                }
            } catch (error) {
                // console.log(error);
                setFeedback(error.response.data.message);
            }
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar />

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            onChange={() => setFeedback("")}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={() => setFeedback("")}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            name="phone"
                            autoComplete="phone"
                            onChange={() => setFeedback("")}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            id="location"
                            label="Location"
                            name="location"
                            autoComplete="location"
                            onChange={() => setFeedback("")}
                        />
                        <FormControl
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="password"
                                label="Password"
                                onChange={() => setFeedback("")}
                            />
                        </FormControl>
                        <FormControl
                            fullWidth
                            variant="outlined"
                            required
                            margin="normal"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Confirm Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showConfirmPassword ? "text" : "password"}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={
                                                handleClickShowConfirmPassword
                                            }
                                            edge="end"
                                        >
                                            {showConfirmPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                name="confirmPassword"
                                label="Confirm Password"
                                onChange={() => setFeedback("")}
                            />
                        </FormControl>
                        {/* <FormControlLabel
                            control={
                                <Checkbox value="remember" color="primary" />
                            }
                            label="Remember me"
                        /> */}
                        <Stack spacing={2} alignItems="center">
                            {feedback === "" ? (
                                ""
                            ) : (
                                <Typography
                                    variant="body1"
                                    sx={{ mt: 1, color: "red" }}
                                >
                                    {feedback}
                                </Typography>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                Sign Up
                            </Button>
                            <Button onClick={() => navigate("/login")}>
                                Already have an account? Log in
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

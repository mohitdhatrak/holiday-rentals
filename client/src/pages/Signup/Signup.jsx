import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { theme } from "../../styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { useLocation, useNavigate } from "react-router-dom";
import { validateForm } from "../../utils/validateForm";
import axios from "axios";
import Cookies from "js-cookie";

export function Signup() {
    const [feedback, setFeedback] = useState("");

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
                    data: { userId, message, jwtToken, cookieObject },
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
                Cookies.set("jwtToken", jwtToken, cookieObject);

                // setFeedback(message);
                if (userId && jwtToken) {
                    navigate("/");
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={() => setFeedback("")}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            autoComplete="current-password"
                            onChange={() => setFeedback("")}
                        />
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

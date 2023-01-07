import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export function UserRole() {
    const [role, setRole] = useState(null);

    const handleChange = (event) => {
        setRole(event.target.value);
    };

    const navigate = useNavigate();

    // useEffect(() => {
    // is this the correct way to avoid navigating to a page
    // read about window.history, pushstate, location.replace
    // window.addEventListener("popstate", (e) => {
    //     console.log("hi");
    //     if (e.target.document.URL.includes("/signup")) {
    //         navigate("/user/role");
    //
    //     }
    // });
    // }, []);

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
                        Welcome to holiday rentals!
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 5 }}>
                        <FormControl>
                            <FormLabel
                                id="demo-controlled-radio-buttons-group"
                                sx={{
                                    marginBottom: "15px",
                                    fontSize: "1.2rem",
                                }}
                            >
                                What are you looking for?
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={role}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="book"
                                    control={<Radio />}
                                    label="Booking a rental"
                                />
                                <FormControlLabel
                                    value="host"
                                    control={<Radio />}
                                    label="Hosting a rental"
                                />
                                {/* Can't allow anyone to create an admin account! */}
                                {/* <FormControlLabel
                                    value="admin"
                                    control={<Radio />}
                                    label="Admin account"
                                /> */}
                            </RadioGroup>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            disabled={role === null}
                            onClick={() => navigate("/signup", { state: role })}
                        >
                            Continue
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

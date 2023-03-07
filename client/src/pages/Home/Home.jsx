import { ThemeProvider } from "@mui/system";
import { theme } from "../../styles";
import { Navbar } from "../../components/Navbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Home() {
    const navigate = useNavigate();

    const { userRole } = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <Navbar />

            <Stack spacing={2} alignItems="center">
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ marginTop: "15rem" }}
                >
                    Welcome to holiday rentals!
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="column"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button
                        variant="contained"
                        onClick={() => navigate("/rental-listing")}
                    >
                        Explore
                    </Button>
                    {userRole === "host" || userRole === "admin" ? (
                        <Button
                            variant="contained"
                            onClick={() => navigate("/create-listing")}
                        >
                            Create listing
                        </Button>
                    ) : (
                        ""
                    )}
                </Stack>
                <ToastContainer />
            </Stack>
        </ThemeProvider>
    );
}

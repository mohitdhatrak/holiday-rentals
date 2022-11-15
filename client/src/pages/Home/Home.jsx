import { ThemeProvider } from "@mui/system";
import { theme } from "../../styles";
import { Navbar } from "../../components/Navbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

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
                <Button variant="contained" onClick={() => navigate("/login")}>
                    Explore
                </Button>
            </Stack>
        </ThemeProvider>
    );
}

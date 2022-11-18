import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

export function Navbar({ login }) {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            // cursor: "pointer",
                        }}
                        // onClick={() => navigate("/")}
                    >
                        Holiday Rentals
                    </Typography>

                    {location.pathname === "/login" ||
                    location.pathname === "/signup" ? (
                        <Button color="inherit" onClick={() => navigate("/")}>
                            Back to home
                        </Button>
                    ) : (
                        <Button
                            color="inherit"
                            onClick={() => navigate("/login")}
                        >
                            {login ? "Logout" : "Login"}
                        </Button>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {"Copyright © "}
            <Link
                color="inherit"
                href="https://github.com/mohitdhatrak/holiday-rentals"
            >
                Holiday Rentals
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export function Footer() {
    return (
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
            <Copyright />
        </Box>
    );
}

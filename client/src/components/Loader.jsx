import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export function Loader() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <CircularProgress />
        </Box>
    );
}

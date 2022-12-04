import { ThemeProvider } from "@mui/system";
import { theme } from "../../styles";
import { Navbar } from "../../components/Navbar";

export function Explore() {
    return (
        <ThemeProvider theme={theme}>
            <Navbar />

            <div>Explore places...</div>
            <div>Demo page for now</div>
        </ThemeProvider>
    );
}

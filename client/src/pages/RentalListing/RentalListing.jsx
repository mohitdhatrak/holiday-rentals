import { ThemeProvider } from "@mui/system";
import { theme } from "../../styles";
import { Navbar } from "../../components/Navbar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Footer } from "../../components/Footer";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export function RentalListing() {
    const navigate = useNavigate();

    const { allListings } = useAuth();

    return (
        <ThemeProvider theme={theme}>
            <Navbar />

            <main>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography
                            component="h2"
                            variant="h5"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            Available rental listings...
                        </Typography>
                    </Container>
                </Box>

                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        {allListings.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <Card
                                    sx={{
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        navigate(`/rental-detail/${card._id}`)
                                    }
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            // 16:9
                                            pt: "56.25%",
                                        }}
                                        image={card.image}
                                        alt={card.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="large">Book</Button>
                                        {/* <Button size="small">Edit</Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            <Footer />
        </ThemeProvider>
    );
}

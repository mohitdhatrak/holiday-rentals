import { theme } from "../../styles";
import { Navbar } from "../../components/Navbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { MultipleCheckbox } from "../../components/MultipleCheckbox";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";
import { toast } from "react-toastify";
import { Upload } from "../../components/Upload";

export function CreateListing() {
    const navigate = useNavigate();

    const { setAllListings } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const title = formData.get("title");
        const description = formData.get("description");
        const price = formData.get("price");
        const image = formData.get("image");
        const rules = formData.get("rules");
        const location = formData.get("location");
        const beginDate = formData.get("beginDate");
        const endDate = formData.get("endDate");
        const transport = formData.get("transport");
        const ammenities = formData.get("ammenities");

        console.log(image);

        if (
            title.trim() === "" ||
            description.trim() === "" ||
            price.trim() === "" ||
            image.name.trim() === "" ||
            rules.trim() === "" ||
            location.trim() === "" ||
            beginDate.trim() === "" ||
            endDate.trim() === "" ||
            transport.trim() === "" ||
            ammenities.trim() === ""
        ) {
            toast.error("Please fill all compulsory fields!");
        } else {
            try {
                const {
                    data: { message },
                } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/rental/listing`,
                    formData,
                    { withCredentials: true }
                );

                if (message === "Listing added successfully!") {
                    toast.success(message);
                    // network call to get all listings and add to context
                    try {
                        const response = await axios.get(
                            `${process.env.REACT_APP_API_ENDPOINT}/rental/listing`,
                            { withCredentials: true }
                        );
                        setAllListings(response.data.listings);
                    } catch (error) {
                        // console.log(error);
                    }
                    navigate("/");
                } else {
                    toast.error(message);
                }
            } catch (error) {
                toast.error(error?.response?.data?.message);
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
                        Rental details
                    </Typography>
                    <Box
                        component="form"
                        encType="multipart/form-data"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            minRows={3}
                            id="description"
                            label="Description"
                            name="description"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Price per night"
                            name="price"
                        />
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            Add picture of rental
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            name="image"
                            type="file"
                        />
                        <Upload />
                        <MultipleCheckbox purpose="rules" label="Rules" />
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            Add other rules, separate by comma
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="otherRules"
                            label="Other rules"
                            name="otherRules"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="location"
                            label="Location"
                            name="location"
                        />
                        {/* availability dates */}
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            Available from date
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="date"
                            id="beginDate"
                            name="beginDate"
                        />
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            Available till date
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            type="date"
                            id="endDate"
                            name="endDate"
                        />
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            How can I get there?
                        </FormHelperText>
                        <MultipleCheckbox
                            purpose="transport"
                            label="Transport"
                        />
                        <MultipleCheckbox
                            purpose="ammenities"
                            label="Ammenities"
                        />
                        <FormHelperText
                            id="component-helper-text"
                            sx={{ ml: 1, mb: -1 }}
                        >
                            Add other ammenities, separate by comma
                        </FormHelperText>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="otherAmmenities"
                            label="Other ammenities"
                            name="otherAmmenities"
                        />
                        <Stack spacing={2} alignItems="center" sx={{ mb: 10 }}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3 }}
                            >
                                List rental
                            </Button>
                        </Stack>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

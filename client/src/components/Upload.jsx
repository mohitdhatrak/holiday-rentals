import { Grid, Snackbar, TextField, Alert } from "@mui/material";
import { useState } from "react";
import CustomButton from "../components/CustomButton";
import axios from "axios";

export function Upload() {
    // Hooks
    const [values, setValues] = useState({
        // Single File upload hooks
        singleFile: {},
        selectSingleFile: false,
        singleTitle: "",
        singleArtist: "",
        singleOpen: false,

        // Multiple File upload hooks
        multipleFiles: {},
        selectMultipleFiles: false,
        multipleTitle: "",
        multipleArtist: "",
        multipleOpen: false,
    });

    // handler functions
    const handleChange = (prop) => (event) => {
        if (prop === "singleFile") {
            const singleSong = event.target.files[0];
            if (singleSong) {
                setValues({
                    ...values,
                    singleFile: singleSong,
                    selectSingleFile: true,
                });
            } else {
                setValues({
                    ...values,
                    selectSingleFile: false,
                });
            }
        } else if (prop === "multipleFiles")
            setValues({
                ...values,
                multipleFiles: event.target.files,
                selectMultipleFiles: true,
            });
        else setValues({ ...values, [prop]: event.target.value });
    };

    const handleSingleSubmit = async (event) => {
        event.preventDefault();
        // converting into the form object
        const formData = new FormData();
        formData.append("title", values.singleTitle);
        formData.append("artist", values.singleArtist);
        formData.append("file", values.singleFile);

        // making request to the server
        let reqOptions = {
            url: "/music/singleFile",
            method: "POST",
            data: formData,
        };

        try {
            const response = await axios.request(reqOptions);
            console.log(response.status);
            // Setting the hook back to default values
            setValues({
                ...values,
                singleFile: {},
                selectSingleFile: false,
                singleTitle: "",
                singleArtist: "",
                singleOpen: true,
            });
            console.log("this isin't running");
            event.target.reset();
        } catch (error) {
            console.log(`error from the server ${error}`);
        }
    };

    const handleMultipleSubmit = async (event) => {
        event.preventDefault();
        console.log(values.multipleFiles[0]);
        // converting into the form object
        const formData = new FormData();
        formData.append("title", values.multipleTitle);
        formData.append("artist", values.multipleArtist);
        for (let i = 0; i < values.multipleFiles.length; i++) {
            formData.append("files", values.multipleFiles[i]);
        }

        // making request to the server
        let reqOptions = {
            url: "/music/multipleFiles",
            method: "POST",
            data: formData,
        };

        try {
            const response = await axios.request(reqOptions);
            console.log(response);
            // Setting the hook back to default values
            setValues({
                ...values,
                multipleFiles: {},
                selectMultipleFiles: false,
                multipleTitle: "",
                multipleArtist: "",
                multipleOpen: true,
            });
            event.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setValues({ ...values, singleOpen: false, multipleOpen: false });
    };

    const fileSizeFormatter = (bytes, decimal) => {
        if (bytes === 0) {
            return "0 Bytes";
        }
        const dm = decimal || 2;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
        const index = Math.floor(Math.log(bytes) / Math.log(1000));
        return `${parseFloat((bytes / Math.pow(1000, index)).toFixed(dm))} ${
            sizes[index]
        }`;
    };

    return (
        <div className="dashboard">
            <Grid container spacing={2} className="dashboard-singleFile">
                <Grid item sm={6}>
                    <h1> Single upload</h1>
                    <form onSubmit={handleSingleSubmit}>
                        <TextField
                            // Single song file Input
                            name="file"
                            type="file"
                            required
                            inputProps={{
                                style: { color: "white" },
                                accept: "audio/*",
                            }}
                            onChange={handleChange("singleFile")}
                        />
                        {values.selectSingleFile ? (
                            <div>
                                <p>Filename: {values.singleFile.name}</p>
                                <p>Filetype: {values.singleFile.type}</p>
                                <p>
                                    Size:{" "}
                                    {fileSizeFormatter(values.singleFile.size)}
                                </p>
                                <p>
                                    Last modified:{" "}
                                    {values.singleFile.lastModifiedDate}
                                </p>
                            </div>
                        ) : (
                            <p>Select a file to show details</p>
                        )}

                        <TextField
                            // Single song Title
                            label="Song title"
                            name="title"
                            value={values.singleTitle}
                            inputProps={{
                                style: { color: "white" },
                            }}
                            required
                            autoComplete="off"
                            onChange={handleChange("singleTitle")}
                        />

                        <br />
                        <br />

                        <TextField
                            // Single song Artist name
                            label="Artist"
                            name="artist"
                            value={values.singleArtist}
                            inputProps={{
                                style: { color: "white" },
                            }}
                            required
                            onChange={handleChange("singleArtist")}
                        />

                        <br />
                        <br />
                        <CustomButton
                            // Single song upload button
                            name="Upload"
                            col="black"
                            buttonColor="green-button"
                        />
                    </form>
                </Grid>

                <Grid item sm={6}>
                    <h1> Album upload</h1>
                    <form onSubmit={handleMultipleSubmit}>
                        <TextField
                            // Multiple song files Input
                            name="files"
                            type="file"
                            required
                            inputProps={{
                                style: { color: "white" },
                                accept: "image/*",
                                multiple: true,
                            }}
                            onChange={handleChange("multipleFiles")}
                        />
                        {values.selectMultipleFiles ? (
                            Object.keys(values.multipleFiles).map(
                                (keyName, keyIndex) => (
                                    <div key={keyIndex}>
                                        <p>Song no. {keyIndex + 1} </p>
                                        <p>
                                            Filename:{" "}
                                            {values.multipleFiles[keyName].name}
                                        </p>
                                        <p>
                                            Filetype:{" "}
                                            {values.multipleFiles[keyName].type}
                                        </p>
                                        <p>
                                            Size:{" "}
                                            {fileSizeFormatter(
                                                values.multipleFiles[keyName]
                                                    .size
                                            )}
                                        </p>
                                        <p>
                                            Last modified:{" "}
                                            {
                                                values.multipleFiles[keyName]
                                                    .lastModifiedDate
                                            }
                                        </p>
                                        <br />
                                    </div>
                                )
                            )
                        ) : (
                            <p>Select a file to show details</p>
                        )}

                        <TextField
                            // Multiple song Album title
                            label="Album title"
                            name="title"
                            value={values.multipleTitle}
                            inputProps={{
                                style: { color: "white" },
                            }}
                            required
                            autoComplete="off"
                            onChange={handleChange("multipleTitle")}
                        />

                        <br />
                        <br />

                        <TextField
                            // Multiple songs Artist name
                            label="Artist"
                            name="artist"
                            value={values.multipleArtist}
                            inputProps={
                                {
                                    // style: { color: 'white' },
                                }
                            }
                            required
                            onChange={handleChange("multipleArtist")}
                        />

                        <br />
                        <br />
                        <CustomButton
                            // Multiple songs upload button
                            name="Upload"
                            col="black"
                            buttonColor="green-button"
                        />
                    </form>
                </Grid>

                <Snackbar
                    open={values.singleOpen || values.multipleOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%", color: "black" }}
                        variant="filled"
                    >
                        Song Uploaded successfully!
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={values.multipleOpen}
                    autoHideDuration={4000}
                    onClose={handleClose}
                >
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        sx={{ width: "100%", color: "black" }}
                        variant="filled"
                    >
                        Album Uploaded successfully!
                    </Alert>
                </Snackbar>
            </Grid>
        </div>
    );
}

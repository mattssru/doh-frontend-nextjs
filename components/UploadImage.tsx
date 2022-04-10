import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  InputLabel,
  Button,
  FormHelperText,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "20px",
  },
  input: {
    display: "none",
  },
  label: {
    fontSize: 20,
    lineHeight: "24px",
    color: "#000",
    fontFamily: "DBHeavent_Cond",
    marginBottom: 5,
  },
  btnUpload: {
    marginBottom: "0px !important",
    height: 50,
    width: "100%",
    background: "linear-gradient(to bottom, #68D5E5, #674EEF)",
    borderRadius: 5,
    color: "#fff",
    fontSize: 22,
    fontFamily: "DBHeavent_BoldCond",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
  },
  boxDropzone: {
    height: 180,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px dashed #DBDBDB",
    borderRadius: "12px",
    marginTop: 20,
    backgroundColor: "#efefef",
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "contain",
      borderRadius: "12px",
    },
  },
}));

const getBase64 = (image: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(image);
};

const UploadImage = (props: any) => {
  const {
    name,
    label,
    text,
    icon,
    handleImageChange,
    value = null,
    error = null,
  } = props;
  const classes = useStyles();
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (value != null) {
      setImageUrl(value);
    }
  }, [value]);

  const handleChange = async (e: any) => {
    const selectedFile = e.target.files[0] 
    await getBase64(selectedFile, (imageUrl: any) => {
      setImageUrl(imageUrl)
      const keyName = name != undefined ? name : "thumbnail";
      handleImageChange({[keyName]: selectedFile})
    })
  };

  return (
    <Box className={classes.root}>
      <InputLabel htmlFor="upload-image" className={classes.label}>
        {label}
      </InputLabel>
      <Box>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor="contained-button-file">
          <Button
            className={classes.btnUpload}
            variant="contained"
            component="span"
            startIcon={icon}
          >
            {text}
          </Button>
        </label>
      </Box>
      {imageUrl !== "" ? (
        <Box className={classes.boxDropzone}>
          <img src={imageUrl} alt="" />
        </Box>
      ) : (
        <></>
      )}
      {error && (
        <FormHelperText style={{ color: "#f44336" }}>{error}</FormHelperText>
      )}
    </Box>
  );
};

export default UploadImage;

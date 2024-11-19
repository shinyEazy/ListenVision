import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Footer = () => {
  return (
    <Box
      bgcolor="#f8d7da"
      padding="30px 40px"
      textAlign="center"
      marginTop="40px"
      display="flex"
      justifyContent="space-between"
    >
      <Box alignItems="start" textAlign="start">
        <Typography fontWeight="600">Về ListenVision</Typography>
        <Typography>
          ListenVision là điểm đến cho những tin tức âm thanh và sách nói cuốn
          hút, đem những câu chuyện trở nên sống động.
        </Typography>
      </Box>
      <Box alignItems="start" textAlign="start">
        <Typography fontWeight="600">Liên Hệ</Typography>
        <Typography>Email: support@listenvision.com</Typography>
      </Box>
      <Box alignItems="start" textAlign="start">
        <Typography fontWeight="600">Theo Dõi Chúng Tôi</Typography>
        <Box display="flex" gap="10px">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(252,6,106)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "1.5rem",
              textTransform: "none",
              minWidth: "48px",
              width: "32px",
            }}
          >
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/facebook.png"
              alt="Podcast thumbnail"
            ></img>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(252,6,106)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "1.5rem",
              textTransform: "none",
              minWidth: "48px",
              width: "32px",
            }}
          >
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/twitter.png"
              alt="Podcast thumbnail"
            ></img>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(252,6,106)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              fontSize: "1.5rem",
              textTransform: "none",
              minWidth: "48px",
              width: "32px",
            }}
          >
            <img
              src="https://uiparadox.co.uk/public/templates/flynow/v2/assets/media/icons/instagram.png"
              alt="Podcast thumbnail"
            ></img>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

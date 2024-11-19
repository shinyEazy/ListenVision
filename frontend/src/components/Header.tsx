import { Box, Typography, TextField, InputAdornment } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        width: "100%",
        borderBottom: "2px solid #e0e0e0",
        bgcolor: "#fff",
        zIndex: 10,
        paddingY: "10px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      {/* Header Content */}
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        maxWidth="1200px"
        padding="0 20px"
      >
        <Typography
          fontSize="1.6rem"
          fontWeight="600"
          display="flex"
          alignItems="center"
          color="rgb(252,6,106)"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          ListenVision
        </Typography>
        <Box>
          <TextField
            placeholder="Search for audio news and articles"
            variant="outlined"
            style={{
              borderRadius: "100px",
              width: "450px",
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{ cursor: "pointer", color: "#888" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          />
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="30px"
          color="rgb(252,6,106)"
        >
          <Typography
            fontSize="1.2rem"
            onClick={() => navigate("/landing")}
            sx={{ cursor: "pointer" }}
          >
            Trang Chủ
          </Typography>
          <Typography
            fontSize="1.2rem"
            onClick={() => navigate("/news")}
            sx={{ cursor: "pointer" }}
          >
            Tin tức
          </Typography>
          <Typography
            fontSize="1.2rem"
            onClick={() => navigate("/books")}
            sx={{ cursor: "pointer" }}
          >
            Sách
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;

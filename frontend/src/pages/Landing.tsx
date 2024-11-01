import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Landing = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Box
          position="relative"
          width="100vw"
          borderBottom="2px solid #e0e0e0"
          paddingY="10px"
          bgcolor="#fff"
          display="flex"
          justifyContent="center"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            margin="0 40px"
          >
            <Typography
              fontSize="1.6rem"
              fontWeight="600"
              display="flex"
              alignItems="center"
            >
              ListenVision
            </Typography>
            <Box>
              <TextField
                placeholder="Search for audio news and articles"
                variant="outlined"
                style={{
                  borderRadius: "100px",
                  width: "400px",
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FontAwesomeIcon
                        icon={faMagnifyingGlass}
                        style={{ cursor: "pointer" }}
                      />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "100px",
                  },
                }}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="20px"
              color="rgb(252,6,106)"
            >
              <Typography fontSize="1.2rem">Trang Chủ</Typography>
              <Typography fontSize="1.2rem">Tin tức</Typography>
              <Typography fontSize="1.2rem">Sách</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        margin="20px 250px"
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Listen to the latest updates
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Discover global news
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Latest economy updates
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Explore sports news
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Discover cultural insights
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            borderRadius: "1000px",
            fontSize: "1.4rem",
            textTransform: "none",
          }}
        >
          Explore wellness tips
        </Button>
      </Box>
    </Box>
  );
};

export default Landing;

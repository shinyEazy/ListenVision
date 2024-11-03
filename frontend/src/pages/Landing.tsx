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
        bgcolor: "#f9f9f9",
      }}
    >
      {/* Header */}
      <Box>
        <Box
          position="relative"
          width="100%"
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
            maxWidth="1200px"
            padding="0 20px"
          >
            <Typography
              fontSize="1.6rem"
              fontWeight="600"
              display="flex"
              alignItems="center"
              color="rgb(252,6,106)"
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
              <Typography fontSize="1.2rem">Trang Chủ</Typography>
              <Typography fontSize="1.2rem">Tin tức</Typography>
              <Typography fontSize="1.2rem">Sách</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Button Grid */}
      <Box
        padding="20px 0"
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
        gap="20px"
        justifyContent="center"
        alignItems="center"
        margin="20px 20px"
        sx={{
          maxWidth: "1200px",
          margin: "20px auto",
        }}
      >
        {[
          "Listen to the latest updates",
          "Discover global news",
          "Latest economy updates",
          "Explore sports news",
          "Discover cultural insights",
          "Explore wellness tips",
        ].map((text, index) => (
          <Button
            key={index}
            variant="contained"
            sx={{
              backgroundColor: "rgb(252,6,106)",
              color: "#fff",
              borderRadius: "30px",
              fontSize: "1.2rem",
              paddingY: "12px",
              textTransform: "none",
            }}
          >
            {text}
          </Button>
        ))}
      </Box>

      {/* Content Boxes */}
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="20px"
        padding="20px"
        sx={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <Box
          flex="1"
          sx={{
            borderRight: { md: "1px solid lightgray" },
            paddingRight: { md: "20px" },
            paddingBottom: "20px",
          }}
        >
          <Typography fontWeight="500" fontSize="1.2rem">
            Listen to podcast episodes
          </Typography>
          <Typography fontWeight="800" fontSize="1.5rem" marginTop="10px">
            Listen to daily minutes: Lost cat found the way back to her home
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "rgb(252,6,106)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "20px",
              fontSize: "1rem",
              textTransform: "none",
              marginTop: "10px",
            }}
          >
            Listen
          </Button>
          <Box marginTop="20px">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "200px",
                borderRadius: "10px",
              }}
            />
            <Typography fontWeight="500" fontSize="1.2rem">
              Current events
            </Typography>
            <Typography fontWeight="800" fontSize="1.4rem">
              Lost cat found the way back to her home
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="500" fontSize="1rem">
                Character's name
              </Typography>
              <Typography fontWeight="500" fontSize="1rem">
                Date of news
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          flex="1"
          sx={{
            borderRight: { md: "1px solid lightgray" },
            paddingRight: { md: "20px" },
            paddingBottom: "20px",
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
            style={{
              width: "100%",
              objectFit: "cover",
              height: "300px",
              borderRadius: "10px",
            }}
          />
          <Typography fontWeight="500" fontSize="1.2rem" marginTop="10px">
            Cultural insights
          </Typography>
          <Typography fontWeight="800" fontSize="1.4rem">
            Explore best summer reads for your vacation
          </Typography>
          <Typography fontSize="1rem" color="gray">
            Summer is the perfect time to indulge in some leisurely reading,
            whether it's lying on the beach or lounging in the park.
          </Typography>
        </Box>

        <Box flex="1">
          <Box marginBottom="20px">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
              style={{
                width: "100%",
                objectFit: "cover",
                height: "300px",
                borderRadius: "10px",
              }}
            />
            <Typography fontWeight="500" fontSize="1.2rem">
              Sports news
            </Typography>
            <Typography fontWeight="800" fontSize="1.4rem">
              Listen to Footballer leads Argentina to victory
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography fontWeight="500" fontSize="1rem">
                Character's name
              </Typography>
              <Typography fontWeight="500" fontSize="1rem">
                Date of news
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;

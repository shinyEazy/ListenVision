import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      <Header />
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
          margin: "8px auto",
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
              paddingY: "4px",
              textTransform: "none",
            }}
          >
            {text}
          </Button>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection={{ xs: "column", md: "row" }}
        gap="20px"
        padding="20px 40px"
        sx={{ margin: "0 auto" }}
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
              alt="Podcast thumbnail"
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
            alt="Podcast thumbnail"
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
              alt="Podcast thumbnail"
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
      <Box margin="20px 40px" display="flex" flexDirection="column" gap="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold" color="rgb(252,6,106)">
            Tin tức nổi bật
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            onClick={() => navigate("/news")}
            sx={{ cursor: "pointer" }}
          >
            Thêm
          </Typography>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="20px"
        >
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              sx={{ padding: "16px", borderRadius: "12px", boxShadow: 2 }}
            >
              <CardMedia
                component="img"
                height="180"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
                alt="News thumbnail"
                sx={{ borderRadius: "8px", mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Ukraine rút quân vội vàng, Nga giành khu vực dài 20km trong 24
                giờ
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(252,6,106)",
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  paddingY: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(220,5,90)",
                  },
                }}
              >
                Nghe
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
      <Box margin="20px 40px" display="flex" flexDirection="column" gap="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold" color="rgb(252,6,106)">
            Sách nổi bật
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ cursor: "pointer" }}
          >
            Thêm
          </Typography>
        </Box>

        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="20px"
        >
          {[...Array(4)].map((_, index) => (
            <Card
              key={index}
              sx={{ padding: "16px", borderRadius: "12px", boxShadow: 2 }}
            >
              <CardMedia
                component="img"
                height="180"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
                alt="News thumbnail"
                sx={{ borderRadius: "8px", mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Ukraine rút quân vội vàng, Nga giành khu vực dài 20km trong 24
                giờ
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla
                bla bla
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "rgb(252,6,106)",
                  color: "#fff",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  paddingY: "8px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "rgb(220,5,90)",
                  },
                }}
              >
                Nghe
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Landing;

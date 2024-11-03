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
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          maxWidth="1200px"
          padding="0 20px"
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
              <Typography fontSize="1.2rem">Sách</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
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
      </Box>{" "}
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
    </Box>
  );
};

export default Landing;

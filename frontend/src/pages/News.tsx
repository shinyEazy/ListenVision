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
import Header from "../components/Header";
import Footer from "../components/Footer";

const News = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/data/news.json");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const renderNewsByCategory = (category) => {
    const filteredNews = newsData.filter((news) => news.category === category);
    return (
      <Box margin="20px 40px" display="flex" flexDirection="column" gap="20px">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold" color="rgb(252,6,106)">
            {category}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/news")}
          >
            Thêm
          </Typography>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="20px"
        >
          {filteredNews.map((news, index) => (
            <Card
              key={index}
              sx={{
                padding: "16px",
                borderRadius: "12px",
                boxShadow: 2,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={news.image}
                alt={news.title}
                sx={{ borderRadius: "8px", mb: 2 }}
              />
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {news.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2} noWrap>
                {news.content}
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
    );
  };

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
      {/* Render News Sections */}
      {["Thời sự", "Thế giới", "Kinh tế", "Thể thao"].map((category) =>
        renderNewsByCategory(category)
      )}
      {/* Footer */}
      <Box
        bgcolor="#f8d7da"
        padding="30px 40px"
        textAlign="center"
        marginTop="40px"
      >
        <Typography fontWeight="600">Về ListenVision</Typography>
        <Typography>
          ListenVision là điểm đến cho những tin tức âm thanh và sách nói cuốn
          hút, đem những câu chuyện trở nên sống động.
        </Typography>
      </Box>
    </Box>
  );
};

export default News;

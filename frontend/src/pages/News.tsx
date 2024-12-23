import { Box, Button, Typography, Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NewsVC from "components/voicecontrol/newsVC";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  content: string;
  image: string;
}

const News = () => {
  const formatCategory = (category: string) => {
    return category
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  };

  const navigate = useNavigate();
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [news_ID, setNewsID] = useState<number[]>([])

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("/data/news.json");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data = await response.json();
        //
        const categories = ['Thời sự', 'Thế giới', 'Kinh tế'];
        const all_news_id : number[] = []; 
        categories.forEach((category) => {
          const filteredNews = data
            .filter((news: NewsItem) => news.category === category)
            .sort((a: NewsItem, b: NewsItem) => b.id - a.id)
            .slice(0, 4);
          filteredNews.forEach((filtered_new: NewsItem) => {
            all_news_id.push(filtered_new.id);
          })
        });
        setNewsID(all_news_id)
        //
        setNewsData(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const renderNewsByCategory = (category: string) => {
    const filteredNews = newsData
      .filter((news) => news.category === category)
      .sort((a, b) => b.id - a.id)
      .slice(0, 4);

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
            onClick={() => navigate(`/news/${formatCategory(category)}/1`)}
          >
            Thêm
          </Typography>
        </Box>
        <Box
          display="flex"
          gridTemplateColumns={`repeat(auto-fit, minmax(300px, 1fr))`}
          gap="20px"
          justifyContent={filteredNews.length < 4 ? "center" : "space-between"}
        >
          {filteredNews.map((news) => (
            <Card
              onClick={() => navigate(`/new/${news.id}`)}
              key={news.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "16px",
                borderRadius: "12px",
                boxShadow: 2,
                maxWidth: "300px",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 4,
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={news.image}
                alt={news.title}
                sx={{
                  borderRadius: "8px",
                  mb: 2,
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="h6"
                fontWeight="bold"
                mb={1}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {news.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {news.content}
              </Typography>
              <Box mt="auto" display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(45deg, rgb(252,6,106), rgb(220,5,90))",
                    color: "#fff",
                    borderRadius: "30px",
                    fontSize: "1rem",
                    padding: "4px 20px",
                    textTransform: "none",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, rgb(220,5,90), rgb(200,5,80))",
                    },
                  }}
                >
                  Nghe
                </Button>
              </Box>
              <div>ID: {news.id}</div>
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
      {["Thời sự", "Thế giới", "Kinh tế"].map((category) => (
        <Box key={category}>{renderNewsByCategory(category)}</Box>
      ))}
      <NewsVC news_ID={news_ID}/>
      <Footer />
    </Box>
  );
};

export default News;
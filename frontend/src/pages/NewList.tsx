import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  image: string;
  time: string;
  content: string;
}

const NewList = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Items per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/news.json");
        const data: NewsItem[] = await response.json();

        // Filter based on formatted categoryName
        const formattedCategoryName = categoryName
          ?.replace(/-/g, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        const filteredNews = data.filter(
          (item) =>
            item.category
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") === formattedCategoryName
        );
        setNewsList(filteredNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName]);

  // Handle pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = newsList.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Category Header */}
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{
            textAlign: "left",
            color: "#444",
          }}
        >
          Trang chủ / {categoryName?.replace(/-/g, " ")}
        </Typography>

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* News Cards */}
            <Stack spacing={4}>
              {currentNews.map((newsItem) => (
                <Card
                  key={newsItem.id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    borderRadius: "12px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => navigate(`/news/${newsItem.id}`)} // Navigate to individual news detail page
                >
                  <CardActionArea
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    {/* Image */}
                    <CardMedia
                      component="img"
                      sx={{ width: 100, borderRadius: "12px 0 0 12px" }}
                      image={newsItem.image}
                      alt={newsItem.title}
                    />
                    {/* Content */}
                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {newsItem.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" mb={1}>
                        {newsItem.time}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                        }}
                      >
                        {newsItem.content}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Stack>

            {/* Pagination */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              mt={4}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>
              <Typography>
                Page {currentPage} of{" "}
                {Math.ceil(newsList.length / itemsPerPage)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                disabled={
                  currentPage === Math.ceil(newsList.length / itemsPerPage)
                }
                onClick={handleNextPage}
              >
                Next
              </Button>
            </Stack>
          </>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default NewList;

import { Box, Typography, Card, CardMedia, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
}

const Books = () => {
  const navigate = useNavigate();

  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/data/books.json");
        if (!response.ok) throw new Error("Failed to load books data");
        const data: Book[] = await response.json();
        setBooksData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const genres = [
    "Tự Truyện",
    "Tài Chính",
    "Tư Duy",
    "Kỹ Năng Sống",
    "Công Nghệ",
    "Khởi Nghiệp",
  ];

  return (
    <Box>
      <Header />
      {/* Genre Bar */}
      <Box
        sx={{
          display: "flex",
          padding: "10px 20px",
          bgcolor: "#f4f4f4",
          justifyContent: "center",
          gap: "8px",
          backgroundColor: "#f8d7da",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {genres.map((genre, index) => (
          <Button
            key={index}
            onClick={() =>
              navigate(
                `/books/${genre
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .replace(/\s+/g, "-")}/1`
              )
            }
            sx={{
              fontSize: "1.1rem",
              flex: "none",
              padding: "4px 20px",
              borderRadius: "20px",
              bgcolor: "white",
              color: "#252525",
              boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
              marginRight: "10px",
              textTransform: "none",
              "&:hover": {
                bgcolor: "rgb(252,6,106)",
                color: "white",
              },
            }}
          >
            {genre}
          </Button>
        ))}
      </Box>
      {/* Book Section */}
      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Typography
          variant="h5"
          component="h1"
          fontWeight="bold"
          color="rgb(252,6,106)"
          sx={{ marginBottom: "20px" }}
        >
          Sách nói nổi bật
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <Grid container spacing={3}>
            {booksData
              .sort((a, b) => b.id - a.id)
              .map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={book.id}>
                  <Card
                    onClick={() => navigate(`/book/${book.id}`)}
                    sx={{
                      minHeight: "93%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "16px",
                      borderRadius: "12px",
                      boxShadow: 2,
                      cursor: "pointer",
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
                      image={book.image}
                      alt={book.title}
                      sx={{
                        borderRadius: "8px",
                        mb: 2,
                        height: "280px",
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
                      {book.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      mb={2}
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                      }}
                    >
                      {book.author}
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
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default Books;

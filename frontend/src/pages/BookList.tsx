import {
  Box,
  Typography,
  Card,
  CardMedia,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BookCategoryVC from "components/voicecontrol/bookCategoryVC";

interface BooksItem {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  category: string;
}

const BookList = () => {
  const [bookCategoryIds, setBookCategoryIds] = useState<number[]>([]);
  const { categoryName } = useParams<{
    categoryName: string;
  }>();
  const [booksList, setBooksList] = useState<BooksItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const actualCategoryName =
    booksList.length > 0 ? booksList[0].category : categoryName;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/books.json");
        const data: BooksItem[] = await response.json();

        const formattedCategoryName = categoryName
          ?.replace(/-/g, " ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();

        const filteredBooks = data.filter(
          (item) =>
            item.category
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "") === formattedCategoryName
        );
        const tmp_arr = [];
        for(let i = 0; i<filteredBooks.length; i++) {
          tmp_arr.push(filteredBooks[i].id);
        }
        setBookCategoryIds(tmp_arr);
        setBooksList(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);


  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {/* Category Header */}
        <Typography
          variant="h6"
          fontWeight="bold"
          mb={3}
          sx={{
            textAlign: "left",
            color: "#444",
          }}
        >
          <Typography
            variant="h6"
            fontWeight="bold"
            component="span"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/books")}
          >
            Sách nói
          </Typography>
          {" / "}
          <Typography
            onClick={() => {
              navigate(`/books/${categoryName}/1`);
              window.scrollTo(0, 0);
            }}
            variant="h6"
            fontWeight="bold"
            component="span"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            {actualCategoryName}
          </Typography>
        </Typography>

        <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
          {/* Loading Spinner */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Books Grid */}
              <Grid container spacing={3}>
                {booksList
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
                          transition:
                            "transform 0.3s ease, box-shadow 0.3s ease",
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
                        <div>
                            ID: {book.id}
                        </div>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </>
          )}
        </Box>
        <BookCategoryVC book_by_category_ids={bookCategoryIds}/>
      </Box>
      <Footer />
    </Box>
  );
};

export default BookList;

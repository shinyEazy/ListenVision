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
  Grid,
  Divider,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface BooksItem {
  id: number;
  category: string;
  title: string;
  image: string;
  time: string;
  content: string;
}

const BookList = () => {
  const { categoryName, page } = useParams<{
    categoryName: string;
    page: string;
  }>();
  const [booksList, setBooksList] = useState<BooksItem[]>([]);
  const [newestBooks, setNewestBooks] = useState<BooksItem[]>([]); // For sidebar
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const currentPage = parseInt(page || "1", 10);

  const actualCategoryName =
    booksList.length > 0 ? booksList[0].category : categoryName;

  const truncateText = (text: string | undefined, wordLimit: number) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

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

        const sortedBooks = [...data].sort((a, b) => b.id - a.id);
        setNewestBooks(sortedBooks.slice(0, 4));

        setBooksList(filteredBooks);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryName]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBooks = booksList.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    navigate(`/books/${categoryName}/${currentPage + 1}`);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    navigate(`/books/${categoryName}/${currentPage - 1}`);
    window.scrollTo(0, 0);
  };

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

        <Grid container spacing={3}>
          {/* Main Content */}
          <Grid item xs={12} md={8}>
            <Box>
              {/* Loading Spinner */}
              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {/* Books Cards */}
                  <Stack
                    spacing={4}
                    sx={{ width: "100%", borderRadius: "0px", border: "none" }}
                  >
                    {currentBooks.map((booksItem) => (
                      <Card
                        key={booksItem.id}
                        sx={{
                          maxWidth: "100%",
                          borderRadius: "0",
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "flex-start",
                          border: "none",
                          boxShadow: "none",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.03)",
                            cursor: "pointer",
                          },
                        }}
                        onClick={() => navigate(`/book/${booksItem.id}`)}
                      >
                        <CardActionArea
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            maxWidth: "100%",
                            width: "100%",
                          }}
                        >
                          {/* Image */}
                          <CardMedia
                            component="img"
                            sx={{
                              width: "250px",
                              maxWidth: "250px",
                              objectFit: "cover",
                            }}
                            image={booksItem.image}
                            alt={booksItem.title}
                          />
                          {/* Content */}
                          <CardContent
                            sx={{
                              flex: 1,
                              padding: "0 16px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "flex-start",
                              width: "500px",
                            }}
                          >
                            <Box sx={{ width: "100%" }}>
                              <Typography
                                variant="h5"
                                fontWeight="bold"
                                mb={1}
                                sx={{
                                  wordWrap: "break-word",
                                  hyphens: "auto",
                                }}
                              >
                                {booksItem.title}
                              </Typography>

                              <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                  overflow: "hidden",
                                  wordWrap: "break-word",
                                }}
                              >
                                {truncateText(booksItem.content, 30)}
                              </Typography>
                            </Box>
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
                    {/* Render the Previous button only if it's not disabled */}
                    {currentPage > 1 && (
                      <Button
                        variant="outlined"
                        onClick={handlePreviousPage}
                        sx={{
                          color: "rgb(252,6,106)",
                          border: "2px solid rgb(252,6,106)",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "rgb(252,6,106)",
                            color: "white",
                            border: "2px solid rgb(252,6,106)",
                          },
                        }}
                      >
                        <ArrowBackIosNewIcon />
                      </Button>
                    )}
                    {currentPage === 1 && (
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          border: "none",
                          backgroundColor: "white",
                          cursor: "default",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "white",
                            border: "white",
                          },
                        }}
                      >
                        <ArrowBackIosNewIcon />
                      </Button>
                    )}
                    <Typography>
                      Page {currentPage} of{" "}
                      {Math.ceil(booksList.length / itemsPerPage)}
                    </Typography>
                    {/* Render the Next button only if it's not disabled */}
                    {currentPage <
                      Math.ceil(booksList.length / itemsPerPage) && (
                      <Button
                        variant="outlined"
                        onClick={handleNextPage}
                        sx={{
                          color: "rgb(252,6,106)",
                          border: "2px solid rgb(252,6,106)",
                          backgroundColor: "white",
                          "&:hover": {
                            backgroundColor: "rgb(252,6,106)",
                            color: "white",
                            border: "2px solid rgb(252,6,106)",
                          },
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    )}{" "}
                    {currentPage ===
                      Math.ceil(booksList.length / itemsPerPage) && (
                      <Button
                        variant="outlined"
                        sx={{
                          color: "white",
                          border: "none",
                          backgroundColor: "white",
                          cursor: "default",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "white",
                            border: "white",
                          },
                        }}
                      >
                        <ArrowForwardIosIcon />
                      </Button>
                    )}
                  </Stack>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default BookList;

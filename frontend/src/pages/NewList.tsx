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
import NewCategoryVC from "components/voicecontrol/newCategoryVC";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  image: string;
  time: string;
  content: string;
}

const NewList = () => {
  const { categoryName, page } = useParams<{
    categoryName: string;
    page: string;
  }>();
  const [newListID, setNewListID] = useState<number[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newestNews, setNewestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const currentPage = parseInt(page || "1", 10);

  const actualCategoryName =
    newsList.length > 0 ? newsList[0].category : categoryName;

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch("/data/news.json");
        const data: NewsItem[] = await response.json();

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

        const sortedNews = filteredNews.sort((a, b) => b.id - a.id);
        setNewestNews(sortedNews.slice(0, 4));
        setNewsList(filteredNews);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const tmp_arr = filteredNews.slice(startIndex, startIndex + itemsPerPage);
        let tmp_arr_2 = [];
        for(let i = 0 ; i< tmp_arr.length; i++) {
          tmp_arr_2.push(tmp_arr[i].id);
        }
        setNewListID(tmp_arr_2);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [categoryName, page]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentNews = newsList.slice(startIndex, startIndex + itemsPerPage);

  const handleNextPage = () => {
    navigate(`/news/${categoryName}/${currentPage + 1}`);
    window.scrollTo(0, 0);
  };

  const handlePreviousPage = () => {
    navigate(`/news/${categoryName}/${currentPage - 1}`);
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
            onClick={() => navigate("/news")}
          >
            Tin tức
          </Typography>
          {" / "}
          <Typography
            onClick={() => {
              navigate(`/news/${categoryName}/1`);
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
                  {/* News Cards */}
                  <Stack
                    spacing={4}
                    sx={{ width: "100%", borderRadius: "0px", border: "none" }}
                  >
                    {currentNews.map((newsItem) => (
                      <Card
                        key={newsItem.id}
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
                        onClick={() => navigate(`/new/${newsItem.id}`)}
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
                            image={newsItem.image}
                            alt={newsItem.title}
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
                                {newsItem.title}
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
                                {truncateText(newsItem.content, 30)}
                              </Typography>
                              <div style={{marginTop: "10px", fontWeight: "bold"}}>ID: {newsItem.id}</div>
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
                      {Math.ceil(newsList.length / itemsPerPage)}
                    </Typography>
                    {/* Render the Next button only if it's not disabled */}
                    {currentPage <
                      Math.ceil(newsList.length / itemsPerPage) && (
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
                      Math.ceil(newsList.length / itemsPerPage) && (
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

          {/* Sidebar */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              fontWeight="bold"
              mt={10}
              mb={3}
              ml="16px"
              sx={{ textAlign: "left", color: "#444" }}
            >
              TIÊU ĐIỂM
            </Typography>
            <Stack spacing={3}>
              {newestNews.map((newsItem, index) => (
                <div key={newsItem.id}>
                  <Card
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "flex-start",
                      border: "none",
                      boxShadow: "none",
                      cursor: "pointer",
                      transition: "transform 0.3s",
                      borderRadius: "0",
                      "&:hover": {
                        transform: "scale(1.02)",
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                    onClick={() => navigate(`/new/${newsItem.id}`)}
                  >
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
                      <Typography
                        padding="0"
                        fontWeight="bold"
                        mb={1}
                        sx={{
                          wordWrap: "break-word",
                          hyphens: "auto",
                        }}
                      >
                        {newsItem.title}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{
                        width: 90,
                        height: 60,
                        objectFit: "cover",
                      }}
                      image={newsItem.image}
                      alt={newsItem.title}
                    />
                  </Card>

                  {/* Add divider after each card except the last one */}
                  {index < newestNews.length - 1 && (
                    <Divider sx={{ marginTop: "20px" }} />
                  )}
                </div>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <NewCategoryVC new_ids={newListID} category_name={categoryName}/>
      </Box>
      <Footer />
    </Box>
  );
};

export default NewList;

import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Books = () => {
  const navigate = useNavigate();
  const booksData = [
    {
      title: "Cuốn sách hay 1",
      author: "Tác giả 1",
      image:
        "https://muagitot.com/upload_images/images/2022/03/29/acbb422fb3f47ffc8fa77f9424479c48.jpg?w=1130",
      description: "Đây là một cuốn sách hay về chủ đề ...",
    },
    {
      title: "Cuốn sách hay 2",
      author: "Tác giả 2",
      image:
        "https://www.elle.vn/wp-content/uploads/2021/07/15/442832/1-sach-hay-song-cham.jpg",
      description: "Cuốn sách này giúp bạn hiểu rõ hơn về ...",
    },
  ];

  const genres = [
    "Tài Chính",
    "Khoa Học",
    "Lịch Sử",
    "Tâm Lý",
    "Công Nghệ",
    "Trinh Thám",
    "Sức Khỏe",
    "Giáo Dục",
    "Thiếu Nhi",
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
          Sách nói mới nhất
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: "20px",
          }}
        >
          {booksData.map((book, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: "16px",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
                },
              }}
            >
              {/* Image with Gradient Overlay */}
              <Box
                sx={{
                  position: "relative",
                  height: "200px",
                  backgroundImage: `url(${book.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                  }}
                />
              </Box>

              {/* Content */}
              <CardContent sx={{ padding: "16px" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    height: "50px",
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: "8px" }}
                >
                  {book.author}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    height: "60px",
                  }}
                >
                  {book.description}
                </Typography>
              </CardContent>

              {/* Button */}
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgb(252,6,106)",
                  color: "#fff",
                  borderRadius: "20px",
                  margin: "16px",
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "rgb(220,5,90)",
                  },
                }}
              >
                Đọc Sách
              </Button>
            </Card>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Books;

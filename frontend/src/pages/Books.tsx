import { Box, Typography, TextField, InputAdornment,Card, CardContent, CardMedia , AppBar, Toolbar, Button} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const navigate = useNavigate();
  const booksData = [
    {
      title: "Cuốn sách hay 1",
      author: "Tác giả 1",
      image: "https://muagitot.com/upload_images/images/2022/03/29/acbb422fb3f47ffc8fa77f9424479c48.jpg?w=1130",
      description: "Đây là một cuốn sách hay về chủ đề ...",
    },
    {
      title: "Cuốn sách hay 2",
      author: "Tác giả 2",
      image: "https://www.elle.vn/wp-content/uploads/2021/07/15/442832/1-sach-hay-song-cham.jpg",
      description: "Cuốn sách này giúp bạn hiểu rõ hơn về ...",
    },
    {
      title: "Cuốn sách hay 3",
      author: "Tác giả 3",
      image: "https://www.elle.vn/wp-content/uploads/2021/07/15/442832/1-sach-hay-song-cham.jpg",
      description: "Một cuốn sách thú vị khám phá về ...",
    },
    {
      title: "Cuốn sách hay 3",
      author: "Tác giả 3",
      image: "https://www.elle.vn/wp-content/uploads/2021/07/15/442832/1-sach-hay-song-cham.jpg",
      description: "Một cuốn sách thú vị khám phá về ...",
    },
    {
      title: "Cuốn sách hay 3",
      author: "Tác giả 3",
      image: "https://www.elle.vn/wp-content/uploads/2021/07/15/442832/1-sach-hay-song-cham.jpg",
      description: "Một cuốn sách thú vị khám phá về ...",
    },
  ];
  const genres = ["Văn học", "Khoa học", "Lịch sử", "Tâm lý", "Công nghệ", "Trinh thám", "Sức khỏe", "Giáo dục", "Thiếu nhi"];

  return (
    <Box>
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
              <Typography fontSize="1.2rem" onClick={() => navigate("/books")} sx={{cursor: "pointer"}}>Sách</Typography>
            </Box>
          </Box>
        </Box>
      </Box> 
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ color: "rgb(252,6,106)" }}>
            Thể loại Sách
          </Typography>
          <Box sx={{ display: "flex", flex: 1, justifyContent: "space-evenly" }}>
            {genres.map((genre, index) => (
              <Button key={index} color="inherit" sx={{ flex: 1, textAlign: "center" }}>
                {genre}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
        <Typography variant="h4" component="h1" sx={{ marginBottom: "20px", color: "#333" }}>
          Danh sách Sách
        </Typography>
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px"
          }}>
          {booksData.map((book, index) => (
            <Card key={index} sx={{ width: "300px" }}>
              <CardMedia
                component="img"
                height="200"
                image={book.image}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
                  {book.description}
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                color="error" 
                sx={{ 
                  position: "relative", 
                  bottom: "10px", 
                  left: "10px" 
                }}
              >
                Đọc Sách
              </Button>
            </Card>
          ))}
        </Box>
      </Box>
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

export default Books;

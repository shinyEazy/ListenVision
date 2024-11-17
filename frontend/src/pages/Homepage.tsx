import {
  Box,
  Typography,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Box>
          <Box
            position="relative"
            width="100%"
            borderBottom="2px solid #e0e0e0"
            paddingY="10px"
            bgcolor="#fff"
            display="flex"
            justifyContent="center"
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
                <Typography
                  fontSize="1.2rem"
                  onClick={() => navigate("/books")}
                  sx={{ cursor: "pointer" }}
                >
                  Sách
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box textAlign="center" marginTop="20px">
          <Typography fontWeight="800" fontSize="2.3rem" color="#333">
            Chào mừng đến với ListenVision
          </Typography>
          <Typography fontSize="1.2rem" color="#666" marginTop="10px">
            Nâng cao trải nghiệm nghe của bạn với nội dung dễ tiếp cận cho mọi
            người.
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap="30px"
          marginTop="20px"
          padding="0 20px"
        >
          <Box
            flex="1"
            maxWidth="300px"
            border="1px solid #e0e0e0"
            borderRadius="15px"
            padding="20px"
            textAlign="center"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBhRJVndSAQKMvCXj6Nv8LqkVw4X_DCNpT_bjRegXSEORcqdyK"
              alt="Audiobook"
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
            <Typography fontWeight="600">Sách Nói Nổi Bật</Typography>
            <Typography fontSize="0.9rem" color="#666">
              Khám phá những xu hướng mới nhất về sách nói và đắm mình trong
              những câu chuyện mới.
            </Typography>
          </Box>
          <Box
            flex="1"
            maxWidth="300px"
            border="1px solid #e0e0e0"
            borderRadius="15px"
            padding="20px"
            textAlign="center"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <img
              src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRz5fRdxOz5syCZ5jro8uaryCFdYa8P0BMbsPgKmy7dFU-5gm4T"
              alt="Calm Reading"
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
            <Typography fontWeight="600">Đọc Yên Tĩnh</Typography>
            <Typography fontSize="0.9rem" color="#666">
              Trải nghiệm một không gian đọc yên bình với những âm thanh bổ trợ
              dễ chịu.
            </Typography>
          </Box>
          <Box
            flex="1"
            maxWidth="300px"
            border="1px solid #e0e0e0"
            borderRadius="15px"
            padding="20px"
            textAlign="center"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
          >
            <img
              src="https://img.freepik.com/premium-vector/group-people-are-sitting-pile-books-reading_1268375-326.jpg"
              alt="Community Book Club"
              style={{
                width: "100%",
                height: "200px",
                borderRadius: "10px",
                marginBottom: "15px",
                objectFit: "cover",
              }}
            />
            <Typography fontWeight="600">Câu Lạc Bộ Sách Cộng Đồng</Typography>
            <Typography fontSize="0.9rem" color="#666">
              Tham gia câu lạc bộ sách cộng đồng của chúng tôi và chia sẻ niềm
              yêu thích với những câu chuyện cùng mọi người.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button
          onClick={() => navigate("/landing")}
          variant="contained"
          sx={{
            backgroundColor: "rgb(252,6,106)",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "20px",
            fontSize: "1.5rem",
            textTransform: "none",
          }}
        >
          Bắt Đầu Ngay!
        </Button>
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

export default HomePage;

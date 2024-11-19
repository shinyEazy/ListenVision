import { Box, Typography, Button } from "@mui/material";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        <Header />
        <Box textAlign="center" marginTop="20px">
          <Typography fontWeight="800" fontSize="2.3rem" color="#333">
            Chào mừng đến với ListenVision
          </Typography>
          <Typography fontSize="1.2rem" color="#666">
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
      <Footer />
    </Box>
  );
};

export default HomePage;

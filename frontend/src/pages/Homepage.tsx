import { Box, Typography, Button } from "@mui/material";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomepageVC from "components/voicecontrol/homepageVC";

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
        <Box textAlign="center" marginTop="10px">
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
      <Box display="flex" justifyContent="center" gap="40px">
        <Button
          onClick={() => navigate("/news")}
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
          Tin tức mới nhất
        </Button>
        <Button
          onClick={() => navigate("/books")}
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
          Sách nói nổi bật
        </Button>
      </Box>
      <Box
        id="voice-control-guide"
        marginTop="30px"
        padding="30px"
        bgcolor="#f3f4f6"
        borderRadius="12px"
        boxShadow="0 6px 12px rgba(0, 0, 0, 0.1)"
        textAlign="center"
        maxWidth="800px"
        marginX="auto"
        border="1px solid #e0e0e0"
      >
        <Typography
          fontWeight="700"
          fontSize="1.8rem"
          color="#2c3e50"
          marginBottom="20px"
        >
          Hướng dẫn sử dụng Voice Control
        </Typography>
        <Typography
          fontSize="1.1rem"
          color="#555"
          lineHeight="1.6"
          marginBottom="15px"
        >
          - Hãy nói <b>"Bắt đầu"</b> để bắt đầu sử dụng tính năng voice control
          và <b>Dừng</b> để tắt nó.
          <br />- Mở hướng dẫn voice control trong các trang bằng câu lệnh{" "}
          <b>Hướng dẫn</b> và đóng hướng dẫn bằng câu lệnh <b>Đóng</b>.
          <br />- Hãy nói <b>"Mở Tin Tức" hay một câu có chứa "Tin Tức"</b> để
          chuyển đến trang tin tức.
          <br />- Nói <b>"Xem Sách Nói" hay một câu có chứa "Sách"</b> để truy
          cập danh mục sách nổi bật.
          <br />- Sử dụng các câu lệnh đơn giản như
          <b> "Trang Chủ"</b> để điều hướng về trang chủ dễ dàng.
          <br />- Các lệnh: lên, xuống, đầu trang và cuối trang để điều chỉnh
          màn hình.
          <br />- Ở phần <b>tin tức</b>:
          <br />+ Truy cập tới các lĩnh vực bạn muốn với câu lệnh: tên của lĩnh
          vực đó.
          <br />+ Truy cập tới bài báo với câu lệnh: bài báo + ID của nó.
          <br />- Ở phần <b>sách</b>:
          <br />+ Truy cập tới sách bạn muốn với câu lệnh: ID của cuốn sách đó.
          <br />- Nghe bài báo/sách với lệnh <b>"Nghe"</b> và dừng nghe với lệnh{" "}
          <b>"Tắt"</b>
        </Typography>
        <Typography
          fontSize="0.95rem"
          color="#7f8c8d"
          fontStyle="italic"
          marginTop="20px"
        >
          * Lưu ý: Tính năng này yêu cầu truy cập microphone và hỗ trợ trình
          duyệt hiện tại của bạn.
        </Typography>
      </Box>

      <HomepageVC />
      <Footer />
    </Box>
  );
};

export default HomePage;

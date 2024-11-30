import { Box, Typography, Button } from "@mui/material";
import "../styles.css";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// voice control import
import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "store/store";
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
// end voice control import 

const HomePage = () => {
  const navigate = useNavigate();

  // --- voice control code
  const isDemanded = useSelector((state: RootState) => state.isDemanded.isDemanded);
  const dispatch = useDispatch();
  const setIsDemanded = (value: boolean) => {
    dispatch(setIsDemandedReducer(value))
  }
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isListening, setIsListening] = useState(true);
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Trình duyệt của bạn không hỗ trợ Speech Recognition');
      setIsListening(false)
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true; 
    recognition.interimResults = true; 
    recognition.lang = 'vi-VN';
    recognition.onresult = (event: any) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript.toLowerCase().trim();
      setTranscript(transcript); 
      if (checkTranscript(transcript, "bắt đầu", 2)) {
        setIsDemanded(true);
        console.log('Đã bắt đầu lắng');
      }
      if(checkTranscript(transcript, "dừng", 1) || checkTranscript(transcript, "rừng", 1) || checkTranscript(transcript, "đừng", 1)) {
          setIsDemanded(false);
          console.log('Đã dừng lắng nghe')
      }
      if (isDemanded) {
        if (checkTranscript(transcript, "sách", 1)) {
          navigate('/books')
        }
      }
    }
    recognition.onend = () => {
      console.log("Ended");
      setIsEnded(!isEnded)
    }
    recognition.start();
    return () => {
      if (recognitionRef.current) {
        recognition.stop();
        recognitionRef.current = null;
      }
    };
  }, [isDemanded, isEnded])
  // --- end voice control code

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
      <MicStatus isListening={isListening} />
        {/* 
      <div className="mt-4">
            <p>Transcript: {transcript}</p>
            <p>Trạng thái: {isDemanded ? 'Đang nhận lệnh' : 'Không nhận lệnh'}</p>
      </div>
      */}
      <Footer />
    </Box>
  );
};

export default HomePage;

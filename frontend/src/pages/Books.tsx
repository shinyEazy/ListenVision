import { Box, Typography, Card, CardMedia, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
// voice control import
import { useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "store/store";
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";

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
  const [hasScrolledDown, setHasScrolledDown] = useState(false)
  const [hasScrolledUp, setHasScrolledUp] = useState(false)
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
    recognition.onresult = (event:any) => {
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
        if (checkTranscript(transcript, "trang chủ", 2)) {
          navigate('/')
        }
         // Cuộn xuống và lên một đoạn 
         if (checkTranscript(transcript, "xuống", 1)) {
          if(!hasScrolledDown) {
            window.scrollBy({
              top: 200, // Số pixel muốn cuộn
              behavior: 'smooth' // Hiệu ứng cuộn mượt
            });
            console.log("đã cuộn xuống");
            setHasScrolledDown(true)
            setTimeout(() => {
              setHasScrolledDown(false);  // Đặt lại giá trị sau 2 giây
            }, 3000); 
          }
        }
        if (checkTranscript(transcript, "lên", 1)) {
          if(!hasScrolledUp) {
            window.scrollBy({
              top: -200, // Số pixel muốn cuộn
              behavior: 'smooth' // Hiệu ứng cuộn mượt
            });
            console.log("đã cuộn lên");
            setHasScrolledUp(true)
            setTimeout(() => {
              setHasScrolledUp(false);  // Đặt lại giá trị sau 2 giây
            }, 3000); 
          }
        }
        // Cuộn đến đầu trang và cuối trang
        if (checkTranscript(transcript, "đầu trang", 2)) {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        if (checkTranscript(transcript, "cuối trang", 2)) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          });
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
  }, [isDemanded, isEnded, hasScrolledDown, hasScrolledUp])
  // --- end voice control code

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
      <MicStatus isListening={isListening} />
      <Footer />
    </Box>
  );
};

export default Books;

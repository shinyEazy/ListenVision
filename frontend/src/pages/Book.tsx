import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface Part {
  part_id: number;
  title: string;
  content: string;
  duration: string;
}

interface NewBook {
  id: number;
  category: string;
  title: string;
  author: string;
  image: string;
  description: string;
  parts: Part[];
}

const BookPage = () => {
  const { id } = useParams<{ id: string }>();
  const [newBook, setNewBook] = useState<NewBook | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewBook[]>([]);
  const [loading, setLoading] = useState(true);

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../data/books.json");
        const data: NewBook[] = await response.json();
        const foundBook = data.find((news) => news.id === Number(id));
        setNewBook(foundBook || null);

        const related = data
          .filter(
            (news) =>
              news.category === foundBook?.category && news.id !== Number(id)
          )
          .slice(0, 4);
        setRelatedNews(related);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const description = newBook?.description
    ? newBook.description.split("\n").filter((line) => line.trim() !== "")
    : [];

  return (
    <Box>
      <Header />

      {/* Book Main Section */}
      <Box
        sx={{
          backgroundColor: "rgb(175,33,27)",
          padding: "40px",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {/* Book Image */}
          <Box
            component="img"
            src={newBook?.image || "https://via.placeholder.com/200x300"}
            alt={newBook?.title || "Book Cover"}
            sx={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
              width: "200px",
              height: "300px",
            }}
          />

          {/* Book Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" fontWeight="bold">
              {newBook?.title || "Loading..."}
            </Typography>
            <Typography variant="subtitle1" sx={{ margin: "10px 0" }}>
              Trang chủ / Thể loại / {newBook?.category || ""}
            </Typography>
            <Typography variant="subtitle2">⏱️ 4 giờ 1 phút</Typography>

            {/* Buttons */}
            <Box sx={{ margin: "20px 0", display: "flex", gap: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "goldenrod",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "darkgoldenrod",
                  },
                }}
              >
                Nghe sách
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Phát lại
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "#fff", borderColor: "#fff" }}
              >
                Phát tiếp
              </Button>
            </Box>

            {/* Bookmark and Favorite */}
            <Box sx={{ display: "flex", gap: "15px" }}>
              <IconButton sx={{ color: "#fff" }}>
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton sx={{ color: "#fff" }}>
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Chapters List */}
          <Box
            sx={{
              minWidth: "250px",
              bgcolor: "#a52a2a",
              borderRadius: "8px",
              overflowY: "auto",
              maxHeight: "400px",
            }}
          >
            <List>
              {newBook?.parts.map((part) => (
                <ListItem
                  key={part.part_id}
                  sx={{
                    color: "#ccc",
                    "&:hover": { backgroundColor: "#8b0000", color: "#fff" },
                  }}
                >
                  <ListItemText
                    primary={part.title}
                    secondary={part.duration}
                    sx={{ textAlign: "center" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>

      {/* Description Section */}
      {/* Description Section */}
      <Box sx={{ maxWidth: "1200px", margin: "20px auto", padding: "20px" }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ marginBottom: "10px" }}
        >
          Giới thiệu nội dung
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {description.join("\n\n") || "No description available."}
        </Typography>
      </Box>

      {/* Audio Player */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Box
            component="img"
            src={newBook?.image}
            alt="Book Cover"
            sx={{ width: "50px", height: "50px", borderRadius: "4px" }}
          />
          <Box>
            <Typography variant="body1">{newBook?.title}</Typography>
            <Typography variant="body2" color="gray">
              {newBook?.author}
            </Typography>
          </Box>
        </Box>

        {/* Audio Controls */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton sx={{ color: "#fff" }}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton onClick={togglePlay} sx={{ color: "#fff" }}>
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          <IconButton sx={{ color: "#fff" }}>
            <SkipNextIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" color="gray">
          00:12 / 28:15
        </Typography>
      </Box>

      <Footer />
    </Box>
  );
};

export default BookPage;

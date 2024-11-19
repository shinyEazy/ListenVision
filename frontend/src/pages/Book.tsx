import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link,
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
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

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
  const navigate = useNavigate();
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
            alignItems: "center",
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
          <Box sx={{ flex: 1 }} marginLeft="40px">
            <Typography variant="h4" fontWeight="bold">
              {newBook?.title || "Loading..."}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                margin: "10px 0",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
              >
                Trang chủ
              </Typography>
              <Typography>/</Typography>
              <Typography
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
              >
                {newBook?.category || ""}
              </Typography>
            </Typography>

            <Typography variant="subtitle2" display="flex" alignItems="center">
              <FontAwesomeIcon
                icon={faClock}
                style={{ fontSize: "1.1rem", marginRight: "8px" }}
              />{" "}
              4 giờ 1 phút
            </Typography>

            {/* Buttons */}
            <Box sx={{ margin: "20px 0", display: "flex", gap: "20px" }}>
              <Button
                variant="contained"
                sx={{
                  padding: "8px 20px",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgb(180,83,9)",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  gap: "8px",
                  borderRadius: "100px",
                  "&:hover": {
                    backgroundColor: "rgb(217,119,6)",
                  },
                }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlay}
                  style={{ fontSize: "1.4rem" }}
                />
                Nghe sách
              </Button>
            </Box>
            {/* Bookmark and Favorite */}
            <Box sx={{ display: "flex", gap: "15px" }}>
              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid white",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton
                sx={{
                  color: "#fff",
                  border: "1px solid white",
                  borderRadius: "8px",
                  padding: "8px",
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Chapters List */}
          <Box
            sx={{
              minWidth: "370px",
              bgcolor: "rgb(152,36,32)",
              borderRadius: "8px",
              overflowY: "auto",
              maxHeight: "300px",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <List style={{ padding: "8px" }}>
              {newBook?.parts.map((part, index) => (
                <ListItem
                  key={part.part_id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "2px 0 4px",
                    justifyContent: "space-between",
                    color: "#ccc",
                    "&:hover": {
                      backgroundColor: "rgb(182,102,99)",
                      color: "#fff",
                      borderRadius: "8px",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "32px",
                      minHeight: "32px",
                      borderRadius: "8px",
                      position: "relative",
                      transition: "all 0.3s ease-in-out",
                      color: "#fff",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "1.5rem",
                        position: "absolute",
                      }}
                    >
                      {index + 1}
                    </Typography>
                  </Box>
                  <ListItemText
                    primary={part.title}
                    secondary={`${part.duration}`}
                    primaryTypographyProps={{
                      sx: { color: "white" },
                    }}
                    secondaryTypographyProps={{
                      sx: { color: "white" },
                    }}
                    sx={{ textAlign: "left", ml: "20px" }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
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

import {
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slider,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

interface Part {
  part_id: number;
  title: string;
  content: string;
  duration: string;
  url: string;
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
  const [relatedBooks, setRelatedBooks] = useState<NewBook[]>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioSource, setAudioSource] = useState<string | null>(null);
  const [currentPart, setCurrentPart] = useState<Part | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

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
          .sort((a, b) => b.id - a.id)
          .slice(0, 2);
        setRelatedBooks(related);

        if (foundBook?.parts?.length) {
          setCurrentPart(foundBook.parts[0]);
          setAudioSource(foundBook.parts[0].url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    fetchData();
  }, [id]);

  const description = newBook?.description
    ? newBook.description.split("\n").filter((line) => line.trim() !== "")
    : [];

  const handlePartClick = async (part: Part) => {
    setCurrentPart(part);
    setAudioSource(part.url);
    setProgress(0);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.load();

      await new Promise((resolve) => {
        audioRef.current!.oncanplay = resolve;
      });

      audioRef.current.play();
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
          audioRef.current.removeEventListener(
            "loadedmetadata",
            handleLoadedMetadata
          );
        }
      };
    }
  }, []);

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
                onClick={() => {
                  navigate("/books");
                  window.scrollTo(0, 0);
                }}
                sx={{ cursor: "pointer" }}
              >
                Sách nói
              </Typography>
              <Typography>/</Typography>
              <Typography
                onClick={() => {
                  navigate(
                    `/books/${newBook?.category
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .replace(/\s+/g, "-")}/1`
                  );
                  window.scrollTo(0, 0);
                }}
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
                  onClick={() => handlePartClick(part)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    margin: "2px 0 4px",
                    justifyContent: "space-between",
                    color: "#ccc",
                    cursor: "pointer",
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
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          margin: "40px auto 200px",
          maxWidth: "1200px",
        }}
      >
        <Box sx={{ maxWidth: "1000px" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "10px" }}
          >
            Giới thiệu nội dung
          </Typography>
          <Typography fontSize="1.3rem" sx={{ whiteSpace: "pre-line" }}>
            {description.join("\n\n") || "No description available."}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ marginBottom: "10px" }}
          >
            Sách nói tương tự
          </Typography>
          {/* Sách nói tương tự */}
          <Box
            sx={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            {relatedBooks.map((book) => (
              <Box
                key={book.id}
                sx={{
                  width: "150px",
                  cursor: "pointer",
                  textAlign: "center",
                  color: "#000",
                  transition: "all 0.3s ease-in-out",
                  ":hover": {
                    backgroundColor: "#f4f4f4",
                    transform: "scale(1.05)",
                  },
                }}
                onClick={() => {
                  navigate(`/book/${book.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                <Box
                  component="img"
                  src={book.image}
                  alt={book.title}
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    transition: "transform 0.3s ease-in-out",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  }}
                />
                <Typography
                  fontSize="1.1rem"
                  sx={{
                    fontWeight: "bold",
                    marginTop: "10px",
                    textAlign: "start",
                  }}
                >
                  {book.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ textAlign: "start" }}
                >
                  {book.author}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {/* Audio Player */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#141414",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px 20px",
          gap: "40px",
          height: "120px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Box
            component="img"
            src={newBook?.image}
            alt="Book Cover"
            sx={{ width: "60px", height: "70px", borderRadius: "4px" }}
          />
          <Box>
            <Typography variant="body1">{newBook?.title}</Typography>
            <Typography variant="body2" color="gray">
              {newBook?.author}
            </Typography>
            <Typography variant="body2" color="gray">
              {currentPart?.title || "Select a chapter"}
            </Typography>
          </Box>
        </Box>
        {/* Audio Controls */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "900px",
          }}
        >
          <Box>
            <IconButton sx={{ color: "#fff" }}>
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (audioRef.current) {
                  if (audioRef.current.paused) {
                    audioRef.current.play();
                  } else {
                    audioRef.current.pause();
                  }
                }
              }}
              sx={{ color: "#fff" }}
            >
              {audioRef.current?.paused ? (
                <PlayArrowIcon style={{ fontSize: "2.3rem" }} />
              ) : (
                <PauseIcon style={{ fontSize: "2.3rem" }} />
              )}
            </IconButton>
            <IconButton sx={{ color: "#fff" }}>
              <SkipNextIcon />
            </IconButton>
          </Box>
          <Box width="100%">
            <Slider
              value={(progress / duration) * 100 || 0}
              onChange={(event, newValue) => {
                if (audioRef.current) {
                  audioRef.current.currentTime =
                    (duration * (newValue as number)) / 100;
                  setProgress(audioRef.current.currentTime);
                }
              }}
              sx={{
                color: "#fff",
                flex: 1,
              }}
            />
          </Box>
          <Box width="100%" display="flex" justifyContent="space-between">
            <Typography>{formatTime(currentTime)}</Typography>
            <Typography>{formatTime(duration)}</Typography>
          </Box>
        </Box>
      </Box>
      <audio
        ref={audioRef}
        src={audioSource || ""}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </Box>
  );
};

export default BookPage;

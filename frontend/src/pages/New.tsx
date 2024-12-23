import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SingularNewVC from "components/voicecontrol/singularNewVC";

interface NewData {
  id: number;
  category: string;
  title: string;
  time: string;
  content: string;
  image: string;
  url: string;
}

const New = () => {
  
  const { id } = useParams<{ id: string }>();
  const [newData, setNewData] = useState<NewData | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewData[]>([]);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../data/news.json");
        const data: NewData[] = await response.json();

        // Sort the data by ID in descending order to get the latest news first
        const sortedData = [...data].sort((a, b) => b.id - a.id);

        const foundBook = sortedData.find((news) => news.id === Number(id));
        setNewData(foundBook || null);

        const related = sortedData
          .filter(
            (news) =>
              news.category === foundBook?.category && news.id !== Number(id)
          )
          .slice(0, 3);
        setRelatedNews(related);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );

  if (!newData)
    return (
      <Typography variant="h6" textAlign="center" mt={4}>
        Article not found.
      </Typography>
    );
  const paragraphs = newData.content
    .split("\n")
    .filter((paragraph) => paragraph.trim() !== "");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f9f9f9",
      }}
    >
      <Header />
      <Box
        sx={{
          maxWidth: "800px",
          margin: "20px auto",
          padding: "20px",
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
          textAlign="center"
        >
          {newData.title}
        </Typography>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          textAlign="center"
          gutterBottom
        >
          {newData.time}
        </Typography>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            margin: "20px 0",
            borderRadius: "8px",
            overflow: "hidden",
            height: "400px",
            backgroundImage: `url(${newData.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></Box>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {/*sound here */}
          <audio ref={audioRef} controls style={{ width: "100%" }}>
            <source src={newData.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </Box>
        {paragraphs.map((paragraph, index) => (
          <Typography key={index} fontSize="1.3rem" paragraph>
            {paragraph}
          </Typography>
        ))}
      </Box>
      {relatedNews.length > 0 && (
        <Box
          sx={{
            maxWidth: "800px",
            margin: "20px auto",
            padding: "20px",
            bgcolor: "white",
            borderRadius: "12px",
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Tin tức liên quan
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {relatedNews.map((news) => (
              <Card
                key={news.id}
                sx={{
                  borderRadius: "8px",
                  boxShadow: 1,
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                }}
                onClick={() => (window.location.href = `/new/${news.id}`)}
              >
                <CardMedia
                  component="img"
                  image={news.image}
                  alt={news.title}
                  sx={{ height: 140 }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    {news.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      marginTop: "8px",
                    }}
                  >
                    {news.content}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <SingularNewVC audioRef={audioRef}/>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default New;

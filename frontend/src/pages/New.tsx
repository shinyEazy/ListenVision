import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface NewData {
  id: number;
  category: string;
  title: string;
  time: string;
  content: string;
}

const New = () => {
  const { id } = useParams<{ id: string }>();
  const [newData, setNewData] = useState<NewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../data/news.json");
        const data: NewData[] = await response.json();
        const foundBook = data.find((book) => book.id === Number(id));
        setNewData(foundBook || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!newData) return <Typography>Book not found.</Typography>;

  return (
    <Box padding={2}>
      <Typography variant="h5" gutterBottom>
        {newData.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {newData.time}
      </Typography>
      <Typography variant="body1">{newData.content}</Typography>
    </Box>
  );
};

export default New;

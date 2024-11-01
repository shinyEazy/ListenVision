import { Box, Typography, Button } from "@mui/material";

const HomePage = () => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography>ListenVision</Typography>
        <Box display="flex">
          <Typography>Home</Typography>
          <Typography>News</Typography>
          <Typography>Books</Typography>
        </Box>
      </Box>
      <Box textAlign="center">
        <Typography>Welcome to ListenVision</Typography>
        <Typography>
          Enhancing your listening experience with accesible content for
          everyone.
        </Typography>
      </Box>
      <Box display="flex" gap="40px">
        <Box flex="1" border="1px solid black">
          <Typography>Featured Audiobook</Typography>
          <Typography>
            Discover the latest trends in audiobooks and immerse yourself in new
            stories.
          </Typography>
        </Box>
        <Box flex="1" border="1px solid black">
          <Typography>Featured Audiobook</Typography>
          <Typography>
            Discover the latest trends in audiobooks and immerse yourself in new
            stories.
          </Typography>
        </Box>
        <Box flex="1" border="1px solid black">
          <Typography>Featured Audiobook</Typography>
          <Typography>
            Discover the latest trends in audiobooks and immerse yourself in new
            stories.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button>Start now!</Button>
      </Box>
      <Box display="flex">
        <Box>
          <Typography>About ListenVision</Typography>
          <Typography>
            ListenVision is your destination for captivating audio news and
            books that bring stories to life.
          </Typography>
          <Box>
            <Typography>Contact Us</Typography>
            <Typography>Email: support@listenvision.com</Typography>
          </Box>
          <Box>
            <Typography>Follow Us</Typography>
            <Box>
              <Button>f</Button>
              <Button>x</Button>
              <Button>i</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;

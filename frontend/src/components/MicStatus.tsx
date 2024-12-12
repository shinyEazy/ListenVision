import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface MicStatusProps {
  isListening: boolean;
}
const MicStatus: React.FC<MicStatusProps> = ({ isListening }) => {
  const isDemanded = useSelector(
    (state: RootState) => state.isDemanded.isDemanded
  );
  const [waveEffect, setWaveEffect] = useState(false);

  useEffect(() => {
    // Thêm hiệu ứng sóng khi mic đang thu âm (isListening = true)
    if (isListening) {
      const interval = setInterval(() => {
        setWaveEffect((prev) => !prev);
      }, 500);
      return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    } else {
      setWaveEffect(false); // Tắt hiệu ứng khi mic không thu âm
    }
  }, [isListening]);

  let backgroundColor = "red"; // Mặc định nền là đỏ
  if (isListening) {
    // Nếu đang nghe thì kiểm tra isDemanded
    backgroundColor = isDemanded ? "green" : "yellow"; // Màu xanh nếu isDemanded = true, màu vàng nếu isDemanded = false
  }
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          right: "20px",
          bottom: "130px",
          padding: "10px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          backgroundColor: backgroundColor,
          boxShadow: 2,
          transition: "background-color 0.3s ease",
        }}
      >
        <FontAwesomeIcon
          icon={faMicrophone}
          style={{
            color: "black",
            fontSize: "30px",
            marginRight: "10px",
            animation: waveEffect ? "pulse 1.5s infinite" : "none", // Áp dụng hiệu ứng sóng
          }}
        />
        <Typography
          variant="body1"
          sx={{
            color: "black",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {isDemanded ? "Đang nhận lệnh" : "Không nhận lệnh"}
        </Typography>
      </Box>
    </div>
  );
};

export default MicStatus;

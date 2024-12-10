import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from "react-redux";
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const NewCategoryVC = ({ new_ids, category_name }) => {
  const number_of_pages = [1, 2, 3, 4];
  const number_of_pages_str = ["một", "hai", "ba", "bốn"];
  const navigate = useNavigate();
  // --- voice control code
  const [showGuide, setShowGuide] = useState(false);
  const isDemanded = useSelector((state) => state.isDemanded.isDemanded);
  const dispatch = useDispatch();
  const setIsDemanded = (value) => {
    dispatch(setIsDemandedReducer(value));
  };
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isListening, setIsListening] = useState(true);
  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Trình duyệt của bạn không hỗ trợ Speech Recognition");
      setIsListening(false);
      return;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";
    recognition.onresult = (event) => {
      const lastResultIndex = event.results.length - 1;
      const transcript = event.results[lastResultIndex][0].transcript
        .toLowerCase()
        .trim();
      setTranscript(transcript);
      if (checkTranscript(transcript, "bắt đầu", 2)) {
        setIsDemanded(true);
        console.log("Đã bắt đầu lắng");
      }
      if (
        checkTranscript(transcript, "dừng", 1) ||
        checkTranscript(transcript, "rừng", 1) ||
        checkTranscript(transcript, "đừng", 1)
      ) {
        setIsDemanded(false);
        console.log("Đã dừng lắng nghe");
      }
      if (isDemanded) {
        if (
          checkTranscript(transcript, "sách", 1) ||
          checkTranscript(transcript, "xách", 1)
        ) {
          navigate("/books");
        }
        if (checkTranscript(transcript, "tin tức", 2)) {
          navigate("/news");
        }
        for (let i = 0; i < new_ids.length; i++) {
          if (transcript.includes(new_ids[i].toString())) {
            navigate(`/new/${new_ids[i]}`);
          }
        }
        for (let i = 0; i < number_of_pages.length; i++) {
          const str = "trang " + number_of_pages[i];
          const str1 = "trang " + number_of_pages_str[i];
          if (transcript.includes(str) || transcript.includes(str1)) {
            navigate(`/news/${category_name}/${number_of_pages[i]}`);
          }
        }
        // Cuộn xuống và lên một đoạn
        if (checkTranscript(transcript, "xuống", 1)) {
          window.scrollBy({
            top: 200,
            behavior: "smooth",
          });
          recognition.stop();
        }
        if (checkTranscript(transcript, "lên", 1)) {
          window.scrollBy({
            top: -200,
            behavior: "smooth",
          });
          recognition.stop();
        }
        // Cuộn đến đầu trang và cuối trang
        if (checkTranscript(transcript, "đầu trang", 2)) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
        if (checkTranscript(transcript, "cuối trang", 2)) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
        // Hiển thị phần hướng dẫn
        if (checkTranscript(transcript, "hướng dẫn", 2)) {
          setShowGuide(true);
          recognition.stop();
        }

        // Ẩn phần hướng dẫn
        if (showGuide && checkTranscript(transcript, "đóng", 1)) {
          setShowGuide(false);
          recognition.stop();
        }
      }
    };
    recognition.onend = () => {
      console.log("Ended");
      setIsEnded(!isEnded);
    };
    recognition.start();
    return () => {
      if (recognitionRef.current) {
        recognition.stop();
        recognitionRef.current = null;
      }
    };
  }, [isDemanded, isEnded, new_ids, showGuide]);
  // --- end voice control code
  return (
    <>
      <MicStatus isListening={isListening} />
      {showGuide && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: "30px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "12px",
            zIndex: 1000,
            textAlign: "center",
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
            Hướng dẫn Sử dụng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            - Hãy nói <b>"Bắt đầu"</b> để bắt đầu sử dụng tính năng voice
            control và <b>Dừng</b> để tắt nó.
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
            <br />+ Truy cập tới các lĩnh vực bạn muốn với câu lệnh: tên của
            lĩnh vực đó.
            <br />+ Truy cập tới bài báo với câu lệnh: bài báo + ID của nó.
            <br />- Ở phần <b>sách</b>:
            <br />+ Truy cập tới sách bạn muốn với câu lệnh: ID của cuốn sách
            đó.
            <br />- Nghe bài báo/sách với lệnh <b>"Nghe"</b> và dừng nghe với
            lệnh <b>"Tắt"</b>
          </Typography>
        </Box>
      )}
    </>
  );
};

export default NewCategoryVC;

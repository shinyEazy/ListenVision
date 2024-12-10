import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from "react-redux";
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";
import { convertNumToString } from "utils/convertNumber";
import { Box, Typography } from "@mui/material";

const BooksVC = () => {
  const genres = [
    "tự truyện",
    "tài chính",
    "tư duy",
    "kỹ năng sống",
    "công nghệ",
    "khởi nghiệp",
  ];
  let book_ids = [];
  let book_id_string_arr = [];
  for (let i = 1; i <= 18; i++) {
    book_ids.push(i);
    const str = convertNumToString(i);
    book_id_string_arr.push(str);
  }

  const navigate = useNavigate();
  // --- voice control code
  const isDemanded = useSelector((state) => state.isDemanded.isDemanded);
  const dispatch = useDispatch();
  const setIsDemanded = (value) => {
    dispatch(setIsDemandedReducer(value));
  };
  const [transcript, setTranscript] = useState("");
  const [showGuide, setShowGuide] = useState(false); // Trạng thái hiển thị hướng dẫn
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
      }
      if (
        checkTranscript(transcript, "dừng", 1) ||
        checkTranscript(transcript, "rừng", 1) ||
        checkTranscript(transcript, "đừng", 1)
      ) {
        setIsDemanded(false);
      }
      if (isDemanded) {
        if (checkTranscript(transcript, "trang chủ", 2)) {
          navigate("/");
        }
        if (checkTranscript(transcript, "tin tức", 2)) {
          navigate("/news");
        }
        for (let i = 0; i < 9; i++) {
          const genre = genres[i];
          if (checkTranscript(transcript, genre, 2)) {
            navigate(
              `/books/${genre
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "-")}/1`
            );
          }
        }
        for (let i = book_ids.length - 1; i >= 0; i--) {
          /*
                    const command = 'sách ' + book_ids[i]
                    const command_1 = 'xách ' + book_ids[i]
                    const command_2 = 'xách ' + book_id_string_arr[i]
                    const command_3 = 'sách ' + book_id_string_arr[i]
                    if(transcript.includes(command) || transcript.includes(command_1) || transcript.includes(command_2) || transcript.includes(command_3)) {
                        console.log(`/book/${book_ids[i]}`)
                        navigate(`/book/${book_ids[i]}`)
                        recognition.stop();
                        break;
                    }
                    */
          if (
            transcript.includes(book_ids[i].toString()) ||
            transcript.includes(book_id_string_arr[i].toString())
          ) {
            navigate(`/book/${book_ids[i]}`);
            recognition.stop();
            break;
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
  }, [isDemanded, isEnded, showGuide]);
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

export default BooksVC;

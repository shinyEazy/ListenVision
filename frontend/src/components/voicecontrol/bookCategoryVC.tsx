import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from "react-redux";
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { convertNumToString } from "utils/convertNumber";
import { Box, Typography } from "@mui/material";

interface BookCategoryVCProps {
  book_by_category_ids: number[]; // Định nghĩa kiểu cho props book_by_category_ids
}

const BookCategoryVC: React.FC<BookCategoryVCProps> = ({
  book_by_category_ids,
}) => {
  const [book_by_category_ids_str, setBookByCatStr] = useState<string[]>([]);
  const navigate = useNavigate();
  // --- voice control code
  const isDemanded = useSelector(
    (state: RootState) => state.isDemanded.isDemanded
  );
  const dispatch = useDispatch();
  const [showGuide, setShowGuide] = useState(false);
  const setIsDemanded = (value: boolean) => {
    dispatch(setIsDemandedReducer(value));
  };
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);
  const [isEnded, setIsEnded] = useState(false);
  const [isListening, setIsListening] = useState(true);

  useEffect(() => {
    const tmp_arr = [];
    for (let i = 0; i < book_by_category_ids.length; i++) {
      const str = convertNumToString(book_by_category_ids[i]);
      tmp_arr.push(str);
    }
    setBookByCatStr(tmp_arr);
  }, [book_by_category_ids]);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert("Trình duyệt của bạn không hỗ trợ Speech Recognition");
      setIsListening(false);
      return;
    }
    console.log(book_by_category_ids.length);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "vi-VN";
    recognition.onresult = (event: any) => {
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
        if (
          checkTranscript(transcript, "sách", 1) ||
          checkTranscript(transcript, "xách", 1)
        ) {
          navigate("/books");
        }
        if (checkTranscript(transcript, "tin tức", 2)) {
          navigate("/news");
        }
        if (checkTranscript(transcript, "trang chủ", 2)) {
          navigate("/");
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
        for (let i = book_by_category_ids.length - 1; i >= 0; i--) {
          if (
            transcript.includes(book_by_category_ids[i].toString()) ||
            transcript.includes(book_by_category_ids_str[i])
          ) {
            navigate(`/book/${book_by_category_ids[i]}`);
            recognition.stop();
            break;
          }
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
  }, [
    isDemanded,
    isEnded,
    book_by_category_ids,
    book_by_category_ids_str,
    showGuide,
  ]);
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

export default BookCategoryVC;

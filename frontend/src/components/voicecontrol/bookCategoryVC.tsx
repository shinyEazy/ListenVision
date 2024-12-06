import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from 'react-redux'
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";
import { RootState } from "store/store";
import { convertNumToString } from "utils/convertNumber";

interface BookCategoryVCProps {
    book_by_category_ids: number[];  // Định nghĩa kiểu cho props book_by_category_ids
  }
  
const BookCategoryVC: React.FC<BookCategoryVCProps> = ({ book_by_category_ids }) => {
    const [book_by_category_ids_str, setBookByCatStr] = useState<string[]>([]);
    const navigate = useNavigate();
     // --- voice control code
     const isDemanded = useSelector((state: RootState) => state.isDemanded.isDemanded);
    const dispatch = useDispatch();
    const setIsDemanded = (value: boolean) => {
        dispatch(setIsDemandedReducer(value))
    }
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    const [isEnded, setIsEnded] = useState(false);
    const [isListening, setIsListening] = useState(true);
    
    useEffect(() => {
        const tmp_arr = []
        for(let i = 0; i < book_by_category_ids.length; i++) {
            const str = convertNumToString(book_by_category_ids[i]);
            tmp_arr.push(str);
        }
        setBookByCatStr(tmp_arr)
    }, [book_by_category_ids]);
    
    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Trình duyệt của bạn không hỗ trợ Speech Recognition');
            setIsListening(false)
            return;
        }
        console.log(book_by_category_ids.length)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true; 
        recognition.interimResults = true; 
        recognition.lang = 'vi-VN';
        recognition.onresult = (event: any) => {
        const lastResultIndex = event.results.length - 1;
        const transcript = event.results[lastResultIndex][0].transcript.toLowerCase().trim();
        setTranscript(transcript); 
        if (checkTranscript(transcript, "bắt đầu", 2)) {
            setIsDemanded(true);
        }
        if(checkTranscript(transcript, "dừng", 1) || checkTranscript(transcript, "rừng", 1) || checkTranscript(transcript, "đừng", 1)) {
            setIsDemanded(false);
        }
        if (isDemanded) {
            if (checkTranscript(transcript, "sách", 1) || checkTranscript(transcript, "xách", 1)) {
                navigate('/books')
            }
            if (checkTranscript(transcript, "tin tức", 2)) {
                navigate('/news')
            }
            if (checkTranscript(transcript, "trang chủ", 2)) {
                navigate('/')
            }
            for(let i = book_by_category_ids.length - 1 ; i >= 0; i--) {
                if(transcript.includes(book_by_category_ids[i].toString()) || transcript.includes(book_by_category_ids_str[i])) {
                    navigate(`/book/${book_by_category_ids[i]}`)
                    recognition.stop();
                    break;
                }
            }
        }
        }
        recognition.onend = () => {
            console.log("Ended");
            setIsEnded(!isEnded)
        }
        recognition.start();
        return () => {
        if (recognitionRef.current) {
            recognition.stop();
            recognitionRef.current = null;
        }
        };
    }, [isDemanded, isEnded, book_by_category_ids, book_by_category_ids_str])
    // --- end voice control code
    return (
        <MicStatus isListening={isListening} />
    )
}

export default BookCategoryVC;
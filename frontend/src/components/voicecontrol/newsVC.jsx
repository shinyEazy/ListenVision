import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from 'react-redux'
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";
import { convertNumToString } from "utils/convertNumber";

const NewsVC = ({news_ID}) => {
    const category = ['thời sự', 'thế giới', 'kinh tế'];

    const navigate = useNavigate();
     // --- voice control code
    const isDemanded = useSelector((state) => state.isDemanded.isDemanded);
    const dispatch = useDispatch();
    const setIsDemanded = (value) => {
        dispatch(setIsDemandedReducer(value))
    }
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef(null);
    const [isEnded, setIsEnded] = useState(false);
    const [isListening, setIsListening] = useState(true);
    
    useEffect(() => {   
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Trình duyệt của bạn không hỗ trợ Speech Recognition');
            setIsListening(false)
            return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true; 
        recognition.interimResults = true; 
        recognition.lang = 'vi-VN';
        recognition.onresult = (event) => {
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
                if (checkTranscript(transcript, "trang chủ", 2)) {
                    navigate('/')
                }
                if (checkTranscript(transcript, "sách", 1) || checkTranscript(transcript, "xách", 1)) {
                    navigate('/books')
                }
                for(let i = 0; i < category.length; i++) {
                    if(transcript.includes(category[i])) {
                        const formatedCategory = category[i] .toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
                        navigate(`/news/${formatedCategory}/1`)
                        recognition.stop();
                        break;
                    }
                }
                for(let i = 0; i < news_ID.length; i++) {
                    if(transcript.includes(news_ID[i].toString())) {
                        navigate(`/new/${news_ID[i]}`)
                        recognition.stop();
                        break;
                    }
                }
                // Cuộn xuống và lên một đoạn 
                if (checkTranscript(transcript, "xuống", 1)) {
                        window.scrollBy({
                            top: 150, 
                            behavior: 'smooth' 
                        });
                        recognition.stop();
                }
                if (checkTranscript(transcript, "lên", 1)) {
                        window.scrollBy({
                            top: -200, 
                            behavior: 'smooth' 
                        });
                        recognition.stop();
                }
                // Cuộn đến đầu trang và cuối trang
                if (checkTranscript(transcript, "đầu trang", 2)) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
                if (checkTranscript(transcript, "cuối trang", 2)) {
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth'
                    });
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
    }, [isDemanded, isEnded, news_ID])
    // --- end voice control code
    return (
        <div>
            <MicStatus isListening={isListening} />
        </div>
    )
}

export default NewsVC;
import { useState, useEffect, useRef } from "react";
import { setIsDemandedReducer } from "store/slices/isDemandedSlice";
import { useSelector, useDispatch } from 'react-redux'
import MicStatus from "components/MicStatus";
import { checkTranscript } from "utils/checkTranscript";
import { useNavigate } from "react-router-dom";

const HomepageVC = () => {
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
            console.log('Đã bắt đầu lắng');
        }
        if(checkTranscript(transcript, "dừng", 1) || checkTranscript(transcript, "rừng", 1) || checkTranscript(transcript, "đừng", 1)) {
            setIsDemanded(false);
            console.log('Đã dừng lắng nghe')
        }
        if (isDemanded) {
            if (checkTranscript(transcript, "sách", 1)) {
                navigate('/books')
            }
            if (checkTranscript(transcript, "tin tức", 2)) {
                navigate('/news')
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
    }, [isDemanded, isEnded])
    // --- end voice control code
    return (
        <MicStatus isListening={isListening} />
    )
}

export default HomepageVC;
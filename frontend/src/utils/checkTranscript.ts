const checkTranscript = (word: string, target: string, number_of_word: number) => {
    if(word === target) {
        return true;
    }
    const word_arr = word.split(' ');
    let start_index = word_arr.length - number_of_word;
    let tmp_word = "";
    for(let i = start_index; i < word_arr.length; i++) {
        if(i === word_arr.length - 1) {
            tmp_word += word_arr[i];
        } else {
            tmp_word += word_arr[i] + " ";
        }
       
    }
    if(tmp_word === target) {
        return true;
    } else {
        return false;
    }
};

const getTranscriptWithTime = (word: string ) => {
    const word_arr = word.split(' ');
    let start_index = word_arr.length - 1;
    let time = { minutes: 0, seconds: 0};
    if(word_arr[start_index] !== 'giây' && word_arr[start_index] !== 'phút') {
        return null;
    }
    for(let i = start_index; i >= 0; i--) {
        if(word_arr[i] === "giây") {
            time.seconds = parseInt(word_arr[i - 1], 10); // Lấy giá trị giây
        }
        if(word_arr[i] === "phút") {
            time.minutes = parseInt(word_arr[i - 1], 10); // Lấy giá trị phút
            break;
        }
    }
    if(time.minutes === 0 && time.seconds === 0) {
        return null;
    }
    else 
        return time;
};

export { checkTranscript, getTranscriptWithTime };
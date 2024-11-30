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

export { checkTranscript };
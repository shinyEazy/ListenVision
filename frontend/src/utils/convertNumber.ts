const convertNumToString = (num: number): string => {
    switch (num) {
        case 0:
            return "không";
        case 1:
            return "một";
        case 2:
            return "hai";
        case 3:
            return "ba";
        case 4:
            return "bốn";
        case 5:
            return "năm";
        case 6:
            return "sáu";
        case 7:
            return "bảy";
        case 8:
            return "tám";
        case 9:
            return "chín";
        case 10:
            return "mười";
        default:
            return "Số ngoài phạm vi";
    }
};

export {convertNumToString}
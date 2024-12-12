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
        case 11:
            return "mười một";
        case 12:
            return "mười hai";
        case 13:
            return "mười ba";
        case 14:
            return "mười bốn";
        case 15:
            return "mười năm";
        case 16:
            return "mười sáu";
        case 17:
            return "mười bảy";
        case 18:
            return "mười tám";
        default:
            return "Số ngoài phạm vi";
    }
};


export {convertNumToString}
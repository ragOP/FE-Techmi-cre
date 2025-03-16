export const truncateString = (str, upto) => {
    if (typeof str !== "string" || typeof upto !== "number" || upto <= 0) {
        return str;
    }
    return str.length > upto ? str.slice(0, upto) + "..." : str;
};

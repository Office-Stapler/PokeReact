
export const capitalize = (string) => {
    let splits = string.split("-");
    let result = "";
    splits.map((split) => {
        result += split.charAt(0).toUpperCase() + split.slice(1);
        result += " ";
        return "";
    })
    return result;
}
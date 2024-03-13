export function convertToTitleFromDate(dateParam) {
    const date = new Date(dateParam);
    const year = date.getFullYear();
    const shortMonth = date.toLocaleString('en-US', {month: 'long'}); // Get the short month name
    const formattedDate = `${shortMonth} ${year}`;
    return formattedDate
}
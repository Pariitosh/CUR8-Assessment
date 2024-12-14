export const formatTime = (date) => {
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    const year = date.getFullYear().toString().slice(-2); // Last two digits of the year
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensures two digits for minutes
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12; // Converts 24-hour format to 12-hour format

    return `${formattedHours}:${minutes} ${ampm}`;
};
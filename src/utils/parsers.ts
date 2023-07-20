export const parseDate = ({ date }: { date: string }): string => {
  // Parsing the date string to a Date object
  const parsedDate = new Date(date);

  // Formatting day, month and year
  const day =
    parsedDate.getDate() < 10
      ? '0' + parsedDate.getDate()
      : parsedDate.getDate();
  const month =
    parsedDate.getMonth() + 1 < 10
      ? '0' + (parsedDate.getMonth() + 1)
      : parsedDate.getMonth() + 1;
  const year = parsedDate.getFullYear();

  // Concatenating them to "dd/mm/yyyy" format
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
};

export const parseTime = ({
  time,
}: {
  time: string;
}): { formattedTime: string; hours: number; minutes: number } => {
  // Parsing the time string to hours and minutes
  let [hours, minutes] = time.split(':').map(Number);

  // Rounding minutes to the nearest 15
  minutes = Math.round(minutes / 15) * 15;
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  // Formatting hours and minutes
  const formattedHours = hours < 10 ? '0' + hours : hours;
  const formattedMinutes = minutes === 0 ? '00' : minutes;

  // Concatenating them to "hh:mm" format
  const formattedTime = `${formattedHours}:${formattedMinutes}`;

  return { formattedTime, hours, minutes };
};

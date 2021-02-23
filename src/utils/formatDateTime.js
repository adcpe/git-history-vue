const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function formatTime(num) {
  return num <= 9 ? `0${num}` : `${num}`;
}

export function formatDate(datetime) {
  const newDateTime = Date.parse(datetime);
  const offset = new Date(newDateTime).getTimezoneOffset() * 60 * 1000;
  const clientDate = new Date(newDateTime - offset);

  const dmy = `${
    months[clientDate.getUTCMonth()]
  } ${clientDate.getUTCDate()}, ${clientDate.getUTCFullYear()}`;

  const time = `${formatTime(clientDate.getUTCHours())}:${formatTime(
    clientDate.getUTCMinutes()
  )}`;

  return `${dmy} at ${time}`;
}

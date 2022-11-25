export function formatDate(date) {
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
    'Dec'
  ]
  const newDate = Date.parse(date)
  const offset = new Date(newDate).getTimezoneOffset() * 60 * 1000
  const clientDate = new Date(newDate - offset)

  const mdy = `${
    months[clientDate.getUTCMonth()]
  } ${clientDate.getUTCDate()}, ${clientDate.getUTCFullYear()}`

  const time = `${formatTime(clientDate.getUTCHours())}:${formatTime(clientDate.getUTCMinutes())}`

  return `${mdy} at ${time}`
}

export function trimSHA(sha) {
  return sha.slice(0, 7)
}

function formatTime(num) {
  return num <= 9 ? `0${num}` : `${num}`
}

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function dateDb(date) {
  date.setHours(date.getHours() - 3);
  return (
    date.getUTCFullYear() +
    "-" +
    ("00" + (date.getUTCMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getUTCDate()).slice(-2) +
    " " +
    ("00" + date.getUTCHours()).slice(-2) +
    ":" +
    ("00" + date.getUTCMinutes()).slice(-2) +
    ":" +
    ("00" + date.getUTCSeconds()).slice(-2)
  );
}

module.exports = { randomInteger, dateDb };

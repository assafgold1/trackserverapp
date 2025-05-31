const axios = require('axios');

// תוכל להשתמש גם ב-GPS אמיתי אם יש
async function getIPLocation() {
  const res = await axios.get('http://ip-api.com/json');
  return { latitude: res.data.lat, longitude: res.data.lon };
}

async function sendLocation() {
  const location = await getIPLocation();
  await axios.post('http://localhost:3000/update-location', location);
  console.log("Sent location:", location);
}

setInterval(sendLocation, 10000); // כל 10 שניות
sendLocation();

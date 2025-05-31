// server.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = 3000;

app.use(express.json());

// רשימת מיקומים בשמירה בזיכרון (אפשר לשפר לשמירה בבסיס נתונים)
let locations = [];

// מקבל עדכוני מיקום
app.post('/update-location', (req, res) => {
  const { latitude, longitude } = req.body;
  console.log('📍 Received location:', latitude, longitude);
  if (typeof latitude === 'number' && typeof longitude === 'number') {
    // שומר מיקום עם זמן
    locations.push({ latitude, longitude, timestamp: Date.now() });
    // שומר רק את 100 המיקומים האחרונים (למנוע זיכרון עודף)
    if (locations.length > 100) locations.shift();
    res.sendStatus(200);
  } else {
    res.status(400).send('Invalid location data');
  }
});


// מחזיר את המיקומים לשידור בלייב
app.get('/locations', (req, res) => {
  res.json(locations);
});

// משרת את דף המפה
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

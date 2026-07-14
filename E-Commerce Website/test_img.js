const https = require('https');
https.get('https://fdn2.gsmarena.com/vv/bigpic/oneplus-12.jpg', (res) => {
  console.log(res.statusCode);
});

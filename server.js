const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')))

app.get('/bitcoin', (req, res) => {
  axios.get('https://api.coindesk.com/v1/bpi/historical/close.json').then(( { data: { bpi } }) => {
    const bpiKeys = Object.keys(bpi);
    const rangeData = { 
      labels: bpiKeys, 
      datasets: [{ 
        label:'Price in USD', 
        data: [], 
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1, 
        lineTension: 0,
      }], 
    };
    for (let i = 0; i < bpiKeys.length; i++) {
      rangeData.datasets[0].data.push(bpi[bpiKeys[i]]);
    }
    res.send(rangeData);
  }).catch((err) => {
    console.log(err);
  });
});

app.listen(port, () => console.log(`Listening on port:${port}`));


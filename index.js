// jshint esversion:6

let app = require('./config/express.js')();

app.listen(3000, () => {
    console.log('Payfast rodando');
});

app.get('/', (req, res) => {
    res.send('PayFast Okkkk');
});

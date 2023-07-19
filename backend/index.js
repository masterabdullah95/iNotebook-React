const express = require('express')
const app = express()
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const getConnect = require('./db')

getConnect();

app.use(express.json());

app.use('/api/auth', require('./routes/Auth'));
app.use('/api/notes', require('./routes/Notes'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
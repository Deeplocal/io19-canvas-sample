const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(morgan('combined'));

app.use(express.static('dist'));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`App listenting on port: ${PORT}`);
});

const express = require('express');
const app = express();

// body parser middleware
app.use(express.json());

//routes
app.use('/', require('./routes/routes'));

const PORT = 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

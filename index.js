const express = require('express');  //use require on server side, import on front end 

const app = express();

app.get('/', (req, res) => {
    res.send({Hi: 'there'});
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up!`);
  });
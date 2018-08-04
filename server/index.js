const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./router');
const request = require('request');

const proxy = express();
const port = 8000;

proxy.use(bodyParser.json());
proxy.use(bodyParser.urlencoded({extended: true}));

proxy.use(express.static(path.join(__dirname, '../')));

// proxy.use('/api', router)


proxy.use('/api/simexp', (req, res)=> {
    request(`http://localhost:3001/api/simexp?starRating=5`, function(error, response, body) {
        if(response.statusCode === 200) {
            res.status(200).send(body);
        }
    })
})

proxy.use('/sidebar/:experience', (req, res)=>{
    request(`http://localhost:3000/sidebar/${req.params.experience}`, (error, response, body)=>{
      if(response.statusCode === 200){
        res.status(200).send(body);
      }
    })
})


proxy.use('/events', (req, res)=> {
    request(`http://localhost:3002/events`, (error, response, body)=> {
        res.status(200).send(body);
    })
})


proxy.use('/api/data/all', (req, res) => {
    request('http://localhost:3004/api/data/all', (error, response, body) => {
      if(!error) {
        console.log('bundle 3004 recieved')
        res.status(200).send(body)
      }
    })
})
  
proxy.use('/api/data', (req, res) => {
    request('http://localhost:3004/api/data', (error, response, body) => {
      if(!error) {
        console.log('bundle 3004 recieved')
        res.status(200).send(body)
      }
    })
})


proxy.listen(port, ()=>{
    console.log('Server is running on port ', port);
})
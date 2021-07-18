const express = require('express');
const app = express();
const path = require('path');
let puerto = 3030;

app.use(express.static('public'));

app.get('', (req,res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req,res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/cart', (req,res) => res.sendFile(path.join(__dirname, 'views', 'productCart.html')));
app.get('/detalle-de-producto', (req,res) => res.sendFile(path.join(__dirname, 'views', 'productDetail.html')));
app.get('/register', (req,res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));

app.listen(puerto, () => console.log('Servidor corriendo en http://localhost:' + puerto));
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./user/user.routes');
const caseStudyRoutes = require('./caseStudy/caseStudy.routes');

const app = express();
const PORT = 3000; 

app.use(express.static('public'));
//app.use(express.static(path.join(__dirname, '../dashboard/build')));
app.use(cors({
    origin: ['https://ventdecide.com.br', 'https://www.ventdecide.com.br'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do VentDecide está funcionando! 🎉');
});

app.use('/api/user', userRoutes);
app.use('/api/caseStudy', caseStudyRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
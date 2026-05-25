require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./user/user.routes');
const caseStudyRoutes = require('./caseStudy/caseStudy.routes');

const app = express();
const PORT = 3000; 

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../dashboard/build')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do VentDecide está funcionando! 🎉');
});

app.use('/api/user', userRoutes);
app.use('/api/caseStudy', caseStudyRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
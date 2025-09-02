const express = require('express');
const userRoutes = require('./user/user.routes');

const app = express();
const PORT = 3000; 

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API do VentDecide está funcionando! 🎉');
});

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
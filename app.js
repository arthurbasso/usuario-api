const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');

app.use(express.json());

app.use('/api', usuarioRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
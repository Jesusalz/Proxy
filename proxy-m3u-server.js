const express = require('express');
const axios = require('axios'); // Importa axios
const app = express();
const PORT = process.env.PORT || 3000;

// Configura CORS si es necesario
const cors = require('cors');
app.use(cors());  // Permite solicitudes desde otros orígenes

// Proxy para servir el archivo M3U
app.get('/proxy-m3u', async (req, res) => {
    try {
        const response = await axios.get('https://pastebin.com/iXGT1u1s');
        const m3uContent = response.data;
        res.set('Content-Type', 'text/plain');  // Cambiado a text/plain
        res.send(m3uContent);
    } catch (error) {
        console.error('Error al obtener el archivo M3U:', error);
        
        // Si hay respuesta del servidor, imprime el código de estado
        if (error.response) {
            console.error('Respuesta del servidor:', error.response.status);
        }
        
        res.status(500).send('Error al obtener el archivo M3U');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de proxy corriendo en http://localhost:${PORT}`);
});

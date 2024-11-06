const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy para servir el archivo M3U
app.get('/proxy-m3u', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'playlist.m3u'); // Asegúrate de que 'playlist.m3u' esté en la misma carpeta que tu archivo proxy-m3u-server.js
        const m3uContent = fs.readFileSync(filePath, 'utf8');

        // Puedes modificar el contenido del archivo M3U aquí si lo deseas
        res.set('Content-Type', 'text/plain');

        res.send(m3uContent);
    } catch (error) {
        res.status(500).send('Error al obtener el archivo M3U');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de proxy corriendo en http://localhost:${PORT}`);
});

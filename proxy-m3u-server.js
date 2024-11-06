const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Ruta al archivo M3U local (opcional)
const localM3UPath = path.join(__dirname, 'playlist.m3u');

// Proxy para obtener el archivo M3U, ya sea local o remoto
app.get('/proxy-m3u', async (req, res) => {
    try {
        let m3uContent;

        if (fs.existsSync(localM3UPath)) {
            // Leer el archivo M3U desde el sistema de archivos local si existe
            m3uContent = fs.readFileSync(localM3UPath, 'utf-8');
        } else {
            // Opción para cargar el archivo M3U de una URL remota
            const response = await axios.get('URL_DE_TU_ARCHIVO_M3U_REMOTO');
            m3uContent = response.data;
        }

        // Manipulación opcional: reescribir URLs dentro del archivo M3U
        m3uContent = m3uContent.replace(/http:\/\/old-url\.com/g, 'http://new-url.com'); // Ejemplo de reescritura

        // Configurar el tipo de contenido y enviar el archivo M3U manipulado
        res.set('Content-Type', 'application/vnd.apple.mpegurl');
        res.send(m3uContent);
    } catch (error) {
        console.error('Error al obtener el archivo M3U:', error);
        res.status(500).send('Error al obtener el archivo M3U');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor de proxy corriendo en http://localhost:${PORT}`);
});

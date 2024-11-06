const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Proxy para servir el archivo M3U
app.get('/proxy-m3u', async (req, res) => {
    try {
        const response = await axios.get('URL_DE_TU_ARCHIVO_M3U');
        const m3uContent = response.data;
        // Puedes modificar `m3uContent` aquí, si deseas reescribir URLs o encriptar
        res.set('Content-Type', 'text/plain');  // Cambiado a text/plain
        res.send(m3uContent);
    } catch (error) {
        res.status(500).send('Error al obtener el archivo M3U');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor de proxy corriendo en http://localhost:${PORT}`);
});

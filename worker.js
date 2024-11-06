addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = 'https://pastebin.com/iXGT1u1s'; // Aquí la URL de tu archivo M3U
  
    try {
      const m3uContent = await fetch(url).then(res => res.text());
      return new Response(m3uContent, { headers: { 'Content-Type': 'text/plain' } });
    } catch (error) {
      return new Response('Error al obtener el archivo M3U', { status: 500 });
    }
  }
  
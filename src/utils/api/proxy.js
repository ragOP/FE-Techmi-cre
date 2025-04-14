// /api/proxy.js

export default async function handler(req, res) {
    const url = 'http://your-http-backend.com' + req.url.replace('/api/proxy', '');
  
    try {
      const apiRes = await fetch(url, {
        method: req.method,
        headers: {
          'Content-Type': req.headers['content-type'] || 'application/json',
          // Pass other headers if needed
        },
        body: req.method !== 'GET' ? req.body : undefined,
      });
  
      const data = await apiRes.text(); // or .json() if API always returns JSON
      res.status(apiRes.status).send(data);
    } catch (err) {
      res.status(500).json({ error: 'Proxy Error', message: err.message });
    }
  }
  
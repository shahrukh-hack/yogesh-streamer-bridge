const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 7000;
const UPSTREAM_RESOLVER = process.env.UPSTREAM_RESOLVER || 'https://cncverse.dpdns.org';
const BRAND_LOGO = 'https://raw.githubusercontent.com/shahrukh-hack/yogesh-streamer/master/assets/logos/cinematic_gold_logo_1787579512053.jpg';

const MANIFEST = {
    id: 'org.yogeshstreamer.addon',
    version: '1.0.0',
    name: 'Yogesh Streamer',
    description: 'Official Multi-Device Addon for Movies, Web Series, Bollywood & Live Sports',
    logo: BRAND_LOGO,
    background: BRAND_LOGO,
    resources: ['stream', 'catalog', 'meta'],
    types: ['movie', 'series', 'tv'],
    idPrefixes: ['tt', 'cnc_'],
    catalogs: [
        {
            type: 'movie',
            id: 'yogesh_movies',
            name: '🌟 Yogesh Streamer Movies',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: ['Bollywood', 'Hindi Dubbed', 'Hollywood', 'South Hindi', 'Action', 'Comedy']
                },
                { name: 'search', isRequired: false },
                { name: 'skip', isRequired: false }
            ]
        },
        {
            type: 'series',
            id: 'yogesh_series',
            name: '📺 Yogesh Streamer Series',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: ['Hindi Web Series', 'Netflix Hits', 'Prime Specials', 'Action', 'Drama']
                },
                { name: 'search', isRequired: false },
                { name: 'skip', isRequired: false }
            ]
        },
        {
            type: 'tv',
            id: 'yogesh_sports',
            name: '⚡ Yogesh Streamer Live Sports',
            extra: [
                {
                    name: 'genre',
                    isRequired: false,
                    options: ['🏏 Cricket', '⚽ Football', '🏎️ F1', '🥊 UFC', '🤼 WWE']
                },
                { name: 'search', isRequired: false },
                { name: 'skip', isRequired: false }
            ]
        }
    ],
    behaviorHints: {
        configurable: false,
        adult: false
    }
};

function fetchJson(targetUrl) {
    return new Promise((resolve, reject) => {
        const parsed = url.parse(targetUrl);
        const client = parsed.protocol === 'https:' ? https : http;

        const req = client.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            },
            timeout: 15000
        }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchJson(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`Upstream returned HTTP ${res.statusCode}`));
            }
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.on('timeout', () => {
            req.destroy();
            reject(new Error('Request timeout'));
        });
    });
}

function setCorsHeaders(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
}

function renderLandingHtml(host) {
    const protocol = host.includes('localhost') || host.includes('127.0.0.1') ? 'http' : 'https';
    const manifestUrl = `${protocol}://${host}/manifest.json`;
    const stremioProtocolUrl = `stremio://${host}/manifest.json`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yogesh Streamer • Multi-Device Addon</title>
    <link rel="icon" href="${BRAND_LOGO}">
    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background: linear-gradient(135deg, #0f0c1b 0%, #000000 100%);
            color: #ffffff;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 24px;
        }
        .card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 215, 0, 0.25);
            box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.1);
            border-radius: 20px;
            max-width: 620px;
            width: 100%;
            padding: 36px;
            text-align: center;
            backdrop-filter: blur(12px);
        }
        .logo-img {
            width: 96px;
            height: 96px;
            border-radius: 20px;
            object-fit: cover;
            border: 2px solid #FFD700;
            box-shadow: 0 0 16px rgba(255, 215, 0, 0.4);
            margin-bottom: 20px;
        }
        h1 {
            font-size: 28px;
            font-weight: 800;
            background: linear-gradient(90deg, #FFD700, #FFA500);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 8px;
        }
        p.subtitle {
            color: #b0b0b0;
            font-size: 15px;
            margin-bottom: 24px;
            line-height: 1.5;
        }
        .status-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(34, 197, 94, 0.15);
            border: 1px solid #22c55e;
            color: #4ade80;
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 28px;
        }
        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 8px #22c55e;
        }
        .btn-group {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 30px;
        }
        .btn-primary {
            background: linear-gradient(135deg, #FFD700 0%, #D4AF37 100%);
            color: #000000;
            font-weight: 700;
            font-size: 16px;
            padding: 14px 24px;
            border-radius: 12px;
            text-decoration: none;
            display: inline-block;
            transition: transform 0.2s, box-shadow 0.2s;
            border: none;
            cursor: pointer;
        }
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(255, 215, 0, 0.4);
        }
        .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: #ffffff;
            font-weight: 600;
            font-size: 14px;
            padding: 12px 20px;
            border-radius: 12px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            cursor: pointer;
            transition: background 0.2s;
        }
        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.18);
        }
        .guide {
            text-align: left;
            background: rgba(0, 0, 0, 0.35);
            border-radius: 14px;
            padding: 18px 20px;
            margin-top: 10px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }
        .guide h3 {
            font-size: 15px;
            color: #FFD700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .guide ol {
            padding-left: 20px;
            font-size: 13px;
            color: #cccccc;
            line-height: 1.7;
        }
        .code-box {
            background: #111;
            padding: 8px 12px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 12px;
            color: #FFD700;
            word-break: break-all;
            margin-top: 8px;
            border: 1px dashed rgba(255, 215, 0, 0.4);
        }
    </style>
</head>
<body>
    <div class="card">
        <img class="logo-img" src="${BRAND_LOGO}" alt="Yogesh Streamer Logo">
        <h1>Yogesh Streamer</h1>
        <p class="subtitle">Official Multi-Device Addon for iPhone, iPad, Mac, Windows & Smart TVs.</p>
        
        <div class="status-badge">
            <span class="status-dot"></span> 24/7 Cloud Bridge Active
        </div>

        <div class="btn-group">
            <a class="btn-primary" href="${stremioProtocolUrl}">🚀 Install Addon to Stremio</a>
            <button class="btn-secondary" onclick="navigator.clipboard.writeText('${manifestUrl}'); alert('Copied Manifest URL to Clipboard!')">📋 Copy Addon Manifest URL</button>
        </div>

        <div class="guide">
            <h3>📱 Quick iOS (iPhone/iPad) Setup</h3>
            <ol>
                <li>Install <b>Outplayer</b> or <b>VLC</b> from the App Store.</li>
                <li>Open Safari, visit <b>web.stremio.com</b>, and tap <b>Add to Home Screen</b>.</li>
                <li>Go to Stremio Addons, paste this URL, and tap Install:</li>
            </ol>
            <div class="code-box">${manifestUrl}</div>
        </div>
    </div>
</body>
</html>`;
}

const server = http.createServer(async (req, res) => {
    setCorsHeaders(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname || '/';
    const host = req.headers.host || `localhost:${PORT}`;

    // Root landing page
    if (pathname === '/' || pathname === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(renderLandingHtml(host));
        return;
    }

    // Health check
    if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', service: 'yogesh-streamer-bridge' }));
        return;
    }

    // Stremio Addon Manifest
    if (pathname === '/manifest.json') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(MANIFEST, null, 2));
        return;
    }

    // Stream resolver route: /stream/:type/:id.json
    if (pathname.startsWith('/stream/')) {
        const parts = pathname.replace('/stream/', '').replace('.json', '').split('/');
        const type = parts[0];
        const id = parts[1];

        if (!type || !id) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ streams: [] }));
            return;
        }

        try {
            const upstreamUrl = `${UPSTREAM_RESOLVER}/stream/${encodeURIComponent(type)}/${encodeURIComponent(id)}.json`;
            const data = await fetchJson(upstreamUrl);

            let streams = Array.isArray(data?.streams) ? data.streams : [];

            // Apply Luxury Yogesh Streamer Branding to all stream results
            const brandedStreams = streams.map(stream => {
                let name = stream.name || 'Yogesh Streamer';
                // Replace any upstream provider or third-party bridge badges
                name = name.replace(/•?\s*CNCVerse Bridge/gi, '• Yogesh Streamer');
                if (!name.includes('Yogesh Streamer')) {
                    name = `🌟 [Yogesh Streamer] ${name}`;
                }

                let title = stream.title || '';
                title = title.replace(/CNCVerse Bridge/gi, 'Yogesh Streamer');

                return {
                    ...stream,
                    name,
                    title
                };
            });

            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ streams: brandedStreams }));
        } catch (err) {
            console.error(`Error resolving streams for ${type}/${id}:`, err.message);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ streams: [] }));
        }
        return;
    }

    // Catalog route: /catalog/:type/:id.json
    if (pathname.startsWith('/catalog/')) {
        try {
            const upstreamUrl = `${UPSTREAM_RESOLVER}${pathname}`;
            const data = await fetchJson(upstreamUrl);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        } catch (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ metas: [] }));
        }
        return;
    }

    // Meta route: /meta/:type/:id.json
    if (pathname.startsWith('/meta/')) {
        try {
            const upstreamUrl = `${UPSTREAM_RESOLVER}${pathname}`;
            const data = await fetchJson(upstreamUrl);
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify(data));
        } catch (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ meta: null }));
        }
        return;
    }

    // Default 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🌟 Yogesh Streamer Multi-Device Bridge Online!`);
    console.log(`📡 Listening on http://localhost:${PORT}`);
    console.log(`📋 Manifest URL: http://localhost:${PORT}/manifest.json`);
    console.log(`====================================================`);
});

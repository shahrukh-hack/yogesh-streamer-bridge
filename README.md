# Yogesh Streamer Multi-Device Bridge 🚀

Official Stremio Addon & multi-device streaming bridge for **Yogesh Streamer**. Enables streaming Movies, Web Series, and Live Sports on **iPhone, iPad (iOS), Mac, Windows PC, and Smart TVs**.

---

## ✨ Features

- 🌟 **100% Branded Experience**: Native Yogesh Streamer addon manifest, gold monogram logo, and branded video streams.
- 📱 **Full iOS & Apple Support**: Connects seamlessly with Stremio Web and Outplayer on iPhone / iPad.
- ⚡ **Zero-Dependency Core**: Pure Node.js engine with zero heavy runtime packages. Starts in milliseconds with minimal RAM footprint.
- 🌐 **Universal Stremio Protocol**: Implements Stremio Addon Protocol v3 for direct playback across Windows, macOS, Linux, and Android.
- ☁️ **Cloud-Ready**: Ready for 1-click free hosting on Render, Railway, or Docker.

---

## 🚀 Quick Start (Local Run)

```bash
# Clone the repository
git clone https://github.com/shahrukh-hack/yogesh-streamer-bridge.git
cd yogesh-streamer-bridge

# Run the server (Requires Node.js 18+)
node server.js
```

The bridge will be live at:
* 🌐 **Landing Page:** `http://localhost:7000/`
* 📋 **Stremio Manifest URL:** `http://localhost:7000/manifest.json`

---

## ☁️ 24/7 Free Cloud Deployment (Render / Railway)

### Deploy on Render (Free 24/7 Web Service):
1. Create a free account at [render.com](https://render.com).
2. Click **New +** ➔ **Web Service** ➔ Connect your GitHub repository (`yogesh-streamer-bridge`).
3. Set **Runtime** to `Node`.
4. Set **Start Command** to `node server.js`.
5. Click **Create Web Service**.
6. Render will assign you a live public URL (e.g. `https://yogesh-streamer-bridge.onrender.com`).
7. Your public Stremio manifest is now live at:
   `https://yogesh-streamer-bridge.onrender.com/manifest.json`

---

## 📱 How iOS (iPhone & iPad) Users Connect

1. Install **Outplayer** or **VLC** from the App Store.
2. Open Safari on iPhone and visit **`https://web.stremio.com`**.
3. Tap **Share** ➔ **Add to Home Screen**.
4. In Stremio Settings ➔ Streaming ➔ Set **"Play in external player"** to **Outplayer**.
5. Go to Stremio Addons, paste your live bridge URL (`https://your-domain/manifest.json`), and tap **Install**!

---

## 📄 License

MIT License. Designed for Yogesh Streamer ecosystem.

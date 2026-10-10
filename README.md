# 🌟 Yogesh Streamer • Multi-Device Cinema Bridge & Standalone Web App

<div align="center">

![Yogesh Streamer Logo](https://raw.githubusercontent.com/shahrukh-hack/yogesh-streamer/master/assets/logos/cinematic_gold_logo_1787579512053.jpg)

### Luxury Cross-Platform Streaming Hub for Movies, Web Series, 24/7 Live TV & Sports 🎬

[![Node.js](https://img.shields.io/badge/Node.js-18%2B%20%7C%2020%2B-339933.svg?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![PWA](https://img.shields.io/badge/PWA-iOS%20%7C%20Android%20%7C%20Desktop-5A0FC8.svg?style=for-the-badge&logo=pwa)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
[![Smart TV](https://img.shields.io/badge/Smart%20TV-Samsung%20Tizen%20%7C%20Toshiba%20VIDAA%20%7C%20LG-FFD700.svg?style=for-the-badge)](https://github.com/shahrukh-hack/yogesh-streamer-bridge)
[![Security](https://img.shields.io/badge/Access-6--Digit%20PIN%20Protected-00E5FF.svg?style=for-the-badge&logo=shield)](https://github.com/shahrukh-hack/yogesh-streamer-bridge)

---

### 🌐 [Launch Live Web App](https://yogesh-streamer-bridge.onrender.com/app) • 📥 [Download Native Android APK (v1.4.2)](https://github.com/shahrukh-hack/yogesh-streamer-multiplatform/releases/download/v1.4.2/YogeshStreamer-v1.4.2.apk)
#### 📺 Smart TV Quick Link: `tinyurl.com/y-stream-tv` • 📱 APK Direct Link: `tinyurl.com/y-streamer-apk`
#### 📋 [Stremio Addon Manifest](https://yogesh-streamer-bridge.onrender.com/manifest.json)

</div>

---

## 📖 Overview

**Yogesh Streamer Bridge** is a complete, lightweight cloud streaming gateway and standalone cinema web application. It delivers a unified, high-performance streaming experience across **mobile devices, desktop computers, Smart TVs (Samsung Tizen, Toshiba VIDAA, LG webOS, Android TV), and Stremio clients**.

### Dual-Architecture Engine:
1. **Standalone Cinema Web App (`/app`)**:
   A standalone OTT streaming portal built with HTML5, CSS3, and JavaScript. Runs directly in any web browser without requiring Stremio or third-party apps. Features a Netflix & Amazon Prime style user interface with HLS streaming, full catalog grids, and family PIN security.
2. **Universal Addon Protocol (`/manifest.json`)**:
   Implements the Stremio Addon Protocol v3 for native playback integration on iOS (via Outplayer/VLC), macOS, Windows, Linux, and Android.

---

## ✨ Key Features

### 🔒 6-Digit Family Security PIN Protection
- **Private Access Control**: Protects the streaming portal with a 6-digit access code so only you and your family can open it.
- **TV Remote Support**: Direct input using physical remote number keys (`0`–`9`), D-Pad directional navigation, and on-screen keypad.
- **Desktop & Mobile Support**: Supports typing numbers on physical keyboards, touch keypad on smartphones, and mouse clicks.
- **Auto-Unlock & Session Memory**: Automatically validates once all 6 digits are typed and securely persists the session in `localStorage`.
- **1-Click Lock**: Integrated quick-lock button in the top navigation header allows locking the session with one click anytime.

### 🎬 Netflix & Amazon Prime Style UI / UX
- **Hero Billboard Showcase**: Dynamic billboard featuring high-definition backdrops, movie descriptions, and 1-tap playback.
- **18-Title Rails with "Explore All"**: Curated horizontal carousels with smooth touch-swipe physics and clean Hollywood titles (stripped of raw scene technical tags).
- **Full Collection Grid ("See All")**: Tapping "See All" opens a full-screen catalog viewer displaying the entire collection (100+ titles) with responsive 3-column (mobile) or 6-column (desktop/TV) grid layout.
- **Direct Stream Selector**: Interactive quality selector (4K UHD, 1080p, 720p, Multi-Audio) with instant player launch.

### 📺 Universal Smart TV Engine
- **Spatial 2D Remote Navigation**: Full arrow-key (`Up`, `Down`, `Left`, `Right`, `Enter`, `Return`) navigation engine designed for **Samsung Tizen**, **Toshiba VIDAA**, **LG webOS**, and **Android TV**.
- **TV Back Button Mapping**: Hardware return keys (Tizen `10009`, Android `27`, VIDAA `VK_BACK`) mapped to smoothly close modals and cinema players.

### ⚡ 24/7 Live TV & Sports Hub
- **Live Cricket & Sports**: Direct HLS streams for international matches and premier sports coverage.
- **National & Regional TV**: 24/7 news, music, and entertainment channels with built-in HLS engine.

### 🚀 Zero-Dependency, Ultra-Lightweight Core
- Built entirely on native Node.js APIs (`http`, `https`, `url`, `fs`, `path`).
- Consumes only **40 MB – 70 MB RAM** and **< 3% CPU**.
- Video streams are resolved and streamed directly via client HLS — **zero server-side transcoding** needed.

---

## 🔑 Security PIN Setup & Configuration

| Parameter | Environment Variable | Default Value | Description |
| :--- | :--- | :--- | :--- |
| **Security PIN** | `APP_PIN` | *Configured by host* | Secret 6-digit access code required to open the app |
| **Port** | `PORT` | `7000` (or `10000` on Render) | HTTP server port |
| **Upstream** | `UPSTREAM_RESOLVER` | Configured Cloud Resolver | Upstream metadata and stream provider |

### How to Configure Your Secret 6-Digit PIN:
* **On cPanel**: In **Setup Node.js App**, under **Environment Variables**, add `APP_PIN` = `your_secret_6_digit_pin`.
* **On Render**: In your dashboard, go to the **Environment** tab and add `APP_PIN` = `your_secret_6_digit_pin`.
* **Locally / VPS**: Pass `APP_PIN` in your environment or launch command: `APP_PIN=your_secret_pin node server.js`.

---

## 🌐 Deployment Options

### Method 1: Deploy on cPanel (Recommended for 24/7 Zero Cold Starts)

Deploying on cPanel via CloudLinux Phusion Passenger provides **permanent 24/7 uptime with zero sleep delays** on your own custom domain.

1. **Log in to cPanel** and navigate to **Software ➔ Setup Node.js App**.
2. Click **Create Application**:
   * **Node.js version**: Choose `18.x` or `20.x`.
   * **Application mode**: `Production`.
   * **Application root**: `streamer` (or your chosen directory).
   * **Application URL**: `tv.yourdomain.com` or `yourdomain.com/stream`.
   * **Application startup file**: `server.js`.
3. **Upload Application Files**:
   * Use cPanel File Manager or FTP to upload `server.js`, `app.html`, and `package.json` into your application root folder.
4. **Configure Environment Variables**:
   * Add `APP_PIN` with your secret 6-digit code.
5. **Start Application**:
   * Click **Run NPM Install**, then click **Start Application**.
   * Your portal is now permanently live at `https://tv.yourdomain.com/app`.

---

### Method 2: Deploy on Render (Free Cloud Web Service)

1. Fork or clone this repository to your GitHub account.
2. Go to [render.com](https://render.com) and create a free account.
3. Click **New + ➔ Web Service** and link your GitHub repository.
4. Settings:
   * **Environment**: `Node`
   * **Build Command**: *(leave blank)*
   * **Start Command**: `node server.js`
   * **Plan**: `Free`
5. Under **Environment Variables**, add:
   * `PORT` = `10000`
   * `APP_PIN` = `your_secret_6_digit_pin`
6. Click **Deploy Web Service**.

> [!NOTE]
> Render free tier web services spin down after 15 minutes of inactivity. The first request after sleep takes 45–60 seconds to wake up. For instant loading, hosting on cPanel or a VPS is recommended.

---

### Method 3: Run Locally or on a VPS (PM2 / Docker)

```bash
# 1. Clone the repository
git clone https://github.com/shahrukh-hack/yogesh-streamer-bridge.git
cd yogesh-streamer-bridge

# 2. Run with Node.js
APP_PIN=your_secret_6_digit_pin PORT=7000 node server.js

# Or run persistently with PM2:
npm install -g pm2
APP_PIN=your_secret_6_digit_pin PORT=7000 pm2 start server.js --name "yogesh-streamer"
```

---

## 📱 Multi-Device Setup Guide

### 📱 iPhone & iPad (iOS Safari PWA)
1. Open Safari on iPhone or iPad and go to `https://your-domain/app`.
2. Enter your 6-digit PIN.
3. Tap the Safari **Share** icon (square with upward arrow).
4. Tap **"Add to Home Screen"**.
5. Launch from your home screen as a full-screen, native-feeling app!

### 📺 Smart TVs (Samsung Tizen, Toshiba VIDAA, LG webOS)
1. Open the built-in Web Browser on your Smart TV.
2. Visit `https://your-domain/app`.
3. Enter your 6-digit PIN using the remote number keys or D-Pad.
4. Press the TV remote **Star / Bookmark** button to save it to your TV home screen.
5. Use your TV remote arrows to navigate rails and press **OK** to play.

### 💻 Stremio App (Windows, Mac, Android, Linux)
1. Open Stremio on your device.
2. Go to **Addons ➔ Community Addons**.
3. Paste your live bridge manifest URL:
   `https://your-domain/manifest.json`
4. Click **Install**. All curated catalogs and streams will be ready in Stremio Discover.

---

## 📡 API Endpoints Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/app` | `GET` | Standalone luxury cinema web application (PWA) |
| `/manifest.json` | `GET` | Stremio Addon Protocol v3 manifest |
| `/api/auth/pin` | `POST` | Validates 6-digit security PIN and returns session token |
| `/catalog/:type/:id.json`| `GET` | Resolves categorized catalog rows (Movies, Series, etc.) |
| `/stream/:type/:id.json` | `GET` | Resolves playback streams for movies, series, and live sports |
| `/meta/:type/:id.json` | `GET` | Detailed metadata and synopsis |
| `/health` | `GET` | Service status health check |

---

## 📄 License

MIT License. Designed and maintained for the **Yogesh Streamer** ecosystem.

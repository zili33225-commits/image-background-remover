# Image Background Remover 🖼️

Remove background from images using AI. Built with Next.js and Remove.bg API.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)

## ✨ Features

- 📁 Drag & drop image upload
- 🔄 Automatic background removal
- 🖥️ Real-time preview
- ⬇️ One-click download
- 📱 Responsive design

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **API**: Remove.bg
- **Deployment**: Cloudflare Pages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zili33225-commits/image-background-remover.git
cd image-background-remover

# Install dependencies
npm install

# Configure environment variables
# Get your API key from https://www.remove.bg/dashboard
cp .env.local.example .env.local
# Edit .env.local and add your REMOVE_BG_API_KEY
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `REMOVE_BG_API_KEY` | Your Remove.bg API key |

### Get API Key

1. Visit [remove.bg/dashboard](https://www.remove.bg/dashboard)
2. Sign up/Login
3. Copy your API key
4. Add it to `.env.local`

## 💰 Pricing

- **Free**: 50 requests/month
- **Paid**: $0.019/request (~¥0.14)

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ using Next.js and Remove.bg
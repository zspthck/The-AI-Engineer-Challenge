# 🟢 Matrix Terminal Frontend

A Matrix-style terminal interface for the AI Mental Coach application. This Next.js frontend provides a retro terminal aesthetic with green-on-black styling, perfect for a cyberpunk vibe while maintaining excellent readability and UX.

## 🎨 Features

- **Matrix Terminal Aesthetic**: Green text on black background with monospace font
- **Real-time Chat**: Connect to the FastAPI backend for AI-powered mental coaching
- **Responsive Design**: Adapts gracefully to different screen sizes
- **Smooth Scrolling**: Auto-scrolls to latest messages
- **Error Handling**: Clear error messages if backend connection fails
- **Accessible**: High contrast (green on black) for excellent readability

## 📋 Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Backend server running on `http://localhost:8000` (or configure `NEXT_PUBLIC_API_URL`)

## 🚀 Local Development

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure API URL (Optional)

By default, the frontend connects to `http://localhost:8000`. If your backend runs on a different URL, create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 4. Start the Backend

Make sure your FastAPI backend is running (from the project root):

```bash
# Set your OpenAI API key
$env:OPENAI_API_KEY = "sk-your-key-here"

# Start the backend
uv run uvicorn api.index:app --reload
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🚢 Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. **IMPORTANT - Set Root Directory:**
   - During import, or in **Settings** → **General** → **Root Directory**
   - Set it to: `frontend`
   - This tells Vercel where your Next.js app is located
4. Vercel will automatically detect Next.js and configure the build
4. **IMPORTANT:** Add the `OPENAI_API_KEY` environment variable in Vercel:
   - Go to your project settings in Vercel
   - Navigate to **Settings** → **Environment Variables**
   - Add a new variable:
     - **Name:** `OPENAI_API_KEY`
     - **Value:** Your OpenAI API key (starts with `sk-`)
     - **Environment:** Production, Preview, and Development (select all)
   - Click **Save**
5. Deploy!

**Note:** The backend is now integrated as Vercel serverless functions in `/app/api/chat/route.ts`, so you don't need a separate backend deployment. The `OPENAI_API_KEY` environment variable is required for the chat functionality to work.

The frontend is designed to work seamlessly with Vercel's deployment platform.

## 🎮 Usage

1. Open `http://localhost:3000` in your browser
2. Type your message in the terminal input at the bottom
3. Press **ENTER** to send
4. Wait for the AI coach's response (displayed in green)
5. Continue the conversation!

## 🛠️ Tech Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling (via inline styles for Matrix aesthetic)
- **React Hooks**: Modern React patterns

## 📝 Notes

- The terminal uses a monospace font (`Courier New`) for authentic terminal feel
- Messages are timestamped for reference
- The interface auto-focuses the input field for quick typing
- Error messages appear if the backend is unreachable

## 🐛 Troubleshooting

**Frontend can't connect to backend:**
- Ensure the backend is running on port 8000
- Check that CORS is enabled in the backend (it should be with `allow_origins=["*"]`)
- Verify `NEXT_PUBLIC_API_URL` if you set a custom URL

**Styling looks off:**
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Ensure you're using a modern browser that supports CSS Grid/Flexbox

**Build errors:**
- Run `npm install` again to ensure all dependencies are installed
- Check Node.js version (should be 18+)

**500 Error on `/api/chat` endpoint:**
- **Most common cause:** `OPENAI_API_KEY` environment variable is not set in Vercel
  - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
  - Add `OPENAI_API_KEY` with your OpenAI API key value
  - Make sure to select all environments (Production, Preview, Development)
  - **Important:** After adding the variable, you must redeploy for it to take effect
  - You can trigger a redeploy by going to Deployments → Click the three dots on latest deployment → Redeploy
- Check Vercel function logs: Go to your deployment → Functions tab → Click on `/api/chat` → View logs
- Verify your OpenAI API key is valid and has credits/quota available
- Check that the `openai` package is installed: `npm install` in the frontend directory

---

**Enjoy your Matrix-style AI coaching experience! 🟢**

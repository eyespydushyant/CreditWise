# Deployment Guide

To share your CreditWise application with others, you need to deploy it to the internet. Since this is a **Full Stack** application (Frontend + Backend), you need to deploy both parts.

## 🚀 Quickest Way: Temporary Sharing (Dev Only)

If you just want to show the **User Interface** (Frontend) to a friend quickly, you can use `localtunnel`.
*Note: The backend API (predictions) might not work for them unless you also tunnel the backend.*

1.  Open a new terminal.
2.  Run: `npx localtunnel --port 5173`
3.  Copy the URL it gives you (e.g., `https://floppy-cat-34.loca.lt`) and send it to your friend.

---

## 🌍 Permanent Deployment (Recommended)

For a fully working application that anyone can use anytime, follow these steps.

### Part 1: Deploy Backend (Flask) to Render

1.  **Push your code to GitHub**.
    *   Create a new repository on GitHub.
    *   Push your project code to it.
2.  **Sign up/Login to [Render.com](https://render.com/)**.
3.  **Create a New Web Service**.
    *   Connect your GitHub repository.
    *   **Root Directory**: `backend`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `gunicorn app:app`
4.  **Copy your Backend URL**.
    *   Once deployed, Render will give you a URL (e.g., `https://creditwise-backend.onrender.com`).
    *   **Important**: You need to update your Frontend to use this URL instead of `http://localhost:5000`.

### Part 2: Connect Frontend to Backend

1.  Open `frontend/src/pages/Predict.jsx` (and `Account.jsx`).
2.  Replace `http://localhost:5000` with your **Render Backend URL**.
    *   *Tip: Use an environment variable like `import.meta.env.VITE_API_URL` for better practice.*
3.  Commit and push these changes to GitHub.

### Part 3: Deploy Frontend (React) to Vercel

1.  **Sign up/Login to [Vercel.com](https://vercel.com/)**.
2.  **Add New Project**.
    *   Import your GitHub repository.
3.  **Configure Project**.
    *   **Framework Preset**: Vite
    *   **Root Directory**: `frontend`
4.  **Deploy**.
    *   Click "Deploy". Vercel will build your site and give you a live URL (e.g., `https://creditwise.vercel.app`).

### 🎉 Done!
Now you can share your **Vercel URL** with anyone, and they can use the app to check their loan eligibility!

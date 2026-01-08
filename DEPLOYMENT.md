# 🚀 Easy Deployment Guide for InterIIT Scoreboard (Railway)

This guide explains how to deploy both the **Backend** and **Frontend** using [Railway.app](https://railway.app/).

---

## 🏗️ Step 1: Project Setup on Railway
1. **GitHub**: Ensure your code is pushed to a GitHub repository.
2. **New Project**: Go to Railway, click **"New Project"** -> **"Deploy from GitHub repo"**.
3. **Select Repo**: Choose your repository.
4. **Root Directory**: When asked, or in settings later, you will need to create **two services** from this same repo.

---

## 🧠 Step 2: Deploy the Backend
1. In your Railway project, select the service for your repo.
2. **Settings**: Set the **"Root Directory"** to `Scoreboard-backend`.
3. **Variables**: Add the following:
   - `DATABASE_URL`: (Click "Add Service" -> "MongoDB" in Railway to get this automatically, or use your MongoDB Atlas link).
   - `JWT_SECRET`: Any random long string.
   - `PORT`: `5000`
4. **Networking**: Click **"Generate Domain"** to get your Public API URL (e.g., `https://api-prod.up.railway.app`). **Copy this.**

---

## 📺 Step 3: Deploy the Frontend
1. Click **"New"** -> **"GitHub Repo"** again in the same project.
2. Select the **same repository** as before.
3. **Settings**: Set the **"Root Directory"** to `Scoreboard-Frontend`.
4. **Variables**: Add:
   - `REACT_APP_API_ORIGIN`: Paste the **Backend URL** you copied in Step 2.
5. **Networking**: Click **"Generate Domain"**. This will be your main website URL.

---

## 📂 Step 4: MongoDB (Built-in)
Instead of using external MongoDB Atlas, you can stay entirely inside Railway:
1. Click **"New"** -> **"Database"** -> **"Add MongoDB"**.
2. Railway will add a MongoDB instance to your project.
3. Go to your **Backend Service** -> **Variables**.
4. Click **"New Variable"** -> **"Variable Reference"** and select `MONGODB_URL` from the list. Rename it to `DATABASE_URL` if needed.

---

## ⚠️ Important Note on Routing
In `Scoreboard-Frontend/package.json`, there is a `"homepage": "..."` field. 
- If you are deploying to a domain that is **NOT** `scoreboard.interiit.in`, you should **delete** that line or change it to your Railway URL before pushing to GitHub. Otherwise, the styles and routing might break.

---

## ✅ Deployment Summary
- **Backend**: Processes logic, connects to DB, and sends live scores via Sockets.
- **Frontend**: Downloads to the user's browser and talks to the Backend URL you provided.
- **Auto-Update**: Every time you `git push`, Railway will automatically rebuild and redeploy your changes!

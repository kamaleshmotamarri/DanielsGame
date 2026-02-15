# ChronoQuest Integration Plan

This document outlines the technical roadmap for adding user authentication and persistent cloud storage to ChronoQuest.

## 🎯 Objectives
- **Persistent Progress**: Allow users to save their current level, scores, and best times.
- **Community Levels**: Enable saving and retrieving custom levels created in the Level Builder.
- **Cross-Device Play**: Access game state from any browser by logging in.

---

## 🔐 Authentication: Clerk
We will integrate **Clerk** to handle user identities securely without building a custom auth system.

### Integration Steps:
1. **SDK Setup**: Initialize the Clerk JS SDK in `index.html`.
2. **Auth UI**: Add a premium "Sign In" button to the main menu using Clerk's pre-built components.
3. **Session State**: Hook Clerk's `user` object into `js/state.js` to conditionally enable cloud-saving features.
4. **JWT Verification**: Use Clerk's session tokens to authenticate API requests to MongoDB.

---

## 💾 Database: MongoDB
**MongoDB Atlas** will serve as our flexible, NoSQL cloud database.

### Proposed Data Models:

#### 1. User Profile (`users`)
```json
{
  "clerkId": "user_2P6...",
  "username": "ChronosMaster",
  "gameData": {
    "currentLevel": 4,
    "totalScore": 1250,
    "unlockedSkins": ["neon_pulse", "time_ghost"],
    "records": {
      "level_1_time": 42.5
    }
  },
  "settings": {
    "volume": 0.8,
    "screenShake": true
  }
}
```

#### 2. Custom Levels (`levels`)
```json
{
  "levelId": "lv_...",
  "authorId": "user_2P6...",
  "title": "Quantum Leap",
  "difficulty": "Master",
  "layout": {
    "platforms": [...],
    "enemies": [...],
    "spawn": { "x": 100, "y": 200 }
  },
  "stats": {
    "plays": 0,
    "completions": 0
  }
}
```

---

## 🌉 The API Bridge
To keep your API keys hidden and the database secure, we will implement a lean backend layer.

### Preferred Technical Stack:
- **Framework**: Next.js (using API Routes) or a simple Express.js server.
- **Database Driver**: `mongoose` or the official MongoDB Node.js driver.
- **Security**: Clerk Middleware to protect "Save" and "Delete" endpoints.

---

## 🛠 Implementation Roadmap
1. **Environment Setup**: Define `CLERK_PUBLISHABLE_KEY` and `MONGODB_URI`.
2. **Auth Integration**: Replace local storage logic with Clerk session checks.
3. **CRUD Operations**: Build endpoints for:
   - `GET /api/user/progress` - Fetch cloud save.
   - `POST /api/user/save` - Push current state to MongoDB.
   - `POST /api/levels/create` - Save a new level from the builder.
   - `GET /api/levels` - List community levels.
4. **UI Polishing**: Add "Syncing..." and "Saved to Cloud" toast notifications.

---

> [!IMPORTANT]
> **Awaiting API Keys**: Once Clerk and MongoDB credentials are provided, we will begin the environment setup and SDK initialization.

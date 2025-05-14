-- Database schema for PromptForge

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prompts table
CREATE TABLE IF NOT EXISTS prompts (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    original TEXT NOT NULL,
    beginner TEXT,
    intermediate TEXT,
    advanced TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    public BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    prompt_id TEXT NOT NULL,
    user_id TEXT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (prompt_id) REFERENCES prompts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Likes table
CREATE TABLE IF NOT EXISTS likes (
    id TEXT PRIMARY KEY,
    prompt_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(prompt_id, user_id),
    FOREIGN KEY (prompt_id) REFERENCES prompts(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- For anonymous users (sessions)
CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# PromptForge

A collaborative platform for enhancing AI prompts and improving prompt engineering skills.

![PromptForge Banner](https://via.placeholder.com/1200x300/4F46E5/FFFFFF?text=PromptForge)

## Overview

PromptForge is a web application designed to help users transform simple ideas into powerful, structured prompts for AI systems. Whether you're a beginner or an expert in prompt engineering, PromptForge provides tools to enhance your prompts at different complexity levels:

- **Beginner**: Basic structure with improved clarity and context
- **Intermediate**: Comprehensive prompts with detailed instructions, examples, and formatting guidance
- **Expert**: Advanced prompts with sophisticated techniques like chain-of-thought reasoning, multi-step instructions, and quality criteria

## Features

### Core Functionality

- **Prompt Enhancement**: Transform simple ideas into three tiers of prompts (Beginner, Intermediate, Expert)
- **Prompt Storage**: Save and organize your enhanced prompts
- **User Authentication**: Register and login to access your personal prompt collection
- **Anonymous Sessions**: Use the application without registration with session-based storage

### Community Features

- **Public Gallery**: Browse prompts created by other users
- **Social Interaction**: Like and comment on prompts
- **Collaboration**: Fork prompts to create your own versions
- **Categories**: Organize prompts by topic or use case

### Technical Features

- **Modern UI**: Clean, responsive interface built with React and TailwindCSS
- **API Integration**: Connects with OpenRouter for AI processing
- **Database Storage**: SQLite database for persistent storage
- **Session Management**: JWT-based authentication and anonymous sessions

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: SQLite
- **AI Integration**: OpenRouter API

## Installation

### Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenRouter API key ([Get one here](https://openrouter.ai))

### Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/5at4am/Prompt-Forge.git
cd Prompt-Forge
```

2. **Install dependencies**

```bash
# Install server dependencies
cd prop/server
npm install

# Install client dependencies
cd ../client
npm install
```

3. **Configure environment variables**

Create a `.env` file in the server directory:

```
# Server configuration
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:5173

# JWT Secret
JWT_SECRET=your_jwt_secret_key_change_in_production

# OpenRouter API
OPENROUTER_API_KEY=your_openrouter_api_key
```

4. **Initialize the database**

```bash
cd ../server
npm run init-db
```

5. **Start the development servers**

```bash
# Start the server (from the server directory)
npm run dev

# Start the client (from the client directory)
cd ../client
npm run dev
```

6. **Access the application**

Open your browser and navigate to `http://localhost:5173`

## Usage

### Enhancing a Prompt

1. Enter a simple prompt idea in the input field (e.g., "Write about climate change")
2. Click the "Enhance Prompt" button
3. View the three enhanced versions (Beginner, Intermediate, Expert)
4. Save the prompt to your collection if desired

### Managing Prompts

1. Click "Show History" to view your saved prompts
2. Click on a saved prompt to load it
3. Delete prompts you no longer need

### Using the Gallery (When Implemented)

1. Navigate to the Gallery section
2. Browse prompts created by the community
3. Filter by category, popularity, or recency
4. Like, comment, or fork interesting prompts

## Project Structure

```
prop/
├── client/             # Frontend React application
│   ├── public/         # Static files
│   └── src/            # Source code
│       ├── components/ # React components
│       ├── context/    # React contexts
│       ├── pages/      # Page components
│       └── services/   # API services
│
└── server/             # Backend Node.js application
    ├── controllers/    # Request handlers
    ├── database/       # Database setup and schema
    ├── middleware/     # Express middleware
    ├── models/         # Data models
    ├── routes/         # API routes
    └── services/       # Business logic
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login a user
- `GET /api/users/profile` - Get current user profile

### Prompts
- `POST /api/prompts/enhance` - Enhance a prompt
- `POST /api/prompts/save` - Save a prompt
- `GET /api/prompts` - Get all prompts
- `GET /api/prompts/:id` - Get a specific prompt
- `DELETE /api/prompts/:id` - Delete a prompt

### Interactions (When Implemented)
- `POST /api/interactions/comments` - Add a comment
- `GET /api/interactions/comments/:prompt_id` - Get comments for a prompt
- `POST /api/interactions/likes/:prompt_id` - Like a prompt
- `DELETE /api/interactions/likes/:prompt_id` - Unlike a prompt

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [OpenRouter](https://openrouter.ai) for providing the AI API
- [React](https://reactjs.org) and [Node.js](https://nodejs.org) communities
- All contributors who have helped shape PromptForge

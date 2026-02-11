# Yuno Miles Coder - System Architecture & Features Documentation

## Overview
Yuno Miles Coder is a chaotic, meme-style code explanation and generation tool that combines cloud and local AI models to provide humorous and entertaining code reviews and generation. The system uses a hybrid approach, leveraging both cloud-based models (like Google Gemini) and local models (like Ollama) to create unique, personality-driven code interactions.

## Project Structure

```
yuno-miles-coder/
├── app/                    # Main application modules
│   ├── cache.py           # Response caching mechanism
│   ├── cli.py             # Command-line interface
│   ├── cloud_explain.py   # Cloud-based neutral code explanations
│   ├── engine.py          # Core processing engine
│   ├── formatter.py       # Text formatting utilities
│   ├── generator.py       # Code generation functionality
│   ├── llm.py             # LLM API abstraction layer
│   ├── local_style.py     # Local style transformation
│   ├── pack_loader.py     # Snippet pack loader
│   ├── persona.py         # Personality system
│   ├── redact.py          # API key redaction
│   ├── server.py          # FastAPI web server
│   └── snippets_db.py     # Snippet database management
├── web/                   # Current web interface (to be replaced)
│   ├── src/
│   │   ├── App.jsx        # Main React component
│   │   ├── index.css      # Styling
│   │   └── main.jsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── ...
├── examples/              # Example code files
├── README.md              # Project overview
├── pyproject.toml         # Python project configuration
└── requirements.txt       # Python dependencies
```

## Core Components

### 1. Engine (`app/engine.py`)
The central processing unit that orchestrates the code review/roast pipeline:
- Implements three operational modes: `hybrid`, `local`, `cloud`
- Manages caching with SHA256-based keys
- Coordinates the hybrid approach: neutral explanation + style transformation
- Handles snippet integration and tagging

### 2. LLM Abstraction (`app/llm.py`)
Provides a unified interface to multiple LLM providers:
- Google Gemini API
- Ollama local models
- OpenAI-compatible APIs
- Automatic provider detection based on base URL
- Error handling and API key redaction

### 3. Personality System (`app/persona.py`)
Manages different "personas" that give the application its unique character:
- Multiple predefined personalities (e.g., `yuno_miles`, `chaotic_microblog`, `kanye_twitter`)
- Dynamic system prompt generation
- Configurable "spice" levels (intensity 1-5)

### 4. Web Server (`app/server.py`)
FastAPI-based REST API serving as the backend for the web interface:
- `/api/personas` - Get available personas
- `/api/review` - Submit code for review/roasting
- `/api/generate` - Generate code based on prompts
- `/health` - Health check endpoint
- CORS middleware for frontend development

### 5. Code Generation (`app/generator.py`)
Handles creative code generation and refactoring:
- Specialized system prompts for creative tasks
- Supports code creation, refactoring, and general responses
- Maintains personality consistency across generations

## Operational Modes

### Hybrid Mode (Default)
1. **Cloud Neutral Explanation**: Sends code to cloud model for neutral explanation
2. **Tagging & Snippet Integration**: Identifies code patterns (loops, I/O, error handling) and retrieves relevant snippets
3. **Local Style Transformation**: Applies personality and style using local model
4. **Result**: Combines neutral explanation with chaotic personality overlay

### Local Mode
- Direct interaction with local LLM (Ollama)
- Full personality applied from start
- Faster but potentially less accurate explanations

### Cloud Mode
- Direct interaction with cloud LLM
- Full personality applied from start
- More accurate explanations but with cloud dependency

## Key Features

### 1. Code Roasting
- Humorous, meme-style code explanations
- Personality-driven commentary
- Configurable intensity levels

### 2. Code Generation
- Create new code from prompts
- Refactor existing code with personality
- General creative responses

### 3. Multiple Personas
- `yuno_miles`: Chaotic, meme-focused
- `chaotic_microblog`: Social media style commentary
- `kanye_twitter`: Opinionated, stream-of-consciousness
- Extensible system for adding new personas

### 4. Snippet Database
- Personality-specific joke snippets
- Tag-based retrieval system
- Pack-based distribution (`.ymcpack` format)

### 5. Caching System
- SHA256-based caching to avoid repeated processing
- Input parameters included in cache key (persona, spice, code, mode)

### 6. Bleep Filter
- Optional content filtering
- Configurable via environment variables

## API Endpoints

### GET `/api/personas`
Returns list of available personas

### POST `/api/review`
- Request body: `{ "code": "string", "persona": "string", "spice": "number" }`
- Response: `{ "result": "string" }`
- Reviews/parses submitted code with selected persona

### POST `/api/generate`
- Request body: `{ "prompt": "string", "persona": "string", "spice": "number" }`
- Response: `{ "result": "string" }`
- Generates code or responds to prompt with selected persona

### GET `/health`
Returns system status and operational mode

## Environment Configuration

### Hybrid Mode (Default)
```env
CLOUD_API_KEY=your_gemini_api_key
CLOUD_MODEL=gemini-1.5-flash
LOCAL_BASE_URL=http://127.0.0.1:11434
LOCAL_MODEL=qwen2:7b
MODE=hybrid  # optional, default
```

### Local Only Mode
```env
LOCAL_BASE_URL=http://127.0.0.1:11434
LOCAL_MODEL=qwen2:7b
MODE=local
```

### Cloud Only Mode
```env
CLOUD_API_KEY=your_cloud_api_key
CLOUD_MODEL=your_model
MODE=cloud
```

## CLI Usage

### Code Review
```bash
python -m app.cli examples/hello.py
cat examples/hello.py | python -m app.cli
```

### Custom Persona & Spice Level
```bash
python -m app.cli examples/hello.py --persona yuno_miles --spice 5
```

## Current Web Interface (to be replaced)

The current web interface is built with:
- React 18
- Tailwind CSS
- Vite build system
- Framer Motion for animations
- React Markdown for content rendering
- Syntax highlighting for code blocks

Features:
- Dual mode: "ROAST" (code review) and "COOK" (code generation)
- Persona selection dropdown
- Spice level slider (1-5)
- Real-time output with markdown rendering
- Animated loading states
- Responsive design

## Technical Dependencies

### Backend
- FastAPI: Web framework
- Uvicorn: ASGI server
- Requests: HTTP client
- PyArrow: Data processing
- Python-dotenv: Environment variable management

### Frontend (Current)
- React: UI framework
- Axios: HTTP client
- React Markdown: Content rendering
- Syntax Highlighter: Code formatting
- Lucide React: Icons
- Framer Motion: Animations

## Design Considerations for New Web Interface

### Desired Improvements
1. **Enhanced User Experience**: More intuitive workflow and better visual feedback
2. **Advanced Editing**: Better code editor with syntax highlighting
3. **History & Favorites**: Save and revisit previous roasts/generations
4. **Collaboration Features**: Share interesting code roasts with others
5. **Performance Optimization**: Better loading states and caching
6. **Accessibility**: Improved accessibility compliance
7. **Mobile Responsiveness**: Optimized mobile experience
8. **Customization**: More granular control over output style

### Architecture Recommendations
1. **Modern React Framework**: Consider Next.js for improved performance and SEO
2. **State Management**: Redux Toolkit or Zustand for complex state
3. **UI Library**: Consider shadcn/ui or similar for consistent components
4. **Code Editor**: Monaco Editor or CodeMirror for advanced editing
5. **Real-time Features**: WebSocket support for streaming responses
6. **Authentication**: User accounts for saving history and preferences
7. **Analytics**: Usage tracking while respecting privacy

### Visual Design Direction
1. **Branding**: Maintain the chaotic, fun brand identity
2. **Color Scheme**: Keep vibrant colors (especially yellow accents) but improve contrast
3. **Animations**: Subtle, purposeful animations that enhance UX
4. **Typography**: Clear hierarchy with personality-appropriate fonts
5. **Layout**: Flexible grid system supporting various screen sizes
6. **Icons & Illustrations**: Consistent iconography that matches the brand

This documentation provides a foundation for designing a new web interface that maintains the core functionality while improving the user experience and adding new features.
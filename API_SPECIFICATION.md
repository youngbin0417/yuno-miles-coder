# Yuno Miles Coder - API Specification

## Overview
The Yuno Miles Coder API provides endpoints for code explanation, generation, and personality management. The API follows REST principles and returns JSON responses.

## Base URL
The API is served from the `/api` route of the server. When using the development proxy, requests to `/api/*` are forwarded to the backend server.

## Authentication
The API does not require authentication for standard operations. However, the underlying LLM services require proper API keys configured in the server environment.

## Common Headers
- `Content-Type: application/json` - Required for POST requests

## Endpoints

### GET /api/personas
Retrieve a list of available personas that can be used for code explanations and generation.

#### Request
```
GET /api/personas
```

#### Response
```json
{
  "personas": [
    "yuno_miles",
    "chaotic_microblog",
    "kanye_twitter",
    "other_persona"
  ]
}
```

#### Response Codes
- `200 OK` - Successfully retrieved the list of personas
- `500 Internal Server Error` - Server error occurred

---

### POST /api/review
Submit code for review and receive a humorous explanation in the style of the selected persona.

#### Request
```json
{
  "code": "string",
  "persona": "string",
  "spice": "integer"
}
```

##### Request Body Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| code | string | Yes | - | The source code to be reviewed |
| persona | string | No | "chaotic_microblog" | The personality to use for the review |
| spice | integer | No | 4 | Intensity level of the personality (1-5) |

#### Response
```json
{
  "result": "string"
}
```

##### Response Fields
| Field | Type | Description |
|-------|------|-------------|
| result | string | The humorous code explanation/review in the selected persona's style |

#### Response Codes
- `200 OK` - Successfully processed the code review
- `422 Unprocessable Entity` - Invalid request parameters
- `500 Internal Server Error` - Server error occurred during processing

---

### POST /api/generate
Generate code based on a prompt in the style of the selected persona.

#### Request
```json
{
  "prompt": "string",
  "persona": "string",
  "spice": "integer"
}
```

##### Request Body Parameters
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| prompt | string | Yes | - | The prompt or description for code generation |
| persona | string | No | "chaotic_microblog" | The personality to use for the generation |
| spice | integer | No | 4 | Intensity level of the personality (1-5) |

#### Response
```json
{
  "result": "string"
}
```

##### Response Fields
| Field | Type | Description |
|-------|------|-------------|
| result | string | The generated code or response in the selected persona's style |

#### Response Codes
- `200 OK` - Successfully generated the code/response
- `422 Unprocessable Entity` - Invalid request parameters
- `500 Internal Server Error` - Server error occurred during processing

---

### GET /health
Check the health status of the API server.

#### Request
```
GET /health
```

#### Response
```json
{
  "status": "ok",
  "mode": "string"
}
```

##### Response Fields
| Field | Type | Description |
|-------|------|-------------|
| status | string | Health status indicator ("ok" when healthy) |
| mode | string | Current operational mode ("hybrid", "local", or "cloud") |

#### Response Codes
- `200 OK` - Server is healthy
- `500 Internal Server Error` - Server is unhealthy

## Error Handling

When an error occurs, the API returns an appropriate HTTP status code and an error message in the response body. For server-side errors, the response typically follows this format:

```json
{
  "detail": "Error message describing what went wrong"
}
```

## Operational Modes

The API operates in different modes based on server configuration:

### Hybrid Mode (Default)
- Combines cloud-based neutral explanation with local personality transformation
- Provides accurate explanations with distinctive personality
- Requires both cloud and local model configurations

### Local Mode
- Uses only local LLM (e.g., Ollama)
- Faster response times
- Requires local model configuration

### Cloud Mode
- Uses only cloud-based LLM (e.g., Gemini, OpenAI)
- Potentially more accurate explanations
- Requires cloud API key configuration

## Configuration

The API behavior depends on environment variables configured in the server:

- `MODE`: Operation mode ("hybrid", "local", "cloud")
- `CLOUD_API_KEY`: API key for cloud services
- `CLOUD_MODEL`: Model name for cloud service
- `LOCAL_BASE_URL`: URL for local LLM service
- `LOCAL_MODEL`: Model name for local service
- `PERSONA`: Default persona to use
- `BLEEP`: Enable/disable content filtering

## Example Usage

### Using curl to review code:

```bash
curl -X POST http://localhost:8000/api/review \
  -H "Content-Type: application/json" \
  -d '{
    "code": "print(\"Hello, World!\")",
    "persona": "yuno_miles",
    "spice": 5
  }'
```

### Using JavaScript/axios to generate code:

```javascript
const response = await axios.post('/api/generate', {
  prompt: 'Create a function that adds two numbers',
  persona: 'chaotic_microblog',
  spice: 3
});

console.log(response.data.result);
```

## CORS Policy

The API server includes CORS middleware allowing requests from all origins, which is suitable for development but should be restricted in production environments.
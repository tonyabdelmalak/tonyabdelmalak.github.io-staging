// API client for communicating with backend API

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`);
  if (!response.ok) {
    throw new Error('Health check failed');
  }
  return response.json();
}

export { API_BASE };

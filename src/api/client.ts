
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
}

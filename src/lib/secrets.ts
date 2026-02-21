/**
 * Secrets management utilities
 * Replaces Airo SDK with standard environment variable access
 */

/**
 * Get a secret value from environment variables
 * 
 * @param secretName - Name of the secret to retrieve
 * @returns Secret value if found, null otherwise
 * 
 * @example
 * ```typescript
 * const apiKey = getSecret('GROQ_API_KEY');
 * if (apiKey) {
 *   console.log('API Key found');
 * }
 * ```
 */
export function getSecret(secretName: string): string | null {
  // Check process.env (Node.js environment)
  if (typeof process !== 'undefined' && process.env && process.env[secretName]) {
    return process.env[secretName] as string;
  }
  
  // Check import.meta.env (Vite environment)
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[secretName]) {
    return import.meta.env[secretName] as string;
  }
  
  return null;
}

/**
 * List all available secret names
 * 
 * @returns Array of secret names
 */
export function listSecretNames(): string[] {
  const secrets: string[] = [];
  
  // Get from process.env
  if (typeof process !== 'undefined' && process.env) {
    secrets.push(...Object.keys(process.env));
  }
  
  // Get from import.meta.env
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    secrets.push(...Object.keys(import.meta.env));
  }
  
  // Remove duplicates and sort
  return [...new Set(secrets)].sort();
}

import { User, Role } from '../types';

// --- MOCK DATABASE ---
// In a real application, this data would be stored securely in a database like Supabase.
// We are using a mock list here for demonstration purposes.
const mockUsers: Record<string, { password: string; role: Role }> = {
  'user@example.com': { password: 'password', role: 'user' },
  'admin@example.com': { password: 'password', role: 'admin' },
};
// --- END MOCK DATABASE ---

/**
 * Simulates a login API call.
 * In a real-world scenario, this function would make a `fetch` request to a backend endpoint.
 * The backend would then query the Supabase database to verify the user's credentials.
 * NEVER store passwords or sensitive credentials on the client-side.
 */
export const login = (email: string, password: string, role: Role): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      const userRecord = mockUsers[email.toLowerCase()];
      if (userRecord && userRecord.password === password && userRecord.role === role) {
        console.log(`Simulating successful login for ${email} as ${role}`);
        resolve({ email: email.toLowerCase(), role });
      } else {
        console.log(`Simulating failed login attempt for ${email}`);
        reject(new Error('Invalid email or password.'));
      }
    }, 1000);
  });
};

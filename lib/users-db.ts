// Mock Local User Database for Testing
// In a real scenario, this would be Supabase or another DB.

import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'local-users-db.json');

export function getUsers() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  }
  const data = fs.readFileSync(DB_PATH, 'utf8');
  return JSON.parse(data);
}

export function saveUsers(users: any[]) {
  fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
}

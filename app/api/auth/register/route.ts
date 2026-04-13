import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { getUsers, saveUsers } from '@/lib/users-db';

export async function POST(request: Request) {
  try {
    const { full_name, email, password } = await request.json();

    // 1. Basic Validation
    if (!full_name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Load Local Users
    const users = getUsers();

    // 3. Check if email already exists
    if (users.find((u: any) => u.email === email)) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Store User Locally
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      full_name,
      email,
      password_hash: hashedPassword,
      created_at: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const { password_hash, ...userWithoutPassword } = newUser;
    return NextResponse.json(
      { message: 'User registered successfully', user: userWithoutPassword },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}

import { type NextRequest, NextResponse } from "next/server"

// In-memory user storage (in production, use a real database)
const users: Array<{
  id: string
  name: string
  email: string
  password: string
}> = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = users.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })
    }

    // Create new user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // In production, hash the password!
    }

    users.push(newUser)

    // Generate a simple token (in production, use JWT)
    const token = btoa(`${newUser.id}:${newUser.email}:${Date.now()}`)

    return NextResponse.json(
      {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

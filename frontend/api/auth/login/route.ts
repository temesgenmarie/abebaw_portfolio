import { type NextRequest, NextResponse } from "next/server"

// Mock user database (same as signup route)
const users = [
  {
    id: "1",
    name: "Demo User",
    email: "demo@example.com",
    password: "demo123",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user
    const user = users.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 })
    }

    // Generate a simple token (in production, use JWT)
    const token = btoa(`${user.id}:${user.email}:${Date.now()}`)

    return NextResponse.json(
      {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        token,
      },
      { status: 200 },
    )
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

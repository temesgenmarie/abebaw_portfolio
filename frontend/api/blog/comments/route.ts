import { type NextRequest, NextResponse } from "next/server"

// In-memory comments storage
const comments: Array<{
  id: string
  postId: string
  userId: string
  userName: string
  text: string
  createdAt: string
}> = []

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ message: "postId is required" }, { status: 400 })
  }

  const postComments = comments.filter((c) => c.postId === postId)

  return NextResponse.json({ comments: postComments })
}

export async function POST(request: NextRequest) {
  try {
    const { postId, userId, userName, text } = await request.json()

    // Validation
    if (!postId || !userId || !userName || !text) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (text.trim().length === 0) {
      return NextResponse.json({ message: "Comment cannot be empty" }, { status: 400 })
    }

    // Create new comment
    const newComment = {
      id: String(comments.length + 1),
      postId,
      userId,
      userName,
      text,
      createdAt: new Date().toISOString(),
    }

    comments.push(newComment)

    return NextResponse.json(newComment, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

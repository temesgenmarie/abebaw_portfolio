import { type NextRequest, NextResponse } from "next/server"

// In-memory likes storage
let likes: Array<{
  id: string
  postId: string
  userId: string
}> = []

export async function GET(request: NextRequest) {
  const postId = request.nextUrl.searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ message: "postId is required" }, { status: 400 })
  }

  const postLikes = likes.filter((l) => l.postId === postId)
  const likeCount = postLikes.length

  return NextResponse.json({ likeCount, likes: postLikes })
}

export async function POST(request: NextRequest) {
  try {
    const { postId, userId } = await request.json()

    if (!postId || !userId) {
      return NextResponse.json({ message: "postId and userId are required" }, { status: 400 })
    }

    // Check if user already liked this post
    const existingLike = likes.find((l) => l.postId === postId && l.userId === userId)

    if (existingLike) {
      // Remove like (unlike)
      likes = likes.filter((l) => !(l.postId === postId && l.userId === userId))
      return NextResponse.json({ liked: false, likeCount: likes.filter((l) => l.postId === postId).length })
    } else {
      // Add like
      const newLike = {
        id: String(likes.length + 1),
        postId,
        userId,
      }
      likes.push(newLike)
      return NextResponse.json({ liked: true, likeCount: likes.filter((l) => l.postId === postId).length })
    }
  } catch (error: any) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

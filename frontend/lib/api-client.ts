const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://abebaw.onrender.com/api"

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
}

export interface User {
  id?: string
  _id?: string
  name: string
  email: string
  role?: string
  profileImage?: string
  bio?: string
}

export interface Comment {
  _id: string
  userId: User
  text: string
  createdAt: string
}

export interface Post {
  _id: string
  title: string
  content: string
  image?: string
  category: string
  userId: User
  likes: string[]
  comments: Comment[]
  createdAt: string
  updatedAt: string
}

// Auth API calls
export const authAPI = {
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Signup failed")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Signup error:", error)
      throw error
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Login failed")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Login error:", error)
      throw error
    }
  },

  getCurrentUser: async (token: string): Promise<User> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch current user")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Get current user error:", error)
      throw error
    }
  },
}

// Post API calls
export const postAPI = {
  getPosts: async (): Promise<Post[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts`)

      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Get posts error:", error)
      throw error
    }
  },

  getPost: async (id: string): Promise<Post> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch post")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Get post error:", error)
      throw error
    }
  },

  createPost: async (
    title: string,
    content: string,
    category: string,
    image: File | null,
    token: string,
  ): Promise<Post> => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("category", category)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to create post")
      }

      return (await response.json()).post
    } catch (error) {
      console.error("[v0] Create post error:", error)
      throw error
    }
  },

  updatePost: async (
    id: string,
    title: string,
    content: string,
    category: string,
    image: File | null,
    token: string,
  ): Promise<Post> => {
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("category", category)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to update post")
      }

      return (await response.json()).post
    } catch (error) {
      console.error("[v0] Update post error:", error)
      throw error
    }
  },

  deletePost: async (id: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to delete post")
      }
    } catch (error) {
      console.error("[v0] Delete post error:", error)
      throw error
    }
  },
}

// Comment API calls
export const commentAPI = {
  addComment: async (postId: string, text: string, token: string): Promise<Post> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to add comment")
      }

      return (await response.json()).post
    } catch (error) {
      console.error("[v0] Add comment error:", error)
      throw error
    }
  },

  deleteComment: async (postId: string, commentId: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/comments/${postId}/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to delete comment")
      }
    } catch (error) {
      console.error("[v0] Delete comment error:", error)
      throw error
    }
  },
}

// Like API calls
export const likeAPI = {
  toggleLike: async (postId: string, token: string): Promise<{ likes: number; isLiked: boolean }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/${postId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to toggle like")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Toggle like error:", error)
      throw error
    }
  },

  getLikes: async (postId: string): Promise<{ likes: number; likedBy: string[] }> => {
    try {
      const response = await fetch(`${API_BASE_URL}/likes/${postId}`)

      if (!response.ok) {
        throw new Error("Failed to fetch likes")
      }

      return response.json()
    } catch (error) {
      console.error("[v0] Get likes error:", error)
      throw error
    }
  },
}

// Contact API calls
export const contactAPI = {
  sendMessage: async (name: string, email: string, subject: string, message: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to send message")
      }
    } catch (error) {
      console.error("[v0] Send message error:", error)
      throw error
    }
  },

  getMessages: async (token: string): Promise<any[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch messages")
      }

      const data = await response.json()
      return Array.isArray(data) ? data : data.messages || []
    } catch (error) {
      console.error("[v0] Get messages error:", error)
      throw error
    }
  },

  deleteMessage: async (messageId: string, token: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/contact/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!response.ok) {
        throw new Error("Failed to delete message")
      }
    } catch (error) {
      console.error("[v0] Delete message error:", error)
      throw error
    }
  },
}

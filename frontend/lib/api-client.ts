const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export interface AuthResponse {
  message: string
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface User {
  id: string
  name: string
  email: string
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
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
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
  },

  getCurrentUser: async (token: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch current user")
    }

    return response.json()
  },
}

// Post API calls
export const postAPI = {
  getPosts: async (): Promise<Post[]> => {
    const response = await fetch(`${API_BASE_URL}/posts`)

    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }

    return response.json()
  },

  getPost: async (id: string): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)

    if (!response.ok) {
      throw new Error("Failed to fetch post")
    }

    return response.json()
  },

  createPost: async (
    title: string,
    content: string,
    category: string,
    image: File | null,
    token: string,
  ): Promise<Post> => {
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
  },

  updatePost: async (
    id: string,
    title: string,
    content: string,
    category: string,
    image: File | null,
    token: string,
  ): Promise<Post> => {
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
  },

  deletePost: async (id: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete post")
    }
  },
}

// Comment API calls
export const commentAPI = {
  addComment: async (postId: string, text: string, token: string): Promise<Post> => {
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
  },

  deleteComment: async (postId: string, commentId: string, token: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/comments/${postId}/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to delete comment")
    }
  },
}

// Like API calls
export const likeAPI = {
  toggleLike: async (postId: string, token: string): Promise<{ likes: number; isLiked: boolean }> => {
    const response = await fetch(`${API_BASE_URL}/likes/${postId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Failed to toggle like")
    }

    return response.json()
  },

  getLikes: async (postId: string): Promise<{ likes: number; likedBy: string[] }> => {
    const response = await fetch(`${API_BASE_URL}/likes/${postId}`)

    if (!response.ok) {
      throw new Error("Failed to fetch likes")
    }

    return response.json()
  },
}

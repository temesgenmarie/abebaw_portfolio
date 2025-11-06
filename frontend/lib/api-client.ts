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

const fetchWithRetry = async (url: string, options?: RequestInit, retries = 1): Promise<Response> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })
    return response
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return fetchWithRetry(url, options, retries - 1)
    }
    throw error
  }
}

const fetchWithErrorHandling = async (url: string, options?: RequestInit) => {
  try {
    const response = await fetchWithRetry(url, options, 2)

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage = errorData.error || errorData.message || errorMessage
      } catch {
        errorMessage = response.statusText || errorMessage
      }
      throw new Error(errorMessage)
    }

    return response
  } catch (error) {
    throw error
  }
}

// Auth API calls
export const authAPI = {
  signup: async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      const url = `${API_BASE_URL}/auth/signup`

      const response = await fetchWithErrorHandling(url, {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const url = `${API_BASE_URL}/auth/login`

      const response = await fetchWithErrorHandling(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  },

  getCurrentUser: async (token: string): Promise<User> => {
    try {
      const url = `${API_BASE_URL}/auth/me`
      const response = await fetchWithErrorHandling(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      return response.json()
    } catch (error) {
      throw error
    }
  },
}

// Post API calls
export const postAPI = {
  getPosts: async (): Promise<Post[]> => {
    try {
      const url = `${API_BASE_URL}/posts`

      const response = await fetchWithErrorHandling(url)
      const data = await response.json()
      return Array.isArray(data) ? data : data.posts || data.data || []
    } catch (error) {
      return []
    }
  },

  getPost: async (id: string): Promise<Post> => {
    try {
      const url = `${API_BASE_URL}/posts/${id}`
      const response = await fetchWithErrorHandling(url)
      return response.json()
    } catch (error) {
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
      const url = `${API_BASE_URL}/posts`

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("category", category)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data || data.post
    } catch (error) {
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
      const url = `${API_BASE_URL}/posts/${id}`

      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("category", category)
      if (image) {
        formData.append("image", image)
      }

      const response = await fetch(url, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorData.message || errorMessage
        } catch {
          errorMessage = response.statusText || errorMessage
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      return data || data.post
    } catch (error) {
      throw error
    }
  },

  deletePost: async (id: string, token: string): Promise<void> => {
    try {
      const url = `${API_BASE_URL}/posts/${id}`

      await fetchWithErrorHandling(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      throw error
    }
  },
}

// Comment API calls
export const commentAPI = {
  addComment: async (postId: string, text: string, token: string): Promise<Post> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/comments/${postId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      return data.post
    } catch (error) {
      throw error
    }
  },

  deleteComment: async (postId: string, commentId: string, token: string): Promise<void> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/comments/${postId}/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      throw error
    }
  },
}

// Like API calls
export const likeAPI = {
  toggleLike: async (postId: string, token: string): Promise<{ likes: number; isLiked: boolean }> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/likes/${postId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  },

  getLikes: async (postId: string): Promise<{ likes: number; likedBy: string[] }> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/likes/${postId}`)

      const data = await response.json()
      return data
    } catch (error) {
      throw error
    }
  },
}

// Contact API calls
export const contactAPI = {
  sendMessage: async (name: string, email: string, subject: string, message: string): Promise<void> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      })
    } catch (error) {
      throw error
    }
  },

  getMessages: async (token: string): Promise<any[]> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      const data = await response.json()
      return Array.isArray(data) ? data : data.messages || []
    } catch (error) {
      throw error
    }
  },

  deleteMessage: async (messageId: string, token: string): Promise<void> => {
    try {
      const response = await fetchWithErrorHandling(`${API_BASE_URL}/contact/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
    } catch (error) {
      throw error
    }
  },
}

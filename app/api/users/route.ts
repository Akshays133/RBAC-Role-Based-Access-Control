import { NextResponse } from 'next/server'

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  createdAt: string
  lastLogin: string
}

let users: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", createdAt: "2023-01-01", lastLogin: "2023-06-15" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active", createdAt: "2023-02-15", lastLogin: "2023-06-14" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive", createdAt: "2023-03-30", lastLogin: "2023-05-20" },
  // Add more mock users here...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('query')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  let filteredUsers = users

  if (query) {
    filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.role.toLowerCase().includes(query.toLowerCase())
    )
  }

  const totalPages = Math.ceil(filteredUsers.length / limit)
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ 
    users: paginatedUsers, 
    totalPages, 
    currentPage: page 
  })
}

export async function POST(request: Request) {
  const newUser: User = await request.json()
  newUser.id = (users.length + 1).toString()
  newUser.createdAt = new Date().toISOString().split('T')[0]
  newUser.lastLogin = "-"
  users.push(newUser)
  return NextResponse.json(newUser, { status: 201 })
}

export async function PUT(request: Request) {
  const updatedUser: User = await request.json()
  const index = users.findIndex(user => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser }
    return NextResponse.json(users[index])
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const index = users.findIndex(user => user.id === id)
  if (index !== -1) {
    const deletedUser = users.splice(index, 1)[0]
    return NextResponse.json(deletedUser)
  }
  return NextResponse.json({ error: "User not found" }, { status: 404 })
}


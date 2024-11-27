import { NextResponse } from 'next/server'

type Log = {
  id: string
  timestamp: string
  action: string
  details: string
}

let logs: Log[] = []

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')

  const totalPages = Math.ceil(logs.length / limit)
  const paginatedLogs = logs.slice((page - 1) * limit, page * limit)

  return NextResponse.json({ 
    logs: paginatedLogs, 
    totalPages, 
    currentPage: page 
  })
}

export async function POST(request: Request) {
  const newLog: Omit<Log, 'id' | 'timestamp'> = await request.json()
  const log: Log = {
    ...newLog,
    id: (logs.length + 1).toString(),
    timestamp: new Date().toISOString()
  }
  logs.push(log)
  return NextResponse.json(log, { status: 201 })
}


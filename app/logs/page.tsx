import { LogViewer } from "@/components/log-viewer"

export default function LogsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Activity Logs</h1>
      <LogViewer />
    </div>
  )
}


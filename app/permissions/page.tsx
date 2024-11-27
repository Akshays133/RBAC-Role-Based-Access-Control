import { PermissionManagement } from "@/components/permission-management"

export default function PermissionsPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Permission Management</h1>
      <PermissionManagement />
    </div>
  )
}


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserManagement } from "@/components/user-management"
import { RoleManagement } from "@/components/role-management"
import { PermissionManagement } from "@/components/permission-management"

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">RBAC Dashboard</h1>
      <Tabs defaultValue="users" className="w-full">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserManagement />
        </TabsContent>
        <TabsContent value="roles">
          <RoleManagement />
        </TabsContent>
        <TabsContent value="permissions">
          <PermissionManagement />
        </TabsContent>
      </Tabs>
    </div>
  )
}


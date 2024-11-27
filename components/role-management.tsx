"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AddRoleModal } from "@/components/add-role-modal"
import { EditRoleModal } from "@/components/edit-role-modal"

type Role = {
  id: string
  name: string
  permissions: string[]
}

const mockRoles: Role[] = [
  { id: "1", name: "Admin", permissions: ["Create", "Read", "Update", "Delete"] },
  { id: "2", name: "Editor", permissions: ["Read", "Update"] },
  { id: "3", name: "Viewer", permissions: ["Read"] },
]

export function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const addRole = (role: Role) => {
    setRoles([...roles, { ...role, id: Date.now().toString() }])
  }

  const editRole = (updatedRole: Role) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role))
  }

  const deleteRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <Button onClick={() => setIsAddModalOpen(true)}>Add Role</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map((role) => (
            <TableRow key={role.id}>
              <TableCell>{role.name}</TableCell>
              <TableCell>{role.permissions.join(", ")}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => {
                  setSelectedRole(role)
                  setIsEditModalOpen(true)
                }}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteRole(role.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addRole}
      />
      <EditRoleModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={editRole}
        role={selectedRole}
      />
    </div>
  )
}


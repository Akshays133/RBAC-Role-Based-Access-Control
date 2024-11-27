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
import { Checkbox } from "@/components/ui/checkbox"

type Permission = {
  id: string
  name: string
  description: string
}

type Role = {
  id: string
  name: string
}

type RolePermission = {
  roleId: string
  permissionId: string
}

const mockPermissions: Permission[] = [
  { id: "1", name: "Create", description: "Ability to create new resources" },
  { id: "2", name: "Read", description: "Ability to view resources" },
  { id: "3", name: "Update", description: "Ability to modify existing resources" },
  { id: "4", name: "Delete", description: "Ability to remove resources" },
]

const mockRoles: Role[] = [
  { id: "1", name: "Admin" },
  { id: "2", name: "Editor" },
  { id: "3", name: "Viewer" },
]

const mockRolePermissions: RolePermission[] = [
  { roleId: "1", permissionId: "1" },
  { roleId: "1", permissionId: "2" },
  { roleId: "1", permissionId: "3" },
  { roleId: "1", permissionId: "4" },
  { roleId: "2", permissionId: "2" },
  { roleId: "2", permissionId: "3" },
  { roleId: "3", permissionId: "2" },
]

export function PermissionManagement() {
  const [permissions] = useState<Permission[]>(mockPermissions)
  const [roles] = useState<Role[]>(mockRoles)
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>(mockRolePermissions)

  const togglePermission = (roleId: string, permissionId: string) => {
    setRolePermissions(prev => {
      const existingPermission = prev.find(rp => rp.roleId === roleId && rp.permissionId === permissionId)
      if (existingPermission) {
        return prev.filter(rp => !(rp.roleId === roleId && rp.permissionId === permissionId))
      } else {
        return [...prev, { roleId, permissionId }]
      }
    })
  }

  const hasPermission = (roleId: string, permissionId: string) => {
    return rolePermissions.some(rp => rp.roleId === roleId && rp.permissionId === permissionId)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Permission Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Permission</TableHead>
            <TableHead>Description</TableHead>
            {roles.map(role => (
              <TableHead key={role.id}>{role.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {permissions.map(permission => (
            <TableRow key={permission.id}>
              <TableCell>{permission.name}</TableCell>
              <TableCell>{permission.description}</TableCell>
              {roles.map(role => (
                <TableCell key={role.id}>
                  <Checkbox
                    checked={hasPermission(role.id, permission.id)}
                    onCheckedChange={() => togglePermission(role.id, permission.id)}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


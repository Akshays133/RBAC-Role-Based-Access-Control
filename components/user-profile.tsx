import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
  createdAt: string
  lastLogin: string
}

type UserProfileProps = {
  isOpen: boolean
  onClose: () => void
  user: User | null
}

export function UserProfile({ isOpen, onClose, user }: UserProfileProps) {
  if (!user) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <h3 className="font-semibold">Name</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email</h3>
            <p>{user.email}</p>
          </div>
          <div>
            <h3 className="font-semibold">Role</h3>
            <p>{user.role}</p>
          </div>
          <div>
            <h3 className="font-semibold">Status</h3>
            <p>{user.status}</p>
          </div>
          <div>
            <h3 className="font-semibold">Created At</h3>
            <p>{user.createdAt}</p>
          </div>
          <div>
            <h3 className="font-semibold">Last Login</h3>
            <p>{user.lastLogin}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


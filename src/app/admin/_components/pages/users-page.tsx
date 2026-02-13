import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Edit, Trash2, UserPlus } from 'lucide-react';
import type { AdminUser } from '../../_types';
import { formatDate } from '../../_lib/utils';

interface UsersPageProps {
  adminUsers: AdminUser[];
  currentUser: AdminUser | null;
  onAddUser: () => void;
  onEditUser: (user: AdminUser) => void;
  onDeleteUser: (id: string) => void;
}

export function UsersPage({ adminUsers, currentUser, onAddUser, onEditUser, onDeleteUser }: UsersPageProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Utilizatori Admin</h2>
          <p className="text-muted-foreground">Total: {adminUsers.length}</p>
        </div>
        <Button onClick={onAddUser}>
          <UserPlus className="w-4 h-4 mr-2" />
          Adaugă utilizator
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilizator</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Ultima autentificare</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Acțiuni</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{user.name?.[0] || user.username[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user.name || user.username}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {user.last_login_at ? formatDate(user.last_login_at) : 'Niciodată'}
                </TableCell>
                <TableCell>
                  {user.is_active ? (
                    <Badge className="bg-green-100 text-green-700">Activ</Badge>
                  ) : (
                    <Badge variant="destructive">Inactiv</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEditUser(user)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    {user.id !== currentUser?.id && (
                      <Button variant="ghost" size="icon" onClick={() => onDeleteUser(user.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

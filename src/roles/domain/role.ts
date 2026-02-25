import { UserRole } from '../../enums';

export interface Role {
  id: string;
  name: UserRole;
  description?: string;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class RoleDomain implements Role {
  id: string;
  name: UserRole;
  description?: string;
  permissions?: string[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Role>) {
    this.id = data.id || '';
    this.name = data.name || UserRole.Student;
    this.description = data.description;
    this.permissions = data.permissions || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

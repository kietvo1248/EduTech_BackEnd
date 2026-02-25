import { UserRole } from '../../enums/user-role.enum';

/**
 * Role utility functions for role management and permissions checking
 */

/**
 * Check if a user role is admin
 */
export const isAdmin = (role: UserRole): boolean => {
  return role === UserRole.Admin;
};

/**
 * Check if a user role is teacher
 */
export const isTeacher = (role: UserRole): boolean => {
  return role === UserRole.Teacher;
};

/**
 * Check if a user role is parent
 */
export const isParent = (role: UserRole): boolean => {
  return role === UserRole.Parent;
};

/**
 * Check if a user role is student
 */
export const isStudent = (role: UserRole): boolean => {
  return role === UserRole.Student;
};

/**
 * Check if user has required roles
 */
export const hasRole = (
  userRole: UserRole,
  requiredRoles: UserRole[],
): boolean => {
  return requiredRoles.includes(userRole);
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (role: UserRole): string => {
  const displayNames: Record<UserRole, string> = {
    [UserRole.Admin]: 'Administrator',
    [UserRole.Teacher]: 'Teacher',
    [UserRole.Parent]: 'Parent',
    [UserRole.Student]: 'Student',
  };
  return displayNames[role] || 'Unknown';
};

/**
 * Get all available roles
 */
export const getAllRoles = (): UserRole[] => {
  return Object.values(UserRole);
};

/**
 * Get role priority for display/ordering
 * Higher number = higher priority
 */
export const getRolePriority = (role: UserRole): number => {
  const priorities: Record<UserRole, number> = {
    [UserRole.Admin]: 4,
    [UserRole.Teacher]: 3,
    [UserRole.Parent]: 2,
    [UserRole.Student]: 1,
  };
  return priorities[role] || 0;
};

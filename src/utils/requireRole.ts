export function requireRole(allowedRoles: string[], role: string) {
  if (!allowedRoles.includes(role)) {
    throw new Error("Insufficient permissions");
  }
}

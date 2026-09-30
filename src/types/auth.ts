import type { Role } from "../mocks/users.mock";

export interface AuthPayload {
  sub: string;
  role: Role;
  rut: string;
}

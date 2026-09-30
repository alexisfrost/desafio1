export type Role = "admin" | "user";

export interface MockUser {
  id: string;
  username: string;
  password: string;
  role: Role;
  rut: string | null;
}

export const users: MockUser[] = [
  { id: "1", username: "admin", password: "admin123", role: "admin", rut: null },
  { id: "2", username: "pablo", password: "pablo123", role: "user", rut: "12.345.678-9" },
  { id: "3", username: "maria", password: "maria123", role: "user", rut: "9.876.543-2" },
];

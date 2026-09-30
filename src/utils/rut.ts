// Strips dots and uppercases the check digit so "12.345.678-9" and "12345678-9" compare equal.
export function normalizeRut(rut: string): string {
  return rut.replace(/\./g, "").trim().toUpperCase();
}

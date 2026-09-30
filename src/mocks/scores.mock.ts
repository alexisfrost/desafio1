export interface MockScore {
  rut: string;
  score: number;
  fecha: string;
}

export const scores: MockScore[] = [
  { rut: "12.345.678-9", score: 73, fecha: "2025-06-27T14:35:00Z" },
  { rut: "9.876.543-2", score: 45, fecha: "2025-07-02T09:10:00Z" },
  { rut: "11.111.111-1", score: 98, fecha: "2025-05-15T18:20:00Z" },
];

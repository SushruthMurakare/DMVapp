export interface Section {
  id: number;
  title: string;
}

export const fetchSections = async (): Promise<Section[]> => {
  const res = await fetch("http://localhost:8000/states/1/sections");
  if (!res.ok) throw new Error("Failed to fetch sections");
  return res.json();
};

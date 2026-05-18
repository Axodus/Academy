import { useQuery } from "@tanstack/react-query";
import { academyData } from "../services/academyData";

export function useAcademyData() {
  return useQuery({
    queryKey: ["academy-mock"],
    queryFn: async () => academyData,
    staleTime: Infinity
  });
}

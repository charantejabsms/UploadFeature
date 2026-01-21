import { useState, useCallback } from "react";

export const useMediaSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id); 
      } else {
        next.add(id); 
      }
      return next;
    });
  }, []);

  return {
    selectedIds,
    toggleSelection, 
    count: selectedIds.size, 
  };
};

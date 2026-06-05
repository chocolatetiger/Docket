import { create } from 'zustand';

interface DragStore {
  draggedTaskId: string | null;
  setDraggedTaskId: (id: string | null) => void;
}

const useDragStore = create<DragStore>((set) => ({
  draggedTaskId: null,
  setDraggedTaskId: (id) => set({ draggedTaskId: id }),
}));

export { useDragStore };

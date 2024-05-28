import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScanner = create(
    persist(
        (set) => ({
            action: '',
            setAction: (action) => set({ action }),
        }),
        {
            name: 'scanner',
        }
    )
);
export default useScanner;

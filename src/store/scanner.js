import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useScanner = create(
    persist(
        (set) => ({
            action: '',
            scenario: '',
            lastRecord: {},

            setAction: (action) => set({ action }),
            setScenario: (scenario) => set({ scenario }),
            setLastRecord: (lastRecord) => set({ lastRecord })
        }),
        {
            name: 'scanner',
        }
    )
)
export {useScanner};

// Modules
import { createContext, useContext, useState } from 'react';

// Context
const Context = createContext();

export function GlobalProvider({ children }) {

    // Benchmarks
    const [benchmarkSingle, setBenchmarkSingle] = useState({});

    return (
        <Context.Provider
            value={{
                benchmarkSingle,
                setBenchmarkSingle
            }}
        >
            {children}
        </Context.Provider>
    )
};

export function useGlobalContext() { return useContext(Context) }
// MODULES
import { createContext, useContext, useState } from 'react';

// CONTEXT
const Context = createContext();

export function GlobalProvider({ children }) {

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
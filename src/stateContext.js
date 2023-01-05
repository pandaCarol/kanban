import React, { useState, useContext, useMemo } from "react";
import DataObj from "./taskData";

const StateContextWrapping = React.createContext();

export function UseStateContext() {
    return(useContext(StateContextWrapping))
}

export default function StateProvider({children}) {
    const [state, setState] = useState(DataObj);
    const stateMemo = useMemo(()=> ({ state, setState }), [state, setState]);

    return(
        <StateContextWrapping.Provider value={stateMemo}>
            {children}
        </StateContextWrapping.Provider>
    )
}


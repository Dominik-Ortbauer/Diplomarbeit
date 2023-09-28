import SocketClient from "./SocketClient"
import { CameraCapturedPicture } from "expo-camera"
import React, { Dispatch } from "react"

export type globalStateType = {
    socketClient: SocketClient,
    pictures: CameraCapturedPicture[],
    validationData: Map<string, string>,
}

export const globalState: globalStateType = {
    socketClient: new SocketClient("10.0.0.29", 5000, (data) => {
        var map = new Map<string, string>();
        for(var key in data) {
            map.set(key, data[key]);
        }
        
    }),
    pictures: [],
    validationData: new Map<string, string>([
        ["Vorname", "Dominik"],
        ["Nachname", "Ortbauer"],
        ["Geburtsdatum", "14.02.2005"],
    ]),
}

export const globalStateContext = React.createContext(globalState)
export const dispatchStateContext = React.createContext<Dispatch<any>>(() => {});

export function GlobalStateProvider({ children }: { children: React.ReactNode}) {
    const [state, dispatch] = React.useReducer(
        (state: any, newValue: any) => ({ ...state, ...newValue }),
        globalState
    )
    return (
        <globalStateContext.Provider value={state}>
            <dispatchStateContext.Provider value={dispatch}>
                {children}
            </dispatchStateContext.Provider>
        </globalStateContext.Provider>
    )
}

export function useGlobalState(): [globalStateType, Dispatch<any>] {
    return [
        React.useContext(globalStateContext),
        React.useContext(dispatchStateContext)
    ]
}
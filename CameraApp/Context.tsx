import { Bewerber } from "./Bewerber"
import SocketClient from "./SocketClient"
import { CameraCapturedPicture } from "expo-camera"
import React, { Dispatch } from "react"

export type globalStateType = {
    socketClient: SocketClient | null,
    pictures: CameraCapturedPicture[],
    validationData: Bewerber | null,
}

export const globalState: globalStateType = {
    socketClient: null,
    pictures: [],
    validationData: null,
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
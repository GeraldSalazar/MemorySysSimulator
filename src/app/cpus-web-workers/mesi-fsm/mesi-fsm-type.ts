import { CacheState } from "../shared/cache-states-enum"

export type FSM_MESI = {
    state: CacheState,
    transitions: any,
    changeState: (newState: CacheState)=>void,
    dispatch: (actionName: any)=>void
}
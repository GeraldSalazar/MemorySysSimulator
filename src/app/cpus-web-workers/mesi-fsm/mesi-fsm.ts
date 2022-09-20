import { CacheState } from "../shared/cache-states-enum"
import { BusActions } from "../../bus/bus-actions-enum"
import { FSM_MESI } from "./mesi-fsm-type";



export const MESI: FSM_MESI = {
    state: CacheState.invalid,
    transitions: {
        I: {
            readExclusive: function () {
                console.log('Read Exclusive Block');
                MESI.changeState(CacheState.exclusive);
            },
            readShared: function () {
                console.log('Read Shared Block');
                MESI.changeState(CacheState.shared);
            },
            writeBlock: function() {
                console.log('Write Block. Modified State');
                MESI.changeState(CacheState.modified)
            }
        },
        S: {
            writeBlock: function() {
                console.log('Write Block. Modified State');
                MESI.changeState(CacheState.modified)
                return BusActions.blocksInvalidation
            },
            snoopInvalidation: function(){
                console.log('Invalidating State');
                MESI.changeState(CacheState.invalid)
                return BusActions.noAction
            }

        },
        M: {
            readShared: function () {
                console.log('Read Shared Block');
                MESI.changeState(CacheState.shared);
                return BusActions.writeBack
            },
            snoopInvalidation: function(){
                console.log('Invalidating State');
                MESI.changeState(CacheState.invalid)
                return BusActions.writeBack
            }

        },
        E: {
            writeBlock: function() {
                console.log('Write Block. Modified State');
                MESI.changeState(CacheState.modified)
                return BusActions.noAction
            },
            snoopInvalidation: function(){
                console.log('Invalidating State');
                MESI.changeState(CacheState.invalid)
                return BusActions.noAction
            }

        }
    },
    changeState(newState: CacheState) {
        this.state = newState
    },
    dispatch(actionName: any) {
            const actions = this.transitions[this.state];
            const action = this.transitions[this.state][actionName];

            console.log(action)
            if (action) {
                action.apply(MESI);
            } else {
                 //action is not valid for current state
            }
    }
}

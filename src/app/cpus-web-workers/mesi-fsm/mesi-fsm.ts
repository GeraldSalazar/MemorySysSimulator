import { CacheBlock } from "../shared/cache-block-interface";
import { CacheState } from "../shared/cache-states-enum"
import { FSM_MESI } from "./mesi-fsm-type";

//'readExclusive'
//'readShared'
//'writeBlock'
//'snoopInvalidation'



export const MESI: FSM_MESI = {
    state: CacheState.invalid,
    transitions: {
        I: {
            readExclusive: function() {
                MESI.changeState(CacheState.exclusive);
                return MESI.state
            },
            readShared: function () {
                MESI.changeState(CacheState.shared);
                return MESI.state
            },
            writeBlock: function() {
                MESI.changeState(CacheState.modified)
                return MESI.state
            }
        },
        S: {
            readExclusive: function() {
                MESI.changeState(CacheState.shared);
                return MESI.state
            },
            writeBlock: function() {
                MESI.changeState(CacheState.modified)
                return MESI.state
            },
            snoopInvalidation: function(){
                MESI.changeState(CacheState.invalid)
                return MESI.state
            },
            readShared: function () {
                MESI.changeState(CacheState.shared);
                return MESI.state
            },

        },
        M: {
            readExclusive: function() {
                MESI.changeState(CacheState.modified);
                return MESI.state
            },
            readShared: function () {
                MESI.changeState(CacheState.shared);
                return MESI.state
            },
            snoopInvalidation: function(){
                MESI.changeState(CacheState.invalid)
                return MESI.state
            },
            writeBlock: function() {
                MESI.changeState(CacheState.modified)
                return MESI.state
            },

        },
        E: {
            readExclusive: function() {
                MESI.changeState(CacheState.exclusive);
                return MESI.state
            },
            writeBlock: function() {
                MESI.changeState(CacheState.modified)
                return MESI.state
            },
            snoopInvalidation: function(){
                MESI.changeState(CacheState.invalid)
                return MESI.state
            },
            readShared: function () {
                MESI.changeState(CacheState.shared);
                return MESI.state
            },

        }
    },
    changeState(newState: CacheState) {
        MESI.state = newState
    },
    dispatch(actionName: string) {
            const action = this.transitions[this.state][actionName];
            //console.log(action)
            if(action){
                return action.apply(this)
            }else{
                return this.state+' '+actionName
            }
    }
}



  
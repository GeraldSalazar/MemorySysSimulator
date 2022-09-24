import { FSM_MESI } from "../mesi-fsm/mesi-fsm-type";

export interface CacheBlock {
    state: FSM_MESI,
    dir: string,
    data: string
  };
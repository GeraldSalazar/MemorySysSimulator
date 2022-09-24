export interface Instruction {
    cpuNum: number,
    op: string,
    dir?: string,
    data?: string
}
import { FlowJsonData, FlowInstruction } from "../models/FlowInstructionData";

export default function instructionEvent(
  instruction: FlowJsonData[]
): FlowInstruction {
  return {
    currentIdx: 0,
    getCurrentItem() {
      return instruction[this.currentIdx];
    },
    reset() {
      this.currentIdx = 0;
    },
    next(answer?: string) {
      const item = instruction[this.currentIdx];

      if (item.question) {
        const itemAnswer = item.answers?.find(item => item.m === answer);
        this.currentIdx = itemAnswer?.next as number;
        return true;
      }

      if (!item.next) return null;
      this.currentIdx = item.next as number;

      return true;
    }
  };
}

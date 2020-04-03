import { FlowNodeUI } from "../models/FlowInstructionData";
import lsStorage from "./lsStorage";

export default function updateInstructions(instructions: FlowNodeUI[]) {
  // add type attribute on answers
  instructions.forEach(item => {
    if (item.answers) {
      item.answers.forEach(answer => {
        answer.type = "answer";

        if (answer.arrowTo) {
          answer.isConnected = true;
        } else {
          answer.isConnected = false;
        }
      });
    }
  });
  // add isConnect on answers
  console.log(
    "instructions updated, added type and isConnected to answers object"
  );
  // localStorage.setItem('instructions_v0.0.1', 'true')

  return instructions;
}

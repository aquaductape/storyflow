import { FlowNodeUI } from "../ts/models/FlowInstructionData";
import lsStorage from "./lsStorage";
import { ILinkNode } from "../ts/models/LinkNode";
import { v4 as uuid } from "uuid";

export function updateNodes(instructions: FlowNodeUI[]) {
  // add type attribute on answers
  instructions.forEach((item) => {
    if (item.answers) {
      item.answers.forEach((answer) => {
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
    "instruction nodes updated, added type and isConnected to answers object"
  );
  // localStorage.setItem('instructions_v0.0.1', 'true')

  return [...instructions];
}

export function updateNodeLinks(links: ILinkNode[]) {
  // add unique id's to node links
  links.forEach((link) => {
    link.id = uuid();
  });
  console.log("instruction links updated, added unique id's");
  return [...links];
}

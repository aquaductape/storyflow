import { FlowNodeUI, FlowJsonData } from "../models/FlowJsonData";

interface LooseObject {
  [key: string]: any;
}
export const createInstruction = (flowNodes: FlowNodeUI[]) => {
  let currentNode = flowNodes[0];
  let list: FlowJsonData[] = [];
  let queue = [];
  const idMap: LooseObject = {};

  if (currentNode.type !== "start") throw new Error("must include a start");

  queue.push(currentNode);
  let index = 0;

  while (queue.length > 0) {
    debugger;
    currentNode = queue.shift()!;
    const item = <FlowJsonData>{};
    item.index = index;
    item.id = currentNode.id;

    if (idMap[currentNode.id]) {
      throw new Error("id already visited");
    } else {
      idMap[currentNode.id] = true;
    }

    if (currentNode.type === "decision") {
      item.question = currentNode.content;
      item.answers = [];
      const decisionQuestion = currentNode.answers;
      decisionQuestion?.forEach(answer => {
        item.answers?.push({ m: answer.content, next: answer.arrowTo });
      });
    } else {
      item.m = currentNode.content;
      item.next = currentNode.arrowTo[0];
    }
    list.push(item);
    index++;

    if (currentNode.type === "decision") {
      const decisionQuestion = currentNode.answers;
      decisionQuestion?.forEach(answer => {
        const nextNode = flowNodes.find(node => node.id === answer.arrowTo)!;
        debugger;
        if (!idMap[nextNode.id]) {
          queue.push(nextNode);
        }
      });
    } else {
      const nextNode = flowNodes.find(
        node => node.id === currentNode.arrowTo[0]
      )!;
      debugger;

      if (!idMap[nextNode.id]) {
        queue.push(nextNode);
      }
    }
  }
  console.log(list);
  return list;
};

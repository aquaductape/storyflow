import { FlowNodeUI, FlowJsonData } from "../ts/models/FlowInstructionData";

interface LooseObject {
  [key: string]: number | undefined;
}
export const createInstruction = (flowNodes: FlowNodeUI[]) => {
  const prevNodeVisited: LooseObject = {};
  let currentNode = flowNodes[0];
  let list: FlowJsonData[] = [];
  let queue = [];

  if (currentNode.type !== "start") {
    throw new Error("must include a start");
  }
  queue.push(currentNode);
  let index = 0;

  while (queue.length > 0) {
    currentNode = queue.shift()!;
    const item = <FlowJsonData>{};
    item.index = index;

    if (prevNodeVisited[currentNode.id]) {
      continue;
    } else {
      prevNodeVisited[currentNode.id] = index;
    }

    if (currentNode.type === "decision") {
      item.question = currentNode.content;
      item.answers = [];
      const decisionQuestion = currentNode.answers;
      decisionQuestion?.forEach((answer) => {
        // item.answers?.push({ m: answer.content, next: answer.arrowTo });
        // const visitedIndex = prevNodeVisited[answer.arrowTo];

        // if (visitedIndex !== index) {
        item.answers?.push({
          m: answer.content,
          next: answer.arrowTo,
          // next: visitedIndex
        });
        // } else {
        //   item.next = index + 1;
        // }
      });
    } else {
      item.m = currentNode.content;
      item.next = currentNode.arrowTo;
      // const visitedIndex = prevNodeVisited[currentNode.arrowTo];

      // if (visitedIndex !== index) {
      //   item.next = visitedIndex;
      // } else {
      //   item.next = index + 1;
      // }
    }

    list.push(item);
    index++;

    if (currentNode.type === "decision") {
      const decisionQuestion = currentNode.answers;

      decisionQuestion?.forEach((answer) => {
        const nextNode = flowNodes.find((node) => node.id === answer.arrowTo);

        if (nextNode && !prevNodeVisited[nextNode.id]) {
          queue.push(nextNode);
        }
      });
    } else {
      const nextNode = flowNodes.find(
        (node) => node.id === currentNode.arrowTo
      );
      // throw error if procedure has empty next
      // user may accidently have unfinished paths
      // use exit to flag ending

      if (nextNode && !prevNodeVisited[nextNode.id]) {
        queue.push(nextNode);
      }
    }
  }

  list.forEach((item) => {
    if (item.question) {
      item.answers?.forEach(
        (item2) =>
          (item2.next =
            item2.next !== undefined ? prevNodeVisited[item2.next] : undefined)
      );
    } else {
      item.next =
        item.next !== undefined ? prevNodeVisited[item.next] : undefined;
    }
  });

  return list;
};

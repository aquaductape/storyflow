import React, { useState, useContext, useEffect } from "react";
import FlowContext from "../context/FlowContext";
import { createInstruction } from "../utils/createInstruction";
import instructionEvent from "../utils/instructionEvent";
import {
  FlowJsonData,
  FlowInstruction,
} from "../ts/models/FlowInstructionData";

export default function InstructionRunner({
  setDisplayRunner,
}: {
  setDisplayRunner: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    flowNodeUIState: { flowNodeUI },
    flowJsonDataState: { flowJsonData, setFlowJsonData },
  } = useContext(FlowContext)!;

  const [isFinishedBuilding, setIsFinishedBuilding] = useState(false);
  const [isFinishedInstruction, setIsFinishedInstruction] = useState(false);
  const [currentStep, setCurrentStep] = useState<FlowJsonData>();
  const [instruction, setInstruction] = useState<FlowInstruction>();

  useEffect(() => {
    const data = createInstruction(flowNodeUI);
    setFlowJsonData(() => [...data]);
    const instruction = instructionEvent(data);
    setCurrentStep(instruction.getCurrentItem());
    setInstruction(instruction);
    setIsFinishedBuilding(() => true);
  }, []);

  const onNextStep = (e: React.MouseEvent, answer?: string) => {
    if (isFinishedInstruction) setDisplayRunner(() => false);
    if (answer) {
      const result = instruction?.next(answer);

      if (!result || instruction?.currentIdx! >= flowJsonData.length) {
        setIsFinishedInstruction(() => true);
        return;
      }
      setCurrentStep(() => instruction?.getCurrentItem());
      return;
    }
    const result = instruction!.next();
    if (!result || instruction?.currentIdx! >= flowJsonData.length) {
      setIsFinishedInstruction(() => true);
      return;
    }
    setCurrentStep(() => instruction?.getCurrentItem());
  };
  return (
    <div className="modal">
      {isFinishedBuilding && currentStep ? (
        <>
          <div
            className="close-modal"
            onClick={() => setDisplayRunner(() => false)}
          >
            <div className="line1"></div>
            <div className="line2"></div>
          </div>
          <div className="content">{currentStep.m || currentStep.question}</div>
          {currentStep.question ? (
            <div className="answers">
              {currentStep.answers!.map((answer, idx) => {
                return (
                  <button
                    className="btn-answer"
                    onClick={(e) => onNextStep(e, answer.m)}
                    key={idx}
                  >
                    {answer.m}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="next">
              <button className="btn-next" onClick={onNextStep}>
                {isFinishedInstruction ? "Finish" : "Next"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div>Building Instructions...</div>
      )}
      <style jsx>
        {`
          .content {
            margin: 10px 0;
          }
          .answers,
          .next {
            display: flex;
            flex-direction: column;
          }

          .btn-answer,
          .btn-next {
            width: 100%;
            padding: 10px 10px;
            margin: 5px 0;
            background: #2196f3;
            color: #fff;
            border: none;
            border-radius: 5px;
            font-weight: 700;
          }

          .modal {
            position: fixed;
            top: 100px;
            left: 0;
            right: 0;
            max-width: 500px;
            width: 90%;
            margin: 0 auto;
            padding: 30px;
            background: #fff;
            box-shadow: 0px 3px 4px 0px #00000024;
            z-index: 100;
          }
          .close-modal {
            position: absolute;
            top: 10px;
            right: 10px;
            justify-content: center;
            align-items: center;
            width: 20px;
            height: 20px;
            cursor: pointer;
          }
          .line1,
          .line2 {
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            margin: auto 0;
            height: 2px;
            width: 100%;
            background: #aaa;
            transform: rotate(45deg);
          }
          .line2 {
            transform: rotate(135deg);
          }
        `}
      </style>
    </div>
  );
}

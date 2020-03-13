import React from "react";

export default function Modal({
  modalColor
}: {
  modalColor: "warning" | "error" | "success" | "info";
}) {
  let modalColorVal;
  switch (modalColor) {
    case "warning":
      modalColorVal = "yellow";
      break;
    case "error":
      modalColorVal = "#fff";
      break;
    case "success":
      modalColorVal = "blue";
      break;
    case "info":
      modalColorVal = "blue";
  }

  return (
    <div className="modal">
      <div className="close-modal">
        <div className="line1"></div>
        <div className="line2"></div>
      </div>
      <div className="content">Hello World</div>
      <div className="answers">
        <button className="btn-answer">Yes</button>
        <button className="btn-answer">No</button>
      </div>
      <div className="next">
        <button className="btn-next">Next</button>
      </div>
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
            background: ${modalColorVal};
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

import React, { useState, useContext } from "react";
import "./App.scss";
import FlowProvider from "./context/FlowProvider";
import FlowArea from "./components/FlowChart/FlowArea";
import ContextMenu from "./components/ContextMenu";
import { MenuProvider } from "react-contexify";
import Header from "./components/Header";

function App() {
  const [flowAreaZoom, setFlowAreaZoom] = useState(100);
  return (
    <>
      <div className="App">
        <FlowProvider>
          <Header zoomState={{ flowAreaZoom, setFlowAreaZoom }}></Header>
          <MenuProvider id="flow-context-menu-root" className="menu-provider">
            <FlowArea zoomState={{ flowAreaZoom, setFlowAreaZoom }}></FlowArea>
          </MenuProvider>
          <ContextMenu></ContextMenu>
        </FlowProvider>
      </div>
    </>
  );
}

export default App;

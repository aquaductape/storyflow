import React, { useState } from "react";
import "./App.scss";
import FlowProvider from "./context/FlowProvider";
import FlowArea from "./components/FlowChart/FlowArea";
import ContextMenu from "./components/ContextMenu";
import { MenuProvider } from "react-contexify";
import Header from "./components/Header";
import Modal from "./components/Modal";
import SideBar from "./components/SideBar/SideBar";

function App() {
  return (
    <>
      <div className="App">
        <FlowProvider>
          <Header></Header>
          {/* <SideBar></SideBar> */}
          {/* <Modal modalColor={"error"}></Modal> */}
          <MenuProvider id="flow-context-menu-root" className="menu-provider">
            <FlowArea></FlowArea>
          </MenuProvider>
          <ContextMenu></ContextMenu>
        </FlowProvider>
      </div>
    </>
  );
}

export default App;

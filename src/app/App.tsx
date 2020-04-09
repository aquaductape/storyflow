import React, { useState } from "react";
import "./App.scss";
import FlowArea from "../FlowChart/Area";
import ContextMenu from "../ContextMenu";
import { MenuProvider } from "react-contexify";
import Header from "../Header/Header";
import Modal from "../Modal/Modal";
import SideBar from "../SideBar/SideBar";

function App() {
  return (
    <>
      <div className="App">
        <Header></Header>
        {/* <SideBar></SideBar> */}
        {/* <Modal modalColor={"error"}></Modal> */}
        <MenuProvider id="flow-context-menu-root" className="menu-provider">
          <FlowArea></FlowArea>
        </MenuProvider>
        <ContextMenu></ContextMenu>
      </div>
    </>
  );
}

export default App;

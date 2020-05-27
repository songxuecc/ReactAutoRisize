import React from "react";
import ReactDOM from "react-dom";
import SimpleDemo from "./SimpleDemo";
import Editshape from "./Editshape";
import "antd/dist/antd.css";
import "./index.css";

const App = () => {
  return (
    <>
      <h1>最简单的拖拽改变盒子大小</h1>
      <SimpleDemo />
      <br />
      <br />
      {/* <h1>像截图软件一样，六点定位的拖拽改变盒子大小</h1>
      <Editshape /> */}
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));

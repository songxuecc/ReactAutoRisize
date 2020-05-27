import React from "react";
import ReactDOM from "react-dom";
import SimpleDemo from "./SimpleDemo";
import "antd/dist/antd.css";
import "./index.css";

const App = () => {
  return (
    <>
      <h1>最简单的拖拽改变盒子大小</h1>
      <SimpleDemo />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));

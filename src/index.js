import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// import SimpleDemo from "./SimpleDemo";
import Editshape from "./Editshape";
import "antd/dist/antd.css";
import "./index.css";

const App = () => {
  const style = { width: 250, height: 100, border: "1px solid red" };

  const [editshapeStyle, setEditshapeStyle] = React.useState({});
  React.useEffect(() => {
    const activeNode = document.getElementById("box");
    if (activeNode) {
      const rect = activeNode.getBoundingClientRect();
      const editshapeStyle = {
        position: "absolute",
        width: activeNode.style.width,
        height: activeNode.style.height,
        left: rect.left + "px",
        top: rect.top + "px"
      };
      console.log(editshapeStyle, "editshapeStyle");
      setEditshapeStyle(editshapeStyle);
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* <h1>最简单的拖拽改变盒子大小</h1>
      <SimpleDemo /> */}
      <br />
      <br />
      <h1>像截图软件一样，六点定位的拖拽改变盒子大小</h1>

      <div id="box" style={style}>
        我是那个要改变style的盒子
      </div>
      <Editshape style={editshapeStyle} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));

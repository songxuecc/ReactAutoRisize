import React from "react";
import ReactDOM from "react-dom";
import SimpleDemo from "./SimpleDemo";
import Editshape from "./Editshape";
import "antd/dist/antd.css";
import "./index.css";

const App = () => {
  const [style, setStyle] = React.useState({
    width: 250,
    height: 100,
    textAlign: "center"
  });

  const [editshapeStyle, setEditshapeStyle] = React.useState({});
  React.useEffect(() => {
    const activeNode = document.getElementById("box");
    if (activeNode) {
      const editshapeStyle = {
        position: "absolute",
        width: activeNode.style.width,
        height: activeNode.style.height,
        left: activeNode.offsetLeft + "px",
        top: activeNode.offsetTop + "px"
      };
      setEditshapeStyle(editshapeStyle);
    }
  }, []);

  const handleStyle = nextStyle => {
    setStyle({ ...style, ...nextStyle });

    setEditshapeStyle({ ...editshapeStyle, ...nextStyle });
  };

  return (
    <div style={{ position: "relative" }} id="painting-main">
      {/* <h1>最简单的拖拽改变盒子大小</h1>
      <SimpleDemo /> */}
      <br />
      <br />
      <h1>像截图软件一样，六点定位的拖拽改变盒子大小</h1>

      <div id="box" style={style}>
        我是那个要改变style的盒子
      </div>
      <Editshape style={editshapeStyle} handleStyle={handleStyle} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));

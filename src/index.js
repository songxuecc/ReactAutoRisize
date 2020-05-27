import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";

const App = () => {
  const [style, setState] = React.useState({ width: 120, height: 120 });
  const origin = React.useRef(null);

  const onMouseMove = event => {
    event.stopPropagation();
    event.preventDefault();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const width = style.width + clientX - origin.current.x;
    const height = style.height + clientY - origin.current.y;
    setState({ width, height });
  };
  const onMouseDown = event => {
    event.stopPropagation();
    event.preventDefault();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const { width, height } = event.target.getBoundingClientRect();
    origin.current = { x: clientX, y: clientY };
    setState({ width, height });
    bindEvents();
  };

  const onMouseUp = event => {
    unbindEvents();
  };

  const bindEvents = () => {
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseUp);
  };
  const unbindEvents = () => {
    document.removeEventListener("mouseup", onMouseUp);
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseleave", onMouseUp);
  };

  React.useEffect(() => {
    return () => {
      unbindEvents();
    };
  }, []);

  return (
    <div style={{ border: "1px solid green" }}>
      我是绿色的盒子的盒子
      <div
        onMouseDown={onMouseDown}
        style={{ border: "1px solid red", ...style }}
      >
        我是红色的盒子
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("container"));

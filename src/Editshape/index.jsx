import React from "react";
import Point from "./Point";
import "antd/dist/antd.css";

const SimpleDemo = props => {
  // 每个坐标的id
  const [pointList] = React.useState([
    "lt",
    "rt",
    "lb",
    "rb",
    "l",
    "r",
    "t",
    "b"
  ]);
  // 坐标箭头所指方向
  const [directionKey] = React.useState({
    t: "row-resize",
    b: "row-resize",
    l: "col-resize",
    r: "col-resize",
    lt: "nwse-resize",
    rt: "nesw-resize",
    lb: "nesw-resize",
    rb: "nwse-resize"
  });

  const ref = React.useRef(null);
  const stateRef = React.useRef({});

  const [style, setState] = React.useState({ width: 250, height: 120 });
  const origin = React.useRef(null);

  const onMouseMove = moveEvent => {
    const point = ref.current.pointId;
    let downEvent = moveEvent;
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const activeNode = document.getElementById("box");
    const activeStyle = props.style;
    if (!activeNode) {
      return;
    }
    const { pos, startX, startY } = ref.current;
    const nextPos = { ...pos };
    ref.current.hasMoved = true;
    let height = Number(nextPos.height);
    let width = Number(nextPos.width);
    let top = Number(nextPos.top) || 0;
    let left = Number(nextPos.left) || 0;
    let currX = moveEvent.clientX;
    let currY = moveEvent.clientY;
    let disY = currY - startY;
    let disX = currX - startX;
    let hasT = /t/.test(point);
    let hasB = /b/.test(point);
    let hasL = /l/.test(point);
    let hasR = /r/.test(point);
    let newHeight = +height + (hasT ? -disY : hasB ? disY : 0);
    let newWidth = +width + (hasL ? -disX : hasR ? disX : 0);
    nextPos.height = newHeight > 0 ? newHeight : 0;
    nextPos.width = newWidth > 0 ? newWidth : 0;
    nextPos.left = +left + (hasL ? disX : 0);
    nextPos.top = +top + (hasT ? disY : 0);
    // 根据拖动方向算出最终拖动结果style 并在拖动过程中保持cursor 不变
    // 画布和被拖动元素的cursor 在拖动时候与Point保持一致
    const style = {
      ...activeStyle,
      left: `${nextPos.left}px`,
      top: `${nextPos.top}px`,
      width: `${nextPos.width}px`,
      height: `${nextPos.height}px`,
      cursor: directionKey[point]
    };
    const paiting = document.getElementById("painting-main");
    if (paiting) {
      paiting.style.cursor = directionKey[point];
    }
    stateRef.current = style;
    // updateStyle({ style: stateRef.current, id: activeId })
  };
  const onMouseDown = (event, pointId) => {
    event.stopPropagation();
    event.preventDefault();
    const clientX = event.clientX;
    const clientY = event.clientY;
    const { width, height } = event.target.getBoundingClientRect();
    origin.current = { x: clientX, y: clientY };
    setState({ width, height });
    bindEvents();

    let downEvent = event;
    downEvent.stopPropagation();
    downEvent.preventDefault();
    const activeNode = document.getElementById("box");
    if (!activeNode) {
      return;
    }
    const pos = {
      width: activeNode.clientWidth,
      height: activeNode.clientHeight,
      left: activeNode.offsetLeft,
      top: activeNode.offsetTop
    };
    let startX = downEvent.clientX;
    let startY = downEvent.clientY;
    let hasMoved = false;
    // 记录鼠标按下起始坐标和元素大小
    ref.current = {
      pos,
      startX,
      startY,
      hasMoved,
      pointId
    };
    // 鼠标按下的时候 开始绑定鼠标拖动事件
    bindEvents();
  };

  const onMouseUp = event => {
    // 记录此次操作结果
    if (ref.current.hasMoved) {
    }
    // 还原所有数据
    const paiting = document.getElementById("painting-main");
    if (paiting) {
      paiting.style.cursor = "default";
    }
    // stateRef.current = _.omit(stateRef.current, ["cursor"]);
    // updateStyle({ style: { ...stateRef.current }, id: activeId })
    stateRef.current = {};
    ref.current = {};
    // 解除绑定
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
    <>
      {pointList.map((item, idx) => (
        <Point
          key={idx}
          pointId={item}
          onMouseDown={onMouseDown}
          directionKey={directionKey}
        />
      ))}
    </>
  );
};

export default SimpleDemo;

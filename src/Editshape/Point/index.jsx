import React from "react";
import styles from "./index.less";

const Point = ({ pointId, onMouseDown, directionKey }) => {
  /**
   * 获取point计算后样式
   * @param point
   * @returns {{}}
   */
  const getPointStyle = point => {
    let hasT = /t/.test(point);
    let hasB = /b/.test(point);
    let hasL = /l/.test(point);
    let hasR = /r/.test(point);
    let defaultStyle = {
      cursor: directionKey[point],
      position: "absolute"
    };

    let transformX = hasL ? "-30%" : "30%";
    let transformY = hasT ? "-30%" : "30%";
    if (point.length === 2) {
      return {
        ...defaultStyle,
        borderRadius: "10px",
        width: "10px",
        height: "10px",
        left: hasL ? 0 : "auto",
        top: hasT ? 0 : "auto",
        right: hasR ? 0 : "auto",
        bottom: hasB ? 0 : "auto",
        transform: `translate(${transformX}, ${transformY})`,
        border: "1px dashed red",
        zIndex: 1002
      };
    }
    if (hasT) {
      return {
        ...defaultStyle,
        width: "100%",
        height: 0,
        left: 0,
        top: 0,
        marginLeft: 0,
        marginTop: "-1px",
        borderTop: "1px dashed red"
      };
    } else if (hasB) {
      return {
        ...defaultStyle,
        width: "100%",
        height: 0,
        left: 0,
        bottom: 0,
        marginLeft: 0,
        marginBottom: "-1px",
        borderBottom: "1px dashed red"
      };
    } else if (hasL) {
      return {
        ...defaultStyle,
        width: 0,
        height: "100%",
        left: 0,
        top: 0,
        marginLeft: "0px",
        marginTop: 0,
        borderRight: "1px dashed red"
      };
    } else {
      return {
        ...defaultStyle,
        width: 0,
        height: "100%",
        right: 0,
        top: 0,
        marginRight: "-1px",
        marginTop: 0,
        borderRight: "1px dashed red"
      };
    }
  };
  const handleMouseDown = e => {
    onMouseDown(e, pointId);
  };
  return (
    <div
      onMouseDown={handleMouseDown}
      style={{ ...getPointStyle(pointId) }}
      className={styles.point}
    />
  );
};

export default Point;

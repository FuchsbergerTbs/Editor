export function pannable(node) {
  let x;
  let y;

  function handleMousedown(event) {
    event.stopPropagation();
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panstart", {
        detail: { x, y, event }
      })
    );

    window.addEventListener("mousemove", handleMousemove);
    window.addEventListener("mouseup", handleMouseup);
  }

  function handleMousemove(event) {
    event.stopPropagation();
    const dx = event.clientX - x;
    const dy = event.clientY - y;
    x = event.movementX;
    y = event.movementY;
    const offsetX = event.offsetX;
    const offsetY = event.offsetY;

    node.dispatchEvent(
      new CustomEvent("panmove", {
        detail: { x, y, dx, dy, offsetX, offsetY, event }
      })
    );
  }

  function handleMouseup(event) {
    event.stopPropagation();
    x = event.clientX;
    y = event.clientY;

    node.dispatchEvent(
      new CustomEvent("panend", {
        detail: { x, y }
      })
    );

    window.removeEventListener("mousemove", handleMousemove);
    window.removeEventListener("mouseup", handleMouseup);
  }

  node.addEventListener("mousedown", handleMousedown);

  return {
    destroy() {
      node.removeEventListener("mousedown", handleMousedown);
    }
  };
}

export interface InteractiveProps<T = Element> {
  onKeyDown?: React.KeyboardEventHandler<T>;
  onKeyPress?: React.KeyboardEventHandler<T>;
  onKeyUp?: React.KeyboardEventHandler<T>;

  onAuxClick?: React.MouseEventHandler<T>;
  onClick?: React.MouseEventHandler<T>;
  onContextMenu?: React.MouseEventHandler<T>;
  onDoubleClick?: React.MouseEventHandler<T>;
  onDrag?: React.DragEventHandler<T>;
  onDragEnd?: React.DragEventHandler<T>;
  onDragEnter?: React.DragEventHandler<T>;
  onDragExit?: React.DragEventHandler<T>;
  onDragLeave?: React.DragEventHandler<T>;
  onDragOver?: React.DragEventHandler<T>;
  onDragStart?: React.DragEventHandler<T>;
  onDrop?: React.DragEventHandler<T>;
  onMouseDown?: React.MouseEventHandler<T>;
  onMouseEnter?: React.MouseEventHandler<T>;
  onMouseLeave?: React.MouseEventHandler<T>;
  onMouseMove?: React.MouseEventHandler<T>;
  onMouseOut?: React.MouseEventHandler<T>;
  onMouseOver?: React.MouseEventHandler<T>;
  onMouseUp?: React.MouseEventHandler<T>;

  onTouchCancel?: React.TouchEventHandler<T>;
  onTouchEnd?: React.TouchEventHandler<T>;
  onTouchMove?: React.TouchEventHandler<T>;
  onTouchStart?: React.TouchEventHandler<T>;

  onPointerDown?: React.PointerEventHandler<T>;
  onPointerMove?: React.PointerEventHandler<T>;
  onPointerUp?: React.PointerEventHandler<T>;
  onPointerCancel?: React.PointerEventHandler<T>;
  onPointerEnter?: React.PointerEventHandler<T>;
  onPointerLeave?: React.PointerEventHandler<T>;
  onPointerOver?: React.PointerEventHandler<T>;
  onPointerOut?: React.PointerEventHandler<T>;

  onWheel?: React.WheelEventHandler<T>;
}

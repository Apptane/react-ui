import { usePortalRoot } from "@apptane/react-ui-hooks";
import { forwardRef } from "react";
import ReactDOM from "react-dom";
import { PortalProps, PortalPropTypes } from "./Portal.types";

/**
 * Event handler that traps (stop propagation) the event.
 */
const trapEvent = (evt: React.SyntheticEvent) => evt.stopPropagation();

/**
 * Implements a non-visual behavior for placing elements with the portal.
 */
const Portal = forwardRef((props: PortalProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, trapEvents = true } = props;
  const container = usePortalRoot();

  // NB: here we have to implement a trap for
  // https://reactjs.org/docs/portals.html#event-bubbling-through-portals
  // at least until React decides to provide a better solution
  //
  // If events are allowed to bubble up, they may be observed by container
  // elements that are listening with their own event handlers and picking
  // up events from within portal. For example, card header handles onClick
  // and that will be triggered by modal events if the modal is created by
  // a button placed within the card header.

  return container.current
    ? ReactDOM.createPortal(
        trapEvents ? (
          <div
            data-apptane-trap
            ref={ref}
            onFocus={trapEvent}
            onBlur={trapEvent}
            onKeyDown={trapEvent}
            onKeyPress={trapEvent}
            onKeyUp={trapEvent}
            onChange={trapEvent}
            onInput={trapEvent}
            onInvalid={trapEvent}
            onSubmit={trapEvent}
            onClick={trapEvent}
            onContextMenu={trapEvent}
            onDoubleClick={trapEvent}
            onDrag={trapEvent}
            onDragEnd={trapEvent}
            onDragEnter={trapEvent}
            onDragExit={trapEvent}
            onDragLeave={trapEvent}
            onDragOver={trapEvent}
            onDragStart={trapEvent}
            onDrop={trapEvent}
            onMouseDown={trapEvent}
            onMouseEnter={trapEvent}
            onMouseLeave={trapEvent}
            onMouseMove={trapEvent}
            onMouseOut={trapEvent}
            onMouseOver={trapEvent}
            onMouseUp={trapEvent}
            onSelect={trapEvent}>
            {children}
          </div>
        ) : (
          children
        ),
        container.current
      )
    : null;
});

Portal.displayName = "Portal";
Portal.propTypes = PortalPropTypes;

export default Portal;

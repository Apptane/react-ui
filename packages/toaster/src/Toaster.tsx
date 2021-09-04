import { Direction, Intent, Placement, StylePadding } from "@apptane/react-ui-core";
import { useForceUpdate } from "@apptane/react-ui-hooks";
import { useColorMode, useTheme } from "@apptane/react-ui-theme";
import { css } from "@emotion/react";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import Toast from "./Toast";
import { ToastProps } from "./Toast.types";
import { ToastCallback, Toaster, ToasterOptions, ToastId, ToastOptions } from "./Toaster.types";

const StyleContainer = (zindex: number, alignment: string) => css`
  align-items: ${alignment};
  left: 0;
  right: 0;
  position: fixed;
  z-index: ${zindex};
  display: flex;
  flex-wrap: nowrap;
  background: transparent;
  pointer-events: none;
`;

const StyleContainerTop = css`
  top: 0;
  flex-direction: column-reverse;
`;

const StyleContainerBottom = css`
  bottom: 0;
  flex-direction: column;
`;

function getStyleForPlacement(zindex: number, placement: Placement) {
  switch (placement) {
    case "top":
    case "top-center":
      return [StyleContainer(zindex, "center"), StyleContainerTop];
    case "left":
    case "left-middle":
    case "left-top":
    case "top-left":
      return [StyleContainer(zindex, "flex-start"), StyleContainerTop];
    case "right":
    case "right-middle":
    case "right-top":
    case "top-right":
      return [StyleContainer(zindex, "flex-end"), StyleContainerTop];
    case "bottom":
    case "bottom-center":
      return [StyleContainer(zindex, "center"), StyleContainerBottom];
    case "left-bottom":
    case "bottom-left":
      return [StyleContainer(zindex, "flex-start"), StyleContainerBottom];
    case "right-bottom":
    case "bottom-right":
      return [StyleContainer(zindex, "flex-end"), StyleContainerBottom];
  }
}

function getToastAnimationDirection(placement: Placement): Direction {
  switch (placement) {
    case "top":
    case "top-center":
    case "left":
    case "left-middle":
    case "left-top":
    case "top-left":
    case "right":
    case "right-middle":
    case "right-top":
    case "top-right":
      return "down";
    case "bottom":
    case "bottom-center":
    case "left-bottom":
    case "bottom-left":
    case "right-bottom":
    case "bottom-right":
      return "up";
  }
}

type StackProps = ToasterOptions & {
  toaster: Toaster;
};

function Stack({
  toaster,
  placement = "top",
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  p,
  pt,
  pr,
  pb,
  pl,
  ...options
}: StackProps) {
  const theme = useTheme();
  const colorMode = useColorMode();

  // re-render the stack when store composition changes
  const forceUpdate = useForceUpdate();
  useEffect(() => {
    toaster.subscribe(forceUpdate);
    return () => {
      toaster.unsubscribe(forceUpdate);
    };
  }, [toaster, forceUpdate]);

  const toasts: JSX.Element[] = [];
  toaster.toasts.forEach(({ id, content, ...other }) =>
    toasts.push(
      <Toast
        key={id}
        {...other}
        {...options}
        colorMode={colorMode}
        animationDirection={getToastAnimationDirection(placement)}
        onClosed={() => toaster.removeToast(id)}>
        {content}
      </Toast>
    )
  );

  const paddingProps = { padding, paddingTop, paddingRight, paddingBottom, paddingLeft, p, pt, pr, pb, pl };
  return <div css={[...getStyleForPlacement(theme.zindex.toast, placement), StylePadding(paddingProps)]}>{toasts}</div>;
}

/**
 * Global variable referencing the root DOM node hosting all stacks.
 */
let toastRoot: HTMLElement | null;

/**
 * Gets the toast root element creating one if does not exist yet.
 */
function getToastRoot() {
  if (!toastRoot) {
    // check if the root already exists in DOM and create new one if not
    toastRoot = document.getElementById("eb-toast-root");
    if (!toastRoot) {
      toastRoot = document.createElement("div");
      toastRoot.setAttribute("id", "eb-toast-root");
      toastRoot.setAttribute("eb-toast-root", "");
      document.body.appendChild(toastRoot);
    }
  }

  return toastRoot;
}

export default class implements Toaster {
  private __counter: ToastId;
  private readonly __root: HTMLElement;
  private readonly __subscriptions: Set<ToastCallback>;

  public readonly toasts: Map<number, ToastProps & { id: number; content: React.ReactNode }>;

  constructor(options: ToasterOptions) {
    this.__counter = 0;
    this.__subscriptions = new Set();
    this.toasts = new Map();

    this.__root = document.createElement("div");
    getToastRoot().appendChild(this.__root);

    ReactDOM.render(<Stack toaster={this} {...options} />, this.__root);
  }

  public dispose = () => {
    this.__subscriptions.clear();
    this.__root.remove();
  };

  public subscribe = (callback: ToastCallback) => {
    this.__subscriptions.add(callback);
  };

  public unsubscribe = (callback: ToastCallback) => {
    this.__subscriptions.delete(callback);
  };

  public publish = () => {
    this.__subscriptions.forEach((callback) => {
      callback.call(this);
    });
  };

  public createToast = (intent: Intent, header: React.ReactNode, content: React.ReactNode, options?: ToastOptions) => {
    const id = ++this.__counter;
    this.toasts.set(id, {
      id: id,
      visible: true,
      intent: intent,
      header: header,
      content: content,
      onAction: options?.onAction,
      actionContent: options?.actionContent,
      actionHidden: options?.actionHidden,
      duration: options?.duration,
      iconColor: options?.icon?.name,
      iconName: options?.icon?.name,
      iconData: options?.icon?.data,
      iconSize: options?.icon?.size,
    });
    this.publish();
    return id;
  };

  public removeToast = (id: ToastId) => {
    this.toasts.delete(id);
    this.publish();
  };

  public message = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("none", header, content, options);

  public notify = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("neutral", header, content, options);

  public success = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("success", header, content, options);

  public warning = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("warning", header, content, options);

  public error = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("error", header, content, options);

  public danger = (header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions) =>
    this.createToast("danger", header, content, options);

  public close = (id: ToastId) => {
    const toast = this.toasts.get(id);
    if (toast) {
      toast.visible = false;
      this.publish();
    }
  };

  public closeAll = () => {
    this.toasts.forEach((toast) => (toast.visible = false));
    this.publish();
  };
}

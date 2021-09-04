import { Color, Intent, PaddingProps, PaletteTextSlot, Placement } from "@apptane/react-ui-core";
import { IconData } from "@apptane/react-ui-icon";
import { ToastAppearance } from "@apptane/react-ui-theme";
import { ToastProps } from "./Toast.types";

export type ToastCallback = () => void;
export type ToastId = number;

export type ToastOptions = {
  /**
   * Duration of the toast in seconds before it automatically disappears.
   * 0 or -1 to show indefinitely until it is manually closed.
   */
  duration?: number;

  /**
   * Content of the action button. Defaults to "Hide".
   */
  actionContent?: React.ReactNode;

  /**
   * Indicates whether action block should be hidden.
   */
  actionHidden?: boolean;

  /**
   * Callback invoked when the action button is clicked.
   * By default toast hides itself afterwards, unless
   * the action callback return value is `truthy`.
   */
  onAction?: () => boolean;

  /**
   * Overrides icon properties.
   */
  icon?: {
    color?: Color | PaletteTextSlot;
    name?: string;
    data?: IconData;
    size?: number;
  };
};

export type ToasterOptions = PaddingProps & {
  /**
   * Visual appearance. Defaults to "dark".
   */
  appearance?: ToastAppearance;

  /**
   * Overrides maximum width specified by the theme.
   */
  maxWidth?: number;

  /**
   * Placement of the toasts on the viewport. Defaults to `top`.
   */
  placement?: Placement;
};

export interface Toaster {
  /**
   * Toasts managed by this toaster.
   */
  readonly toasts: Map<number, ToastProps & { id: number; content: React.ReactNode }>;

  /**
   * Subscribes to notifications.
   * This method is intended for internal consumption.
   */
  subscribe(callback: ToastCallback): void;

  /**
   * Unsubscribes from notifications.
   * This method is intended for internal consumption.
   */
  unsubscribe(callback: ToastCallback): void;

  /**
   * Publishes notifications.
   * This method is intended for internal consumption.
   */
  publish(): void;

  /**
   * Disposes the instance and frees resources.
   */
  dispose(): void;

  /**
   * Creates a toast and returns its identifier.
   * @param intent intent
   * @param header header
   * @param content body
   * @param options options
   */
  createToast(intent: Intent, header: React.ReactNode, content: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Removes toast with the specified identifier from the stack.
   * This is internal method, external consumers should use `close`.
   */
  removeToast(id: ToastId): void;

  /**
   * Creates default toast with no intent set.
   */
  message(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Creates a notification toast (intent = `neutral`).
   */
  notify(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Creates a success toast (intent = `success`).
   */
  success(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Creates a warning toast (intent = `warning`).
   */
  warning(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Creates an error toast (intent = `error`).
   */
  error(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Creates a danger toast (intent = `danger`).
   */
  danger(header: React.ReactNode, content?: React.ReactNode, options?: ToastOptions): ToastId;

  /**
   * Closes the toast with the specified identifier.
   * @param id identifier of the toast
   */
  close(id: ToastId): void;

  /**
   * Closes all toasts.
   */
  closeAll(): void;
}

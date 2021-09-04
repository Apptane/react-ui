import { BuiltinGlyphsNamespace, Intent } from "../CommonTypes";

/**
 * Gets the default icon and color based on the intent.
 */
export function getIntentIconAndColor(intent: Intent) {
  switch (intent) {
    case "success":
      return [BuiltinGlyphsNamespace + "check-circle", "success"];
    case "warning":
      return [BuiltinGlyphsNamespace + "warning-circle", "warning"];
    case "danger":
    case "error":
      return [BuiltinGlyphsNamespace + "warning-circle", "error"];
    default:
      return [BuiltinGlyphsNamespace + "info-circle", "muted"];
  }
}

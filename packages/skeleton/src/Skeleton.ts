import SkeletonBlock from "./SkeletonBlock";
import { SkeletonBlockProps } from "./SkeletonBlock.types";
import SkeletonText from "./SkeletonText";
import { SkeletonTextProps } from "./SkeletonText.types";

/**
 * `Skeleton` component — combines text and block-type skeletons.
 */
class Skeleton {
  public static Text: (props: SkeletonTextProps) => JSX.Element;
  public static Block: (props: SkeletonBlockProps) => JSX.Element;
}

/**
 * One or more lines of text.
 */
Skeleton.Text = SkeletonText;

/**
 * Round or rectangular block.
 */
Skeleton.Block = SkeletonBlock;

export default Skeleton;

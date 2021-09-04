import { reversePalette } from "@apptane/react-ui-core";
import DefaultAnimation from "./Animation";
import DefaultAvatarTheme from "./components/AvatarTheme";
import DefaultBackdropTheme from "./components/BackdropTheme";
import DefaultBadgeTheme from "./components/BadgeTheme";
import DefaultBannerTheme from "./components/BannerTheme";
import DefaultBulletTheme from "./components/BulletTheme";
import DefaultButtonTheme from "./components/ButtonTheme";
import DefaultCalendarTheme from "./components/CalendarTheme";
import DefaultChartHexBinTheme from "./components/ChartHexBinTheme";
import DefaultChartPieTheme from "./components/ChartPieTheme";
import DefaultChartXYTheme from "./components/ChartXYTheme";
import DefaultDialogTheme from "./components/DialogTheme";
import DefaultDividerTheme from "./components/DividerTheme";
import DefaultDropdownTheme from "./components/DropdownTheme";
import DefaultFieldLabelTheme from "./components/FieldLabelTheme";
import DefaultFormTheme from "./components/FormTheme";
import DefaultHyperlinkTheme from "./components/HyperlinkTheme";
import DefaultInputBoxTheme from "./components/InputBoxTheme";
import DefaultInputCheckTheme from "./components/InputCheckTheme";
import DefaultInputSliderTheme from "./components/InputSliderTheme";
import DefaultInputToggleTheme from "./components/InputToggleTheme";
import DefaultMenuTheme from "./components/MenuTheme";
import DefaultPaneTheme from "./components/PaneTheme";
import DefaultProgressTheme from "./components/ProgressTheme";
import DefaultRadioButtonTheme from "./components/RadioButtonTheme";
import DefaultScrollerTheme from "./components/ScrollerTheme";
import DefaultSideBarTheme from "./components/SideBarTheme";
import DefaultSidePanelTheme from "./components/SidePanelTheme";
import DefaultSkeletonTheme from "./components/SkeletonTheme";
import DefaultTableViewTheme from "./components/TableViewTheme";
import DefaultTabsTheme from "./components/TabsTheme";
import DefaultTagTheme from "./components/TagTheme";
import DefaultToastTheme from "./components/ToastTheme";
import DefaultTooltipTheme from "./components/TooltipTheme";
import DefaultElevation from "./Elevation";
import DefaultPalette from "./Palette";
import { Theme } from "./Theme.types";
import DefaultTypography from "./Typography";
import DefaultZIndex from "./ZIndex";

const DefaultTheme: Theme = {
  palette: {
    light: DefaultPalette,
    dark: reversePalette(DefaultPalette),
  },

  typography: DefaultTypography,
  zindex: DefaultZIndex,
  animation: DefaultAnimation,
  elevation: DefaultElevation,
  backdrop: DefaultBackdropTheme,

  components: {
    avatar: DefaultAvatarTheme,
    badge: DefaultBadgeTheme,
    banner: DefaultBannerTheme,
    bullet: DefaultBulletTheme,
    button: DefaultButtonTheme,
    calendar: DefaultCalendarTheme,
    dialog: DefaultDialogTheme,
    divider: DefaultDividerTheme,
    dropdown: DefaultDropdownTheme,
    form: DefaultFormTheme,
    fieldLabel: DefaultFieldLabelTheme,
    hyperlink: DefaultHyperlinkTheme,
    inputBox: DefaultInputBoxTheme,
    inputCheck: DefaultInputCheckTheme,
    inputSlider: DefaultInputSliderTheme,
    inputToggle: DefaultInputToggleTheme,
    menu: DefaultMenuTheme,
    pane: DefaultPaneTheme,
    progress: DefaultProgressTheme,
    radioButton: DefaultRadioButtonTheme,
    scroller: DefaultScrollerTheme,
    sideBar: DefaultSideBarTheme,
    sidePanel: DefaultSidePanelTheme,
    skeleton: DefaultSkeletonTheme,
    tableView: DefaultTableViewTheme,
    tabs: DefaultTabsTheme,
    tag: DefaultTagTheme,
    toast: DefaultToastTheme,
    tooltip: DefaultTooltipTheme,
  },

  charts: {
    hexbin: DefaultChartHexBinTheme,
    xy: DefaultChartXYTheme,
    pie: DefaultChartPieTheme,
  },
};

/**
 * Default theme.
 */
export default DefaultTheme;

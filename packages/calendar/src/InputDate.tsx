import { InputDropdown, InputDropdownProps } from "@apptane/react-ui-input";
import { Calendar } from "./Calendar";
import { InputDateProps, InputDatePropTypes } from "./InputDate.types";

const DateFormatOptions: Intl.DateTimeFormatOptions = {
  dateStyle: "full",
};

/**
 * `InputDate` component — dropdown calendar input control for date values.
 */
function InputDate({ rangeStart, rangeEnd, notBefore, notAfter, weekStartsOnSunday, ...other }: InputDateProps) {
  const control: InputDropdownProps<Date>["control"] = (value, onChange, close) => (
    <Calendar
      colorMode={other.colorMode}
      rangeStart={rangeStart}
      rangeEnd={rangeEnd}
      notBefore={notBefore}
      notAfter={notAfter}
      weekStartsOnSunday={weekStartsOnSunday}
      panes={1}
      selected={value ?? undefined}
      onClick={(v) => {
        if (onChange != null) {
          onChange(v);
        }
        close();
      }}
    />
  );

  const formatValue =
    other.formatValue ?? ((v) => (v == null ? "" : v.toLocaleDateString(undefined, DateFormatOptions)));

  return <InputDropdown<Date> {...other} formatValue={formatValue} control={control} />;
}

InputDate.displayName = "InputDate";
InputDate.propTypes = InputDatePropTypes;

export default InputDate;

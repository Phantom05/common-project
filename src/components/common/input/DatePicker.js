import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {createGlobalStyle} from 'styled-components';
import Grid from '@material-ui/core/Grid';
import {color} from 'styles/__utils';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

/**
 * <DatePicker 
    value={date}
    className="CreateCase_input date"
    onChange={handleDateChange}
  />
 * @param {*} props 
 */
function DatePicker(props) {
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            {...props}
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            id="date-picker-inline"
            inputVariant="outlined"
          />
        </Grid>
      </MuiPickersUtilsProvider>
      <Styled.GlobalStyles />
    </div>
  );
}

const Styled = {
    GlobalStyles:createGlobalStyle`
      .MuiPickersDay-daySelected{
        background-color:${color.blue} !important;
      };
    `
}

export default DatePicker;
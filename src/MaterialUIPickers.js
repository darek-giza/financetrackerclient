import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers({selected,onChange}) {
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="flex-start">
        <KeyboardDatePicker
          
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="dd/MM/yyyy"
          value={selected}
          onChange={onChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
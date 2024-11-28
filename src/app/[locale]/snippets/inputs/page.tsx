'use client';
import Checkbox from '@/components/ui/inputs/Checkbox';
import Radio from '@/components/ui/inputs/Radio';
import Select from '@/components/ui/inputs/Select';
import TextField from '@/components/ui/inputs/TextField';
import Text from '@/components/ui/typo';
import { top100Films } from '@/data';
import {
  Autocomplete,
  Box,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  RadioGroup,
  SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

export default function InputsPage() {
  const [value, setValue] = useState<string>('');
  const [checked, setChecked] = useState<boolean>();
  const [radioValue, setRadioValue] = useState<string>('female');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  return (
    <Container>
      <Box>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField placeholder="Without Label" />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField label="With Label" />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                label="Custom Color TextField"
                //TODO: rewrite this sx in TextFieldStyled
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: '1px solid yellow', // default border color
                    },
                    '&:hover fieldset': {
                      borderColor: 'green', // hover border color
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'green', // focused border color
                    },
                  },
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                error
                id="outlined-error-helper-text"
                label="Error"
                defaultValue="Hello World"
                helperText="Incorrect entry."
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <TextField
                id="outlined-multiline-static"
                label="Multiline"
                multiline
                rows={4}
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit."
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Select
                label="Select"
                options={[
                  {
                    label: 'Select One',
                    value: 'Select One',
                  },
                  {
                    label: 'Select Two',
                    value: 'Select Two',
                  },
                  {
                    label: 'Select Three',
                    value: 'Select Three',
                  },
                ]}
                value={value}
                onChange={(event: SelectChangeEvent) => {
                  setValue(event.target.value as string);
                }}
              />
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2 flex items-center justify-center">
              <Autocomplete
                disablePortal
                options={top100Films}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Autocomplete" />}
              />
            </Paper>
          </Grid>
        </Grid>
        <Grid container columns={12}>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2">
              <Text variant="subtitle2" className="text-sm italic text-red-500">
                Please follow FormGroup from docs*
              </Text>
              <FormControl error={!checked}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Default Checked" />
                  <div>
                    <FormControlLabel
                      required
                      control={<Checkbox onChange={handleChange} />}
                      label="Required"
                    />
                    <FormHelperText>You can display an error</FormHelperText>
                  </div>
                  <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
                </FormGroup>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={3} className="p-4">
            <Paper className="p-4 space-y-2">
              <Text variant="subtitle2" className="text-sm italic text-red-500">
                Please follow RadioGroup from docs*
              </Text>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={radioValue}
                  onChange={handleRadioChange}
                  defaultValue="female"
                >
                  <FormControlLabel value="female" control={<Radio />} label="Female" />
                  <FormControlLabel value="male" control={<Radio />} label="Male" />
                </RadioGroup>
              </FormControl>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

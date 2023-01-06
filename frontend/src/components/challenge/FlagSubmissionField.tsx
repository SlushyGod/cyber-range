import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { checkFlag } from '../../api/HttpRequests.tsx';

// Should probable create challenge and task objects to store the data and perform actions and whatnot
// Can even do, challenge.checkFlag(), challenge.createTask()
// Is there a best practice for loading in tree files? should they be relative to current file
//    or relative to the root project?
const FlagSubmissionField = (group: string, name: string) => {
  const [flag, setFlag] = React.useState('');

  const handleCheckFlag = () => {
    checkFlag(flag, group, name)
      .then(resp => {
        if (resp == 1) alert('success');
        else alert('failed');
      }).catch(err => {
        console.log(err);
      });
  }

  const handleFlagChange = (e) => {
    setFlag(e.target.value);
  }

  return (
    <Box sx={{ display: 'flex', 'flexWrap': 'wrap' }}>
      <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
        <InputLabel htmlFor="outlined-flag">flag{"{}"}</InputLabel>
        <OutlinedInput
          id="outlined-flag"
          type="text"
          label="flag{}"
          value={flag}
          onChange={handleFlagChange}
        />
      </FormControl>

      <Button onClick={handleCheckFlag}>Submit</Button>
    </Box>
  );
}

export default FlagSubmissionField;

import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({rate}) {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        display: "flex", width: 240, mt: 2, ml: 5, justifyContent: 'space-around'
      }}
    >
      {/* <Typography component="legend">Controlled</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      /> */}
      <Typography component="legend" sx={{fontWeight: "bold"}}>{rate}</Typography>
      <Rating name="read-only" value={rate} readOnly precision={0.5} />
      <Typography sx={{minWidth: 100, display: 'flex', color: 'grey', mt: .3, ml: 1, fontSize: 14, fontWeight: "bold"}}>45 Reviews</Typography>
      {/* <Typography component="legend">Disabled</Typography>
      <Rating name="disabled" value={value} disabled />
      <Typography component="legend">No rating given</Typography>
      <Rating name="no-value" value={null} /> */}
    </Box>
  );
}

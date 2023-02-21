import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function BasicRating({rate, total, count}) {
  const [value, setValue] = React.useState(2);

  return (
    <Box
      sx={{
        display: "flex", width: total ? 240 : 140, mt: 2, ml: 5, justifyContent: 'space-around'
      }}
    >
      <Typography component="legend" sx={{fontWeight: "bold"}}>{rate}</Typography>
      <Rating name="read-only" value={rate} readOnly precision={0.5} />
      {total && <Typography sx={{minWidth: 100, display: 'flex', color: 'grey', mt: .3, ml: 1, fontSize: 14, fontWeight: "bold"}}>{count} Reviews</Typography>}
    </Box>
  );
}

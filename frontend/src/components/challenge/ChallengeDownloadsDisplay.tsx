import * as React from 'react';
import Typography from '@mui/material/Typography';

const ChallengeDownloadsDisplay = (downloads: string[]) => {
  const baseUrl = "https://trey-cyber-range.s3.us-east-2.amazonaws.com/";

  // Why do I have to use downloads twice??
  let downloadsElem = downloads.downloads.map((download, index) => 
    <Typography variant="body2">
      <a href="{baseUrl + download}" target="_blank">{download}</a>
    </Typography>
  );

  return (
    <>
      Downloads
      {downloadsElem}
    </>
  );
}

export default ChallengeDownloadsDisplay;

import MuiBox from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { SIZES } from 'const';

export const Main = styled('main')(({ theme }) => ({
  height: '100vh',
  overflow: 'hidden',
}));

export const Box = styled(MuiBox)(({ theme }) => ({
  overflow: 'hidden',
  '& .leaflet-container': {
    height: SIZES.MAP_HEIGHT.default,
  },
  [theme.breakpoints.up('sm')]: {
    '& .leaflet-container': {
      height: SIZES.MAP_HEIGHT.upSmall,
    },
  },
  [theme.breakpoints.up('md')]: {
    '& .leaflet-container': {
      height: 'clamp(400px, 100%, 100vh)', // ? not sure but it's working
    },
  },
}));
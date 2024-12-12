import { styled } from '@mui/material/styles';

export const StyledStack = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  padding: '15px',
  backgroundColor: '#F8F8F8',
  gap: theme.spacing(2),
  '& .MuiFormControl-root': {
    minWidth: '250px',
  },
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  [theme.breakpoints.between('sm', 'md')]: {
    flexDirection: 'row',
    gap: theme.spacing(1),
    overflow: 'scroll',
  }
}));

export const StyledTitle = styled('h1')(({ theme }) => ({
  whiteSpace: 'nowrap',
  fontSize: '24px',
  fontWeight: 'bold',
}));

export const StyledSubTitle = styled('h2')(({ theme }) => ({
  fontSize: '16px',
}));

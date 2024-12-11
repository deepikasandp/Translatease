import React from 'react';
import { styled } from '@mui/material/styles';
import Field from './Field';

const StyledStack = styled('div')(({ theme }) => ({
  display: 'flex',
  direction: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
  spacing: theme.spacing(2),
  backgroundColor: '#F8F8F8',
  padding: '15px',
}));

const Search = (props) => {
  const {fields } = props.sectionConfig;
  return (
    <StyledStack>
    {fields.map((field) => (
      <Field key={field.key} field={field} handleChange={props.handleChange} pageData={props.pageData} />
    ))}
    </StyledStack>
  );
};

export default Search;

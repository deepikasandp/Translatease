import React from 'react';
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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

const StyledTitle = styled('h1')(({ theme }) => ({
  whiteSpace: 'nowrap',
  fontSize: '24px',
  fontWeight: 'bold',
}));

const StyledSubTitle = styled('h2')(({ theme }) => ({
  fontSize: '16px',
}));

const LanguageSelector = (props) => {
  const {titleKey, descriptionKey, fields } = props.sectionConfig;
  const { t } = useTranslation();
  
  const getTranslatedValue = (key) => t(key);

  return (
    <StyledStack>
      <div>
        <StyledTitle>{getTranslatedValue(titleKey)}</StyledTitle>
        <StyledSubTitle>{getTranslatedValue(descriptionKey)}</StyledSubTitle>
      </div>
      {fields.map((field) => {
        const value = field.path.split('.').reduce((obj, key) => obj?.[key], props.pageData);
        switch (field.type) {
          case 'select':
            return (
              <FormControl 
                sx={{minWidth: '200px'}}
                key={field.path}
              >
                <InputLabel id={field.key}>{getTranslatedValue(field.labelKey)}</InputLabel>
                <Select
                  labelId={field.key}
                  label={getTranslatedValue(field.labelKey)}
                  value={value || props.defaultLanguage}
                  onChange={(e) => props.handleChange(field.path, e.target.value)}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.key} value={option.key}>
                      {getTranslatedValue(option.labelKey)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            );
            default:
              return null;
          }
        })}
    </StyledStack>
  );
};

export default LanguageSelector;

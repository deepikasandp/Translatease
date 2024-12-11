import React from 'react';
import PropTypes from 'prop-types';
import { useCommonContext } from '../../context/CommonContext';
import {FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { SectionConfig } from './types'; 

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
  const { config, landingPageData, handleChange } = useCommonContext();
  const {titleKey, descriptionKey, fields } = props.sectionConfig;
  const { t } = useTranslation();
  
  const getTranslatedValue = (key) => t(key);

  const handleLanguageChange = (path, value) => {
    handleChange(path, value);
    props.onLanguageChange(value); // Propagates the change to the App level
  };

  return (
    <StyledStack>
      <div>
        <StyledTitle>{getTranslatedValue(titleKey)}</StyledTitle>
        <StyledSubTitle>{getTranslatedValue(descriptionKey)}</StyledSubTitle>
      </div>
      {fields.map((field) => {
        const value = field.path.split('.').reduce((obj, key) => obj?.[key], landingPageData);
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
                  value={(value || config.defaultLanguage) ?? ''}
                  onChange={(e) => handleLanguageChange(field.path, e.target.value)}
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

LanguageSelector.propTypes = {
  sectionConfig: PropTypes.shape(SectionConfig).isRequired,
  onLanguageChange: PropTypes.func.isRequired,
};

export default LanguageSelector;

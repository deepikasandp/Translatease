import React from 'react';
import PropTypes from 'prop-types';
import { useCommonContext } from '../../context/CommonContext';
import {FormControl, InputLabel, Select, MenuItem, Box, TextField, Button} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { Field as FieldType } from './types'; 

const Field = (props) => {
  const { landingPageData, handleChange } = useCommonContext();
  const { field } = props;
  const { t } = useTranslation();

  const getTranslatedValue = (key) => t(key);
  const value = field.path?.split('.').reduce((obj, key) => obj?.[key], landingPageData);
 
  switch (field.type) {
    case 'select':
      return (
        <FormControl
          key={field.path}
        >
          <InputLabel id={field.key}>{getTranslatedValue(field.labelKey)}</InputLabel>
          <Select
            labelId={field.key}
            label={getTranslatedValue(field.labelKey)}
            value={value ?? ''}
            onChange={(e) => handleChange(field.path, e.target.value)}
            key={field.path}
          >
            {field.options?.map((option) => (
              <MenuItem key={option.key} value={option.key}>
                {getTranslatedValue(option.labelKey)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      );
    case 'date':
      return (
        <Box display="flex" gap={4} key={field.key}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={getTranslatedValue(field.labelKey)}
              value={value ? dayjs(value) : null} 
              onChange={(newValue) => {
                const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null;
                handleChange(field.path, formattedDate);
              }}
            />
          </LocalizationProvider>
        </Box>
      );
    case 'text':
      return (
        <TextField
          placeholder={getTranslatedValue(field.placeholderKey)}
          label={getTranslatedValue(field.labelKey)}
          value={value ?? ''}
          onChange={(e) => handleChange(field.path, e.target.value)}
          fullWidth
          key={field.key}
        />
      );
    case 'button':
      return (
        <div 
          key={field.key}
          style={{ padding: '10px' }}
        >
          <Button variant="outlined">{getTranslatedValue(field.labelKey)}</Button>
      </div>
      );
    default:
      return null;
  }
};

Field.propTypes = {
  field: PropTypes.shape(FieldType).isRequired,
};

export default Field;

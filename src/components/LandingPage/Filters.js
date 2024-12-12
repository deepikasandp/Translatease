import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { SectionConfig } from './types'; 
import { StyledStack } from '../../styles/landingPageStyles';

const Filters = (props) => {
  const { fields } = props.sectionConfig;

  return (
    <StyledStack>
      {fields.map((field) => (
        <Field key={field.key} field={field} />
      ))}
    </StyledStack>
  );
};

Filters.propTypes = {
  sectionConfig: PropTypes.shape(SectionConfig).isRequired,
};

export default Filters;

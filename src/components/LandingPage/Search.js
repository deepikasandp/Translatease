import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import { SectionConfig } from './types';
import { StyledStack } from '../../styles/landingPageStyles';

const Search = (props) => {
  const {fields } = props.sectionConfig;
  return (
    <StyledStack>
      {fields.map((field) => (
        <Field key={field.key} field={field} />
      ))}
    </StyledStack>
  );
};

Search.propTypes = {
  sectionConfig: PropTypes.shape(SectionConfig).isRequired,
};

export default Search;

import PropTypes from 'prop-types';

export const Field = {
  path: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      labelKey: PropTypes.string.isRequired,
    })
  ),
};

export const SectionConfig = {
  titleKey: PropTypes.string.isRequired,
  descriptionKey: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.shape(Field)).isRequired,
};

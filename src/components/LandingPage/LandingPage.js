import React from 'react';
import PropTypes from 'prop-types';
import { useCommonContext } from '../../context/CommonContext';
import { Container, Paper } from '@mui/material';
import LanguageSelector from  './LanguageSelector';
import Search from  './Search';
import Filters from  './Filters';

const LandingPage = ( {onLanguageChange} ) => {
  const { landingPageConfig, landingPageData } = useCommonContext();

  // console.log(landingPageConfig);
  // console.log(landingPageData);

  return (
    <div>
      {landingPageConfig && landingPageConfig.sections ? (
        <div>
          <Container key="container" sx={{ backgroundColor: "#F0F0F0", paddingY: "20px" }}>
            {landingPageConfig.sections.map((section) => {   
              switch (section.type) {
                case 'header':
                  return (
                    <LanguageSelector
                      key={section.type}
                      sectionConfig={section}
                      onLanguageChange={onLanguageChange}
                    />
                  );
                case 'search':
                  return (
                    <Search
                      key={section.type}
                      sectionConfig={section}
                    />
                  );
                case 'filters':
                  return (
                    <Filters
                      key={section.type}
                      sectionConfig={section}
                    />
                  );
                default:
                  return null;
              }
            })}
            <hr/>
            <div key="data">
              <Paper variant="elevation" style={{ margin: '10px' }}>
                <div key="data1" style={{ textAlign: 'left', padding: '10px'}}>
                  <span>POST Data:</span>
                  <pre>{JSON.stringify(landingPageData, null, 2)}</pre>
                </div>
              </Paper>
            </div>
          </Container>
        </div>
      ) : (
        <div key="loading">Loading configuration...</div>
      )}
    </div>
  );
};

LandingPage.propTypes = {
  onLanguageChange: PropTypes.func.isRequired, // A function to handle language change
};

export default LandingPage;

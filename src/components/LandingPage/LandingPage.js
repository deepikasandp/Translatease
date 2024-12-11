import React, { useState, useEffect } from 'react';
import { Container, Paper } from '@mui/material';
import LanguageSelector from  './LanguageSelector';
import Search from  './Search';
import Filters from  './Filters';
import { setDeep } from '../utils';

const LandingPage = ({ config, object, language, onLanguageChange }) => {
  const [currentConfig, setCurrentConfig] = useState([]);
  const [pageData, setPageData] = useState({});

  useEffect(() => {
    if (Array.isArray(config)) {
      const landingPageConfig = config.find((page) => page.name === 'LandingPage');
      if (landingPageConfig) {
        setCurrentConfig(landingPageConfig);
      } else {
        console.error('LandingPage config not found.');
      }
    } else {
      console.error('Config is not an array:', config);
    }
  }, [config]);

  useEffect(() => {
    setPageData(object);
  }, [object]);

  const handleChange = (path, value) => {
    setPageData(setDeep(pageData, path, value));
  };

  const handleLanguageChange = (path, value) => {
    handleChange(path, value);
    onLanguageChange(value); // Propagates the change to the App level
  };
  
  // console.log(currentConfig);

  return (
    <div>
      {currentConfig && currentConfig.sections ? (
        <div>
          <Container key="container" sx={{ backgroundColor: "#F0F0F0", paddingY: "20px" }}>
            {currentConfig.sections.map((section) => {   
              switch (section.type) {
                case 'header':
                  return (
                    <LanguageSelector
                      key={section.type}
                      sectionConfig={section}
                      pageData={pageData} 
                      defaultLanguage={currentConfig.defaultLanguage}
                      handleChange={handleLanguageChange}
                    />
                  );
                case 'search':
                  return (
                    <Search
                      key={section.type}
                      sectionConfig={section}
                      pageData={pageData}
                      handleChange={handleChange}
                    />
                  );
                case 'filters':
                  return (
                    <Filters
                      key={section.type}
                      sectionConfig={section}
                      pageData={pageData}
                      handleChange={handleChange}
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
                  <span>Data:</span>
                  <pre>{JSON.stringify(pageData, null, 2)}</pre>
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

export default LandingPage;

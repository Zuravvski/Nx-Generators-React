import { ConfigContext } from '@sandbox/shared/core';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import App from './app/app';
import { EnvironmentBasedConfigProvider } from './config/EnvironmentBasedConfigProvider';

ReactDOM.render(
  <StrictMode>
    <ConfigContext.Provider value={new EnvironmentBasedConfigProvider()}>
      <App />
    </ConfigContext.Provider>
  </StrictMode>,
  document.getElementById('root')
);

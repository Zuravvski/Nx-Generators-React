import { useConfigProvider } from '@sandbox/shared/core';
import './AdministrationLayout.module.scss';

/* eslint-disable-next-line */
export interface AdministrationLayoutProps {}

export function AdministrationLayout(props: AdministrationLayoutProps) {
  const configProvider = useConfigProvider();

  return (
    <div>
      <h1>Welcome to AdministrationLayout!</h1>
      <p>Is production: {String(configProvider.isProduction())}</p>
      <p>API URL: {configProvider.getApiUrl()}</p>
    </div>
  );
}

export default AdministrationLayout;

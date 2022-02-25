import { render } from '@testing-library/react';

import AdministrationLayout from './AdministrationLayout';

describe('AdministrationLayout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AdministrationLayout />);
    expect(baseElement).toBeTruthy();
  });
});

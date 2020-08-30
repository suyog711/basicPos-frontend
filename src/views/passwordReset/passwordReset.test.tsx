import * as React from 'react';
import { shallow } from 'enzyme';
import PasswordReset from './passwordReset';

describe('PasswordReset', () => {
  test('matches snapshot', () => {
    const wrapper = shallow(<PasswordReset />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Comment from './Comment';

describe('<Comment />', () => {
	it('should render a comment', () => {
		const wrapper = shallow(<Comment />);
	});
});
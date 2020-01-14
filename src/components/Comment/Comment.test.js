import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Comment from './Comment';
import styles from './Comment.module.css';

configure({adapter: new Adapter()});

describe('<Comment />', () => {
	it('should render a comment', () => {
		const wrapper = shallow(<Comment
									key="1"
									id="1"
									author="test"
									comment="test"
									date="2020-01-01T12:00:00"
									replies={[]} />);
		expect(wrapper.find('div.' + styles.comment).length).toEqual(1);
	});
});
import React from 'react';
import Logged from './Logged';

import renderer from 'react-test-renderer';

test('Logged test', ()=> {
    const tree = renderer.create(<Logged/>).toJSON();
    expect(tree).toMatchSnapshot();
})
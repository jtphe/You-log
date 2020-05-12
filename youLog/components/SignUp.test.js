import React from 'react';
import SignUp from './SignUp';
import renderer from 'react-test-renderer';

test('Logged test', ()=> {
    const tree = renderer.create(<SignUp/>).toJSON();
    expect(tree).toMatchSnapshot();
})
import React from 'react';
import SignIn from './SignIn';
import renderer from 'react-test-renderer';

test('Logged test', ()=> {
    const tree = renderer.create(<SignIn/>).toJSON();
    expect(tree).toMatchSnapshot();
})
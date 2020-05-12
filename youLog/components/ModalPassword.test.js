import React from 'react';
import ModalPassword from './ModalPassword';
import renderer from 'react-test-renderer';

test('Logged test', ()=> {
    const tree = renderer.create(<ModalPassword/>).toJSON();
    expect(tree).toMatchSnapshot();
})
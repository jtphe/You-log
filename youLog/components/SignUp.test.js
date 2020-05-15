import React from 'react';
import SignUp from './SignUp';
import renderer from 'react-test-renderer';
import { _insert } from './utils';

describe('SIGN UP TESTS', () => {
    test('[SNAPSHOT]: SIGN UP TEST', () => {
        const tree = renderer.create(<SignUp />).toJSON();
        expect(tree).toMatchSnapshot();
    })

    beforeEach(() => {
        window.fetch = jest.fn().mockRejectedValue({});
    });

    test('[MOCKUP]: INSERT USER TEST', async () => {
        await _insert("Jean", "jean@phe.fr", "testtest")
        expect(window.fetch).toHaveBeenCalledWith("http://jdevalik.fr/api/insertuser.php");
    })
})
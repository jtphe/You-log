import React from 'react';
import SignIn from './SignIn';
import renderer from 'react-test-renderer';
import { _loadUsers } from './utils';

describe('SIGN IN TESTS', () => {
    
    test('[SNAPSHOT]: SIGN IN COMPONENT TEST', () => {
        const tree = renderer.create(<SignIn />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => {
        window.fetch = jest.fn().mockRejectedValue({});
    });

    test('[MOCKUP]: GET ALL USERS TEST', async () => {
        const expectedOptions = {
            method: 'GET'
        }

        _loadUsers()

        expect(window.fetch).toHaveBeenCalledWith("http://jdevalik.fr/api/getusers.php", expectedOptions)
    });

});



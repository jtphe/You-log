import React from 'react';
import ModalPassword from './ModalPassword';
import renderer from 'react-test-renderer';
import { _updatePassword } from './utils';

describe('MODAL PASSWORD TESTS', () => {
    test('[SNAPSHOT]: MODAL PASSWORD COMPONENT TEST', () => {
        const tree = renderer.create(<ModalPassword />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    beforeEach(() => {
        window.fetch = jest.fn().mockRejectedValue({});
    });

    test('[MOCKUP]: MODAL PASSWORD TEST', async () => {
        await _updatePassword("jean@phe.fr", "newPassword")
        expect(window.fetch).toHaveBeenCalledWith("http://jdevalik.fr/api/getusers.php")
    });

});

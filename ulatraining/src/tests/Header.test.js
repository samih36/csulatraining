import React from 'react';
import { mount } from 'enzyme';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Router from 'react-router-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js'
import Header from '../Header.js'
import { act } from 'react-dom/test-utils';


configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
    useHistory:jest.fn()
}));

const wrapInAct = async (wrapper) => {
    await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        wrapper.update();
    });
};

let useAuthObj = {
    currentUser: {
        uid: 'testuid123'
    },
    login: {},
    signup: {},
    resetPassword: {},
    logout: {}
}



describe("Header renders", () => {
    it("should render the student header", async () => {

        jest.spyOn(Router, 'useParams').mockReturnValue({ role: 'student' })
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => useAuthObj)

        let fakeDatabase = testing.database();

        fakeDatabase.ref('users/testuid123').set({ role: 'student'});

        const wrapper = mount(<Header database={fakeDatabase} />)
        await wrapInAct(wrapper);
        wrapper.find('.MuiButton-label').last().simulate('click')
        expect(getInnerHTML(wrapper.find('.MuiButton-label').first())).toEqual('My Courses')
        expect(getInnerHTML(wrapper.find('.MuiButton-label').last())).toEqual('Log Out')
    });
    it("should render the professor header", async () => {

        jest.spyOn(Router, 'useParams').mockReturnValue({ role: 'student' })
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => useAuthObj)

        let fakeDatabase = testing.database();

        fakeDatabase.ref('users/testuid123').set({ role: 'professor '});

        const wrapper = mount(<Header database={fakeDatabase} />)
        await wrapInAct(wrapper);
        wrapper.find('.MuiButton-label').last().simulate('click')
        expect(getInnerHTML(wrapper.find('.MuiButton-label').first())).toEqual('My Courses')
        expect(getInnerHTML(wrapper.find('.MuiButton-label').last())).toEqual('Log Out')
    });

})
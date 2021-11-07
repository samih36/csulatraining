import React from 'react';
import { mount } from 'enzyme';
import Router from 'react-router-dom';
import Login from '../Login.js';
import Signup from '../Signup.js';
import ForgotPassword from '../ForgotPassword.js'
import * as AuthContext from '../contexts/AuthContext.js';
import { AuthProvider } from '../contexts/AuthContext.js'
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { getInnerHTML } from './Welcome.test'
import { act } from 'react-dom/test-utils';
import testing from '../testingFirebaseConfig.js'

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
    resetPassword: {}
}



describe("Various Login/Signup/Password Screens Render", () => {
    it("should render the login screen", async () => {

        jest.spyOn(Router, 'useParams').mockReturnValue({ role: 'student' })
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => useAuthObj)

        const wrapper = mount(<AuthProvider><Login /></AuthProvider>)
        await wrapInAct(wrapper);
        expect(getInnerHTML(wrapper.find('.text-center').first())).toEqual('Log In')
    });
    it("should render the signup screen", async () => {

        jest.spyOn(Router, 'useParams').mockReturnValue({ role: 'student' })
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => useAuthObj)

        const wrapper = mount(<Signup />)
        await wrapInAct(wrapper);

        expect(getInnerHTML(wrapper.find('.text-center').first())).toEqual('Sign Up');
    });
    it("should render the forgot password screen", async () => {

        jest.spyOn(Router, 'useParams').mockReturnValue({ role: 'student' })
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => useAuthObj)

        const wrapper = mount(<ForgotPassword />)
        await wrapInAct(wrapper);

        expect(getInnerHTML(wrapper.find('.text-center').first())).toEqual('Password Reset');
    })



})
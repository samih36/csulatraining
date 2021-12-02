import React from 'react';
import { mount } from 'enzyme';
import CourseDashboard from '../ProfessorCourses/CourseDashboard.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Router from 'react-router-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import { act } from 'react-dom/test-utils';
import testing from '../testingFirebaseConfig.js'
import App from '../App.js';

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
 ...jest.requireActual("react-router-dom"),
 useParams: jest.fn(),
}));

const wrapInAct = async (wrapper) => {
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      wrapper.update();
    });
 };

 describe("App page renders correctly", () => {
    it("renders home page", async () => {
        const wrapper = mount(<App />);
        await wrapInAct(wrapper);
        // would expect welcome page to appear
        expect(getInnerHTML(wrapper.find('.welcome'))).toEqual("I am a...");
        expect(getInnerHTML(wrapper.find('.leftcolumn').find('.button'))).toEqual('Student');
        // wrapper.find('.leftcolumn').find('.button').simulate('click');
        // wrapper.find('.rightcolumn').find('.button').simulate('click');
        expect(getInnerHTML(wrapper.find('.rightcolumn').find('.button'))).toEqual('Professor');
    });
});
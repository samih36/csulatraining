import React from 'react';
import { mount } from 'enzyme';
import CreateModule from '../ProfessorCourses/CreateModule.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js';
import Router from 'react-router-dom';

configure({ adapter: new Adapter() });

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
}));

describe("CreateModule creates a module", () => {
    it("should render a module creation page", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        jest.spyOn(Router, 'useParams').mockReturnValue({cid: 'mfklsdjfhfjdk'})
        let fakeDatabase = testing.database();

        const wrapper = mount(<CreateModule database={fakeDatabase} />)

        expect(getInnerHTML(wrapper.find('.createModuleHeader').first())).toEqual("Create a Module")


    })
})
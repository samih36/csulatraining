import React from 'react';
import { mount } from 'enzyme';
import CreateModule from '../ProfessorCourses/CreateModule.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js';
import * as rrd from 'react-router-dom';

configure({ adapter: new Adapter() });

describe("CreateModule creates a module", () => {
    it("should render a module creation page", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }
        let params = {
            cid:"123"
        }
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        jest.spyOn(rrd, 'useParams').mockImplementation(() => params)
        let fakeDatabase = testing.database();

        const wrapper = mount(<CreateModule database={fakeDatabase} />)

        expect(getInnerHTML(wrapper.find('.createModuleHeader').first())).toEqual("Create a Module")

    })
})
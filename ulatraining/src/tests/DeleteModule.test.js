import React from 'react';
import { mount } from 'enzyme';
import DeleteModule from '../ProfessorCourses/DeleteModule.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import { act } from 'react-dom/test-utils';
import testing from '../testingFirebaseConfig.js';
import Router from 'react-router-dom';

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

let fakeCoursesSnapshot = {
    mfklsdjfhfjdk: {
        name: "COMP 123",
        professor: "dfhsakjfkladjfl",
        modules: {
            safjdkjfdsljzzz: {
                name: 'mod1',
                type: 'text',
                content: 'this is an example text module'
            },
            fjudfsahdsadkl: {
                name: 'mod2',
                type: 'text',
                content: 'here is the second text module'
            }
        }
    }
}

let fakeUserCourses = {
    mfklsdjfhfjdk: {
        name: "COMP 123",
        professor: 'dfhsakjfkladjfl',
        modules: {
            safjdkjfdsljzzz: 100,
            fjudfsahdsadkl: 0

        }
    }
}

let user = {
    currentUser: {
        uid: 'dfhsakjfkladjfl',
        role: "professor"
    }
}

let testUsers = {
    teststudent: {
        courses: fakeUserCourses,
        firstName: "Test",
        lastName: "Student",
        onyen: "teststudent",
        role: "student"
    },
    dfhsakjfkladjfl: {
        firstName: "professor",
        lastName: "smart",
        role: "professor"
    }

}

describe("CreateModule creates a module", () => {
    it("should render a module creation page and create a text module", async () => {

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        jest.spyOn(Router, 'useParams').mockReturnValue({cid: 'mfklsdjfhfjdk'})
        let fakeDatabase = testing.database();
        fakeDatabase.ref('users').set(testUsers);
        fakeDatabase.ref('courses').set(fakeCoursesSnapshot);


        const wrapper = mount(<DeleteModule database={fakeDatabase} />)
        await wrapInAct(wrapper);
        wrapper.find('#submitDeleteButton').simulate('click');

        expect(getInnerHTML(wrapper.find('.coursesHeader').first())).toEqual("Modules")


    });
})
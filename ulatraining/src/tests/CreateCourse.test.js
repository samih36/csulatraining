import React from 'react';
import { mount } from 'enzyme';
import CreateCourse from '../ProfessorCourses/CreateCourse.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js'

configure({ adapter: new Adapter() });

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

describe("CreateCourse creates a course", () => {
    it("should render a course creation page", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        let fakeDatabase = testing.database();
        fakeDatabase.ref('users').set(testUsers);
        fakeDatabase.ref('courses').set(fakeCoursesSnapshot);
        

        const wrapper = mount(<CreateCourse database={fakeDatabase} />)
        expect(getInnerHTML(wrapper.find('.coursesHeader').first())).toEqual('Create a Course')
        expect(getInnerHTML(wrapper.find('.courseTitleLabel').first())).toEqual('Course Title:')
        wrapper.find('.advanceButton').last().simulate('click');
        expect((wrapper.find('#courseTitleInput').first())).toBeTruthy()
    })
})
/*
    it("button should create a course in the database", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        let fakeDatabase = testing.database();

        let wrapper = mount(<CreateCourse database={fakeDatabase} />)

        let input = wrapper.find('#courseTitleInput')

        input.instance().value = "hello"

        expect(wrapper.find('#courseTitleInput').instance().value).toEqual("hello")

        wrapper.find('.submitButton').simulate('click')


    })
*/

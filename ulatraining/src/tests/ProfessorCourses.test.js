import React from 'react';
import { mount } from 'enzyme';
import ProfessorCourses from '../ProfessorCourses/ProfessorCourses.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js'

configure({ adapter: new Adapter() });

describe("ProfessorCourses component render with enrolled courses", () => {
    it("should show professor's courses", () => {
        let fakeCoursesSnapshot = {
            mfklsdjfhfjdk: {
                name: "COMP 123",
                professor: "dfhsakjfkladjfl",
                modules: {
                    safjdkjfdslj: 100,
                    lksdhfuaefdskljh: 0
                }
            }
        }

        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);

        let fakeDatabase = testing.database();
        fakeDatabase.ref('users/dfhsakjfkladjfl/courses').set(fakeCoursesSnapshot);
        fakeDatabase.ref('courses').set(fakeCoursesSnapshot)

        const wrapper = mount(<ProfessorCourses database={fakeDatabase} />)

        expect(getInnerHTML(wrapper.find('.coursesHeader').first())).toEqual('courses')
        expect(getInnerHTML(wrapper.find('.course').first())).toEqual("COMP 123")
    })
})
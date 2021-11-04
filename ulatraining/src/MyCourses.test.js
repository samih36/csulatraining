import React from 'react';
import { mount, shallow } from 'enzyme';
import Login from './Login.js';
import { auth } from './firebaseConfig';
import MyCourses from './MyCourses/MyCourses.js';
import * as AuthContext from './contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';

configure({ adapter: new Adapter() });

function getInnerHTML(node) {
    return node.children().reduce((string, node) => {
        return string + node.html() || node.text()
    }, '')
}

describe("MyCourses component render with enrolled courses", () => {
    it("should show classes and progress", () => {
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

        let fakeCourseProgressSnapshot = {
            safjdkjfdslj: {
                name: "testmod1",
                type: 'text',
                passPercentage: 1
            },
            lksdhfuaefdskljh: {
                name: "testmod2",
                type: 'text',
                passPercentage: 1
            }
        }

        let user = {
            currentUser: {
                uid: 'testuid123'
            }
        }

        // let coursesSnapshot = {val: () => fakeCoursesSnapshot};
        // let progressSnapshot = {val: () => fakeCourseProgressSnapshot};

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)


        let fakeDatabase = firebase.database();
        fakeDatabase.ref('users/testuid123/courses').set(fakeCoursesSnapshot);
        fakeDatabase.ref('courses/mfklsdjfhfjdk/modules').set(fakeCourseProgressSnapshot);

        // jest.spyOn(firebase, 'database').mockImplementationOnce(() => ({
        //     ref: jest.fn().mockReturnThis(),
        //     on: jest.fn(() => coursesSnapshot)
        // })).mockImplementationOnce(() => ({
        //     ref: jest.fn().mockReturnThis(),
        //     on: jest.fn(() => progressSnapshot)
        // }));

        const wrapper = mount(<MyCourses database={fakeDatabase} />)
        expect(getInnerHTML(wrapper.find('.coursesHeader').first())).toEqual('courses')
        expect(getInnerHTML(wrapper.find('.course').first())).toEqual('COMP 123')
        expect(getInnerHTML(wrapper.find('.coursesHeader').last())).toEqual('Progress')
        expect(getInnerHTML(wrapper.find('.course').last())).toEqual('50%')

    })
})
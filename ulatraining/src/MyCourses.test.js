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

        let coursesSnapshot = {val: () => fakeCoursesSnapshot};
        let progressSnapshot = {val: () => fakeCourseProgressSnapshot};

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)


        let fakeDatabase = {};

        jest.spyOn(firebase, 'database').mockImplementationOnce(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(coursesSnapshot))
        })).mockImplementationOnce(() => ({
            ref: jest.fn().mockReturnThis(),
            on: jest.fn((event, callback) => callback(progressSnapshot))
        }));

        // jest.spyOn(firebase, 'fakeDatabase').mockImplementationOnce(() => ({
        //     ref: jest.fn().mockReturnThis(),
        //     on: jest.fn((event, callback) => callback(coursesSnapshot))
        // })).mockImplementationOnce(() => ({
        //     ref: jest.fn().mockReturnThis(),
        //     on: jest.fn((event, callback) => callback(progressSnapshot))
        // }));


        const wrapper = mount(<MyCourses database={fakeDatabase} />)
        console.log(wrapper.debug());
        expect(1).toEqual(2);




    })
})
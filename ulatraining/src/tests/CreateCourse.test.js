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

describe("CreateCourse creates a course", () => {
    it("should render a course creation page", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user);
        let fakeDatabase = testing.database();

        const wrapper = mount(<CreateCourse database={fakeDatabase} />)

        expect(getInnerHTML(wrapper.find('.createCourseHeader').first())).toEqual('Create a Course')
        expect(getInnerHTML(wrapper.find('.courseTitleLabel').first())).toEqual('Course Title:')
        expect((wrapper.find('#courseTitleInput').first())).toBeTruthy()
        expect((getInnerHTML(wrapper.find('.submitButton').first()))).toEqual('Submit')
    })
})
/*
    it("button should create a course in the database", () => {
        let user = {
            currentUser: {
                uid: "dfhsakjfkladjfl"
            }
        }
        let key;
        let fakeDatabase = testing.database();
        const wrapper = mount(<CreateCourse database={fakeDatabase}/>)

        jest.spyOn(wrapper, 'handleCreateCourse').mockImplementation(() => {
            let newCoursePush = fakeDatabase.ref('courses').push();
            newCoursePush.set({
                'name': "hello",
                'professor': "dfhsakjfkladjfl"
            })
            database.ref(`users/dfhsakjfkladjfl/courses/${newCoursePush.key}`).set({
                'name': "hello",
                'professor': "dfhsakjfkladjfl"
            })
            key = newCoursePush.key
        });


        wrapper.find('submitButton').simulate('click')
        fakeDatabase.ref(`users/dfhsakjfkladjfl/courses/${key}`).once('value', snapshot =>{
            let module = snapshot.val()
        })


        expect(module).toEqual({ 'name': "hello",
        'professor': "dfhsakjfkladjfl"})


    })

 */

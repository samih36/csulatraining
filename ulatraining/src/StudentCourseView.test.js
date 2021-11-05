import React from 'react';
import { mount } from 'enzyme';
import StudentCourseView from './StudentCourseView.js';
import * as AuthContext from './contexts/AuthContext.js';
import { configure } from "enzyme";
import Router from 'react-router-dom'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import { act } from 'react-dom/test-utils';
import testing from './testingFirebaseConfig.js'


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

describe("StudentCourseView", () => {
    it("should show list modules in the course", async () => {
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
                uid: 'testuid123'
            }
        }
        let container = document.createElement('div');
        document.body.appendChild(container);


        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)
        jest.spyOn(Router, 'useParams').mockReturnValue({cid: 'mfklsdjfhfjdk'})


        let StudentCourseViewDatabase = testing.database();
        StudentCourseViewDatabase.ref('users/testuid123/role').set('student');
        StudentCourseViewDatabase.ref('courses').set(fakeCoursesSnapshot);
        StudentCourseViewDatabase.ref('users/testuid123/courses').set(fakeUserCourses);

        const wrapper = mount(<StudentCourseView database={StudentCourseViewDatabase} />)
        await wrapInAct(wrapper);
        expect(getInnerHTML(wrapper.find('.completedCourse').first())).toEqual('mod1')
        expect(getInnerHTML(wrapper.find('.course').first())).toEqual('mod2')
    })
});
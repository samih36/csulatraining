import React from 'react';
import { mount } from 'enzyme';
import SelectCourse from '../MyCourses/SelectCourse.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import testing from '../testingFirebaseConfig.js'

configure({ adapter: new Adapter() });


describe("SelectCourses Renders with all courses the user is not enrolled in", () => {
    it("should show list of un-enrolled courses", () => {
        let fakeCoursesSnapshot = {
            mfklsdjfhfjdk: {
                name: "COMP 123",
                professor: "dfhsakjfkladjfl",
                modules: {
                    safjdkjfdsljzzz: {
                        name: 'mod1',
                        type: 'text',
                        content: 'this is an example text module'
                    }
                }
            },
            guthelfskjhsadf: {
                name: "COMP 456",
                professor: "sdafuisfhuif",
                modules: {
                    sadfuhdsf: {
                        name: 'mod1st',
                        type: 'text',
                        content: 'some text'
                    }
                }
            }
        }

        let fakeUserCourses = {
            mfklsdjfhfjdk: {
                name: "COMP 123",
                professor: 'dfhsakjfkladjfl',
                modules: {
                    safjdkjfdsljzzz: 100
                }
            }
        }

        let user = {
            currentUser: {
                uid: 'testuid123'
            }
        }

        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)

        let selectCourseDatabase = testing.database();
        selectCourseDatabase.ref('courses').set(fakeCoursesSnapshot);
        selectCourseDatabase.ref('users/testuid123/courses').set(fakeUserCourses);

        const wrapper = mount(<SelectCourse database={selectCourseDatabase} />)
        expect(getInnerHTML(wrapper.find('.coursesHeader').first())).toEqual('classes')
        expect(getInnerHTML(wrapper.find('.addCourseHeader').first())).toEqual('.')
    })
})
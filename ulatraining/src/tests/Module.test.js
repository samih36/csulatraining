import React from 'react';
import { mount } from 'enzyme';
import Module from '../Module.js';
import Router from 'react-router-dom';
import SelectCourse from '../MyCourses/SelectCourse.js';
import * as AuthContext from '../contexts/AuthContext.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import firebase from 'firebase';
import { getInnerHTML } from './Welcome.test'
import { act } from 'react-dom/test-utils';
import testing from '../testingFirebaseConfig.js'

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
            saoeuioeritu: {
                name: 'finalExam',
                introduction: 'welcome to exam',
                moduleNum: 0,
                passPercentage: '0.5',
                questionNum: 1,
                questions: {
                    0: {
                        choice_num: 4,
                        text: "what is my favorite color",
                        type: "mco",
                        answers: {
                            0: 'yellow',
                            1: 'red',
                            2: 'orange',
                            3: 'green'
                        },
                        correctChoices: {
                            0: "D"
                        }
                    }
                },
                type: 'quiz',
                showFeedback: true,
                shuffleChoices: false
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

let user = {
    currentUser: {
        uid: 'testuid123'
    }
}

describe("correct module renders", () => {
    it("should render a text module", async () => {
        
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)
        jest.spyOn(Router, 'useParams').mockReturnValue({cid: 'mfklsdjfhfjdk', mid: 'safjdkjfdsljzzz'})

        let moduleDatabase = testing.database();
        moduleDatabase.ref('courses').set(fakeCoursesSnapshot);

        const wrapper = mount(<Module database={moduleDatabase} />)
        await wrapInAct(wrapper);
        expect(getInnerHTML(wrapper.find('.moduleName'))).toEqual('mod1')
        expect(getInnerHTML(wrapper.find('.moduleContent'))).toEqual('this is an example text module')
    });

    it("should render a quiz module", async () => {
        jest.spyOn(AuthContext, 'useAuth').mockImplementation(() => user)
        jest.spyOn(Router, 'useParams').mockReturnValue({cid: 'mfklsdjfhfjdk', mid: 'saoeuioeritu'})

        let mock = testing.database();
        mock.ref('courses').set(fakeCoursesSnapshot);

        const wrapper = mount(<Module database={mock} />)
        await wrapInAct(wrapper);
        
        expect(getInnerHTML(wrapper.find('.quizTitle'))).toEqual('finalExam')
        expect(getInnerHTML(wrapper.find('.answerOptionA'))).toEqual('yellow')
        expect(getInnerHTML(wrapper.find('.answerOptionB'))).toEqual('red')
        expect(getInnerHTML(wrapper.find('.answerOptionC'))).toEqual('orange')
        expect(getInnerHTML(wrapper.find('.answerOptionD'))).toEqual('green')
       
        wrapper.find('.answerChoiceInputD').simulate('click');
        wrapper.find('.advanceButton').first().simulate('click');
        
        expect(getInnerHTML(wrapper.find('.quizScore'))).toEqual('Score: 100%');
        expect(getInnerHTML(wrapper.find('.congrats'))).toEqual('Congratulations, you have passed!');
    })
})
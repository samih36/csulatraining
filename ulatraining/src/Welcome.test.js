import React from 'react';
import { mount, shallow } from 'enzyme';
import Welcome from './Welcome/Welcome.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


function getInnerHTML(node) {
    return node.children().reduce((string, node) => {
        return string + node.html() || node.text()
    }, '')
}

describe("Welcome component renders", () => {
    it("should render welcome messsage and student/prof buttons", () => {
        const wrapper = mount(<Welcome />);
        expect(getInnerHTML(wrapper.find('.welcome'))).toEqual("I am a...");
        expect(getInnerHTML(wrapper.find('.leftcolumn').find('.button'))).toEqual('Student');
        expect(getInnerHTML(wrapper.find('.rightcolumn').find('.button'))).toEqual('Professor');
    })
})
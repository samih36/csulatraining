import React from 'react';
import { mount } from 'enzyme';
import Welcome from './Welcome/Welcome.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


export function getInnerHTML(node) {
    return node.children().reduce((string, node) => {
        return string + node.html() || node.text()
    }, '')
}

describe("Welcome component renders", () => {
    it("should render welcome messsage and student/prof buttons", () => {
        const wrapper = mount(<Welcome />);
        expect(getInnerHTML(wrapper.find('.welcome'))).toEqual("I am a...");
        expect(getInnerHTML(wrapper.find('.leftcolumn').find('.button'))).toEqual('Student');
        // wrapper.find('.leftcolumn').find('.button').simulate('click');
        // wrapper.find('.rightcolumn').find('.button').simulate('click');
        expect(getInnerHTML(wrapper.find('.rightcolumn').find('.button'))).toEqual('Professor');
    });
})
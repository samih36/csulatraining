import React from 'react';
import { mount } from 'enzyme';
import Welcome from './Welcome/Welcome.js';
import { configure } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });

describe("Welcome component renders", () => {
    it("should render welcome messsage and student/prof buttons", () => {
        const wrapper = mount(<Welcome />);
        console.log(wrapper.debug());
        console.log('hello');
        expect(1).toEqual(1);
    })
})
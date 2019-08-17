import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { App, Tag } from "./app";
import toJson from "enzyme-to-json";

configure({ adapter: new Adapter() });

describe("<App /> Component", () => {
  it("should contain one div element", () => {
    const wrapper = shallow(<App />, {
      context: {},
      disableLifecycleMethods: true
    });
    console.log(wrapper.debug());
    expect(wrapper.find("div").length).toBe(1);
    expect(wrapper.find(".App").exists()).toBe(true);
    expect(wrapper.find(".App").children().length).toBe(4);
    expect(wrapper.find("div").hasClass("App")).toBe(true);

    expect(wrapper.find("h1").text()).toEqual("Hello React Jest Anzyme");
  });

  it.skip("Matches the snapshot", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it("should get a correct prop", () => {
    const wrapper = shallow(<Tag address="test.com" />);
    expect(wrapper.instance().props.address).toBe("test.com");
  });

  it("should renders the correct href", () => {
    const wrapper = shallow(<Tag address="www.google.com" />);
    console.log(wrapper.debug());
    expect(wrapper.props().href).toBe("www.google.com");
  });

  it("should hide the component when props hide is present", () => {
    const wrapper = shallow(<Tag address="www.google.com" />);
    expect(wrapper.find("a").length).toBe(1);
    wrapper.setProps({ hide: true });
    expect(wrapper.find("a").length).toBe(0);
    expect(wrapper.get(0)).toBeNull();
  });
});

describe.only("<App /> Component - Mount", () => {
  it("Should mount the app component", () => {
    const tree = mount(<App />);
    // expect(toJson(tree)).toMatchSnapshot();
    console.log(tree.debug());
    tree.unmount();
  });

  it.only("on button click changes p text", () => {
    const wrapper = shallow(<App />);
    const button = wrapper.find("button");
    expect(wrapper.find("p").text()).toBe("Welcome to React Enzyme training");
    button.simulate("click");
    expect(wrapper.find("p").text()).toBe("Welcome to the new course");
  });

  it.only("on button click changes p text", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("p").text()).toBe("Welcome to React Enzyme training");
    wrapper.setState({
      text: "New title test"
    });
    expect(wrapper.find("p").text()).toBe("New title test");
  });

  it.only("Should test component did mount", () => {
    jest.spyOn(App.prototype, "componentDidMount");
    shallow(<App />);
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1);
  });

  it.only("handleStrings function returns correctly", () => {
    const wrapper = shallow(<App />);
    const trueReturn = wrapper.instance().handleStrings("Hello World");
    expect(trueReturn).toBe(true);
    const falseReturn = wrapper.instance().handleStrings("");
    expect(falseReturn).toBe(false);
  });
});

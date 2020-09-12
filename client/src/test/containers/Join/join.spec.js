import * as React from "react";
import { shallow, mount } from "enzyme";
import Join from "../../../containers/Join/Join";

const mockHistoryPush = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe("MyComponent", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Join />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render Join component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render select,input and button", () => {
    expect(wrapper.find("select")).toHaveLength(1);
    expect(wrapper.find("input")).toHaveLength(1);
    expect(wrapper.find("button")).toHaveLength(1);
  });

  it("should show alert message when username empty", () => {
    window.alert = jest.fn();
    wrapper.find("button").simulate("click");
    expect(window.alert).toBeCalledWith('Name is missed');
  });

  it("should navigate with history push when username are not empty", () => {
    wrapper = mount(<Join />);
    wrapper.find('input.Input').simulate('change', { target: { name: 'username', value: 'Baruch' } } );
    wrapper.find("button").simulate("click");
    expect(mockHistoryPush).toBeCalled();
  })
});

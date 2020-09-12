import * as React from "react";
import { shallow } from "enzyme";
import Chat from "../../../containers/Chat/Chat";
import io from "socket.io-client";


jest.mock("socket.io-client", () => {
  const emit = jest.fn();
  const on = jest.fn();
  const socket = { emit, on };
  return jest.fn(() => socket);
});

describe("<App />", () => {

  beforeEach(() => { 
    io.mockClear();
    io().on.mockClear();
    io().emit.mockClear();
  });

  it("should render Join component with location props", () => {
    const location = {
      state : {
        user: {
          username: 'Baruch',
          room: 'JavaScript'
        }
      }
    }

    const wrapper = shallow(<Chat location={location}/>);
    expect(wrapper).toMatchSnapshot();
  });
});

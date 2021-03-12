import React from 'react'
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";
import {shallow, configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

import {getDate} from "../utils/getDate";
jest.mock('../utils/getDate');

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeAll(() => {
    getDate.mockReturnValue('11 марта, чт, 2021 год');
  })

  afterAll(() => {
    getDate.mockClear();
  })

  it('render correctly component', () => {
    const testComponent = shallow(<Order order={fakeOrders[0]}/>);
    expect(testComponent).toMatchSnapshot();
  })

  it('check null order', () => {
    const order = null;
    const testComponent = shallow(<Order order={order} />);

    expect(testComponent).toEqual({});
  });

  it('check no items in order', () => {
    const order = {
      shop: 'test shop',
      date: '11 марта, чт, 2021 год',
      items: null
    }
    const testComponent = shallow(<Order order={order} />);

    expect(testComponent).toMatchSnapshot();
  });

  it('check null shop', () => {
    const order = {
      shop: null,
      date: '11 марта, чт, 2021 год',
    }
    const testComponent = shallow(<Order order={order} />);

    expect(testComponent).toEqual({});
  });

  it('check null date', () => {
    const order = {
      shop: 'test shop',
      date: null,
    }
    const testComponent = shallow(<Order order={order} />);

    expect(testComponent).toEqual({});
  });
})



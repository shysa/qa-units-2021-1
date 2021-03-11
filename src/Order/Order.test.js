import React from 'react'
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";
import {shallow, configure, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';
import {getDate} from "../utils/getDate";

jest.mock('../utils/getDate');
getDate.mockReturnValue("15 марта, чт, 2021 год");

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  it('render correctly component', () => {
    const testComponent = shallow(<Order key={0} order={fakeOrders[0]}/>);
    expect(testComponent).toMatchSnapshot();
  })

  it('check no orders', () => {
    const testComponent = shallow(<Order key={0} order={null} />);
    expect(testComponent).toMatchSnapshot();
  });

  it('check no items in order', () => {
    const testComponent = shallow(<Order key={0} order={{shop: 'test shop', date: getDate(), items: null}} />);
    expect(testComponent).toMatchSnapshot();
  });

  it('check no orders', () => {
    const testComponent = shallow(<Order key={0} order={null} />);
    expect(testComponent).toMatchSnapshot();
  });

  it('check null props', () => {
    const testComponent = shallow(<Order key={0} order={{shop: null, date: null}} />);
    expect(testComponent).toMatchSnapshot();
  });

  it('check no orders', () => {
    const testComponent = shallow(<Order key={0} order={null} />);
    expect(testComponent).toMatchSnapshot();
  });
})



import React from 'react'
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";
import {shallow, configure, mount} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

jest.mock('../utils/getDate');

configure({ adapter: new Adapter() });

describe('Order.js', () => {
  beforeEach( () => {
    getDate.mockReturnValue('01.01.1970');
  })
  afterEach( () => {
    getDate.mockClear();
  })

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



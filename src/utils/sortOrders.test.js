import React from 'react'
import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	it('orders are null', () => {
		const result = sortByItemCount(null, null);
		expect(result).toEqual(0);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('first order items count less than second', () => {
		const order1 = {
			items: ['1']
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(-1);
	});

	it('second order items count less than first', () => {
		const order1 = {
			items: ['1', '2']
		};

		const order2 = {
			items: ['1'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(1);
	});

	it('orders are not objects', () => {
		const order1 = '1';
		const order2 = '2';

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('check empty orders', () => {
		const order1 = {};
		const order2 = {};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});

	it('orders with null items', () => {
		const order1 = {
			items: null,
		};
		const order2 = {
			items: null,
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('getSortFunction function', () => {
	it.each([
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount]
	])('need $expected func for sort type $type', (type, expected) => {
		const result = getSortFunction(type);
		expect(result).toBe(expected);
	})
});

describe('sortOrders function', () => {
	let mockSortFunc;
	beforeEach(() => {
		mockSortFunc = jest.fn(() => 0);
	})

	it('no orders for sort', () => {
		sortOrders([], mockSortFunc)
		expect(mockSortFunc).toHaveBeenCalledTimes(0)
	})

	it('no sort func', () => {
		const order1 = {
			items: ['1']
		};

		const order2 = {
			items: ['2'],
		};

		sortOrders([order1, order2], null)
		expect(mockSortFunc).toHaveBeenCalledTimes(0)
	})

	it('correct orders and sort func', () => {
		const order1 = {
			items: ['1']
		};

		const order2 = {
			items: ['1', '2'],
		};

		sortOrders([order1, order2], mockSortFunc)
		expect(mockSortFunc).toHaveBeenCalled()
	})
});

describe('sortByDate function', () => {
	let date1;
	let date2;

	beforeEach(() => {
		date1 = new Date(0);					// 01.01.1970 UTC+0
		date2 = new Date(24 * 3600 * 1000);	// 02.01.1970 UTC+0
	})

	it('orders are null', () => {
		const result = sortByDate(null, null);
		expect(result).toBe(0);
	})

	it('first order date less then second', () => {
		const order1 = {
			date: date1
		};

		const order2 = {
			date: date2
		};

		const result = sortByDate(order1, order2);
		expect(result).toBe(1);
	})

	it('second order date less then first', () => {
		const order1 = {
			date: date2
		};

		const order2 = {
			date: date1
		};

		const result = sortByDate(order1, order2);
		expect(result).toBe(-1);
	})

	it('equal dates', () => {
		const order1 = {
			date: date1
		};

		const order2 = {
			date: date1
		};

		const result = sortByDate(order1, order1);
		expect(result).toBe(0);
	})

	it('order not an object', () => {
		const order1 = '1';
		const order2 = '2';

		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	})

	it('check empty orders', () => {
		const order1 = {};
		const order2 = {};

		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	})

	it('order with null date', () => {
		const order1 = {
			date: null
		};
		const order2 = {
			date: null
		};

		const result = sortByDate(order1, order2);
		expect(result).toBe(0);
	})
});


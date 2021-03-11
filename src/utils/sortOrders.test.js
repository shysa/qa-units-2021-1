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

	test.each([
		[{items: ['1']}, {items: ['1', '2']}, -1],
		[{items: ['1', '2']}, {items: ['1']}, 1],
		['1', {}, 0],
		[{items: null}, {}, 0]
	])('need $expected with order1 $a and order2 $b', (a, b, expected) => {
		const result = sortByItemCount(a, b);
		expect(result).toBe(expected);
	})

	it.each([
		[sortTypes.DATE, sortByDate],
		[sortTypes.COUNT, sortByItemCount]
	])('need $expected func for sort type $type', (type, expected) => {
		const result = getSortFunction(type);
		expect(result).toBe(expected);
	})

	let mockSortFunc;
	let date1;
	let date2;

	beforeEach(() => {
		mockSortFunc = jest.fn(() => 0);
		date1 = new Date(0);					// 01.01.1970 UTC+0
		date2 = new Date(24 * 3600 * 1000);	// 02.01.1970 UTC+0
	})

	it('no orders for sort', () => {
		sortOrders([], mockSortFunc)
		expect(mockSortFunc).toHaveBeenCalledTimes(0)
	})

	it('no sort func', () => {
		sortOrders([{items: ['1']}], null)
		expect(mockSortFunc).toHaveBeenCalledTimes(0)
	})

	it('correct orders and sort func', () => {
		sortOrders([{items: ['1']}, {items: ['1', '2']}], mockSortFunc)
		expect(mockSortFunc).toHaveBeenCalled()
	})

	//TODO: test.each
	it('orders are null for sort by date', () => {
		const result = sortByDate(null, null);
		expect(result).toEqual(0);
	})

	it('first date less then second', () => {
		const result = sortByDate({date: date1}, {date: date2});
		expect(result).toBe(1);
	})

	it('second date less then first', () => {
		const result = sortByDate({date: date2}, {date: date1});
		expect(result).toBe(-1);
	})

	it('equal dates', () => {
		const result = sortByDate({date: date1}, {date: date1});
		expect(result).toBe(0);
	})

	it('order not an object', () => {
		const result = sortByDate('1', {date: date2});
		expect(result).toBe(0);
	})

	it('order with null date', () => {
		const result = sortByDate({date: null}, {date: date2});
		expect(result).toBe(0);
	})



});


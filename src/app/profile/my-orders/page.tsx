'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { FiRadio } from 'react-icons/fi';
import { FiSend } from 'react-icons/fi';
import { FiShuffle } from 'react-icons/fi';
import { FiXOctagon } from 'react-icons/fi';
import OrderCard from './components/OrderCard';
import { getAllOrdersAction } from './action';

type Props = {};

function page({}: Props) {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('pending');

  const getOrders = async () => {
    const res = await getAllOrdersAction(status);
    setOrders(res ?? []);
  };

  useEffect(() => {
    getOrders();
  }, [status]);

  return (
    <div>
      <div className="flex items-center justify-between my-4 border-b-[1px] border-gray-200">
        <button
          onClick={() => setStatus('pending')}
          className={`w-full pb-4 flex items-center flex-col justify-center ${
            status == 'pending'
              ? 'border-b-2 border-b-semi-green'
              : 'border-0'
          }`}>
          <FiRadio
            className="w-[30px] h-[30px] text-blue-500"
            size={40}
          />
          <span
            className={`${
              status == 'pending'
                ? 'text-semi-green text-[1.1em]'
                : ''
            }`}>
            جاری
          </span>
        </button>
        <button
          onClick={() => setStatus('done')}
          className={`w-full pb-4 flex items-center flex-col justify-center  ${
            status == 'done'
              ? 'border-b-2 border-b-semi-green'
              : 'border-0'
          }`}>
          <FiSend className="w-[30px] h-[30px] text-green-500" />
          <span
            className={`${
              status == 'done' ? 'text-semi-green text-[1.1em]' : ''
            }`}>
            تحویل شده
          </span>
        </button>
        <button
          onClick={() => setStatus('return')}
          className={`w-full pb-4 flex items-center flex-col justify-center ${
            status == 'return'
              ? 'border-b-2 border-b-semi-green'
              : 'border-0'
          }`}>
          <FiShuffle className="w-[30px] h-[30px] text-yellow-300" />
          <span
            className={`${
              status == 'return' ? 'text-semi-green text-[1.1em]' : ''
            }`}>
            مرجوع شده
          </span>
        </button>
        <button
          onClick={() => setStatus('cancel')}
          className={`w-full pb-4 flex items-center flex-col justify-center ${
            status == 'cancel'
              ? 'border-b-2 border-b-semi-green'
              : 'border-0'
          }`}>
          <FiXOctagon className="w-[30px] h-[30px] text-red-400" />
          <span
            className={`${
              status == 'cancel' ? 'text-semi-green text-[1.1em]' : ''
            }`}>
            لغو شده
          </span>
        </button>
      </div>

      {/* list of orders card */}
      <div className="w-full p-4">
        {orders.map((item, index) => (
          <OrderCard key={index} data={item} label={status == 'pending' ? 'جاری' : status == 'done' ? '' : status == 'return' ? '' : status == 'cancel' ? '' : ''} />
        ))}
      </div>
    </div>
  );
}

export default page;

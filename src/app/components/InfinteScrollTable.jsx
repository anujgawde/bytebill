"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import React from "react";

export default function InfiniteScrollTable({ openExpense }) {
  // Assume data is stored in local storage as a JSON string
  const [data, setData] = useState([]);
  const [visibleData, setVisibleData] = useState([]);
  // const [hasMore, setHasMore] = useState(true);
  const [itemsToLoad, setItemsToLoad] = useState(20); // Number of items to load each time

  useEffect(() => {
    setItemsToLoad(20);
    // Load data from local storage once
    const storedData =
      JSON.parse(localStorage.getItem("reported_expenses")) || [];
    setData(storedData);
    setVisibleData(storedData.slice(0, itemsToLoad)); // Initial load
  }, [itemsToLoad]);

  // Infinite scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        loadMore();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleData, data]);

  // Load more data when user scrolls to the bottom
  const loadMore = () => {
    const nextData = data.slice(
      visibleData.length,
      visibleData.length + itemsToLoad
    );
    setVisibleData((prevVisibleData) => [...prevVisibleData, ...nextData]);
    // if (visibleData.length + itemsToLoad >= data.length) setHasMore(false);
  };

  return (
    <div className="container mx-auto max-h-full overflow-y-auto rounded-lg mb-8 flex flex-col h-full md:px-8">
      <div className="flex justify-end items-center my-6 lg:my-2 mx-2">
        <Link
          href="/report-expense"
          className={`rounded-md bg-primary py-2 px-8 text-white font-semibold flex justify-center items-center disabled:bg-primary-light`}
        >
          <p>Add Expense</p>
        </Link>
      </div>
      <div className="bg-white h-full border rounded-lg relative max-h-full overflow-y-auto mx-2">
        {/* Header */}
        {visibleData.length > 0 && (
          <div className="flex bg-gray-100 text-gray-700 font-bold sticky right-0 top-0 left-0 rounded-t-lg">
            <div className="py-2 px-4 flex-1">Merchant Name</div>
            <div className="py-2 px-4 flex-1 hidden lg:block">Type</div>
            <div className="py-2 px-4 flex-1 hidden lg:block">Contact</div>
            <div className="py-2 px-4 flex-1 hidden lg:block">Address</div>
            <div className="py-2 px-4 flex-1 hidden lg:block">Date</div>
            <div className="py-2 px-4 flex-1 hidden lg:block"></div>
          </div>
        )}

        {/* Data Rows */}
        <div>
          {visibleData
            .map((expense) => (
              <div
                key={expense.id}
                className={`font-medium duration-75 ease-in-out transition-all flex bg-white border-b last-of-type:border-none items-center`}
              >
                <div className="py-2 px-4 flex-1">{expense.merchantName}</div>
                <div className="py-2 px-4 flex-1 hidden lg:block">
                  {expense.docType}
                </div>
                <div className="py-2 px-4 flex-1 hidden lg:block">
                  {expense.merchantPhoneNumber}
                </div>
                <div className="py-2 px-4 flex-1 hidden lg:block">
                  {expense.merchantAddress}
                </div>
                <div className="py-2 px-4 flex-1 hidden lg:block">
                  {expense.transactionDate}
                </div>
                <div className="flex-1 px-4 py-2 flex justify-end lg:justify-center">
                  <button
                    onClick={() => openExpense(expense.id)}
                    className="rounded-full border-primary border text-gray-700 text-sm py-1 px-4 hover:bg-primary hover:text-white "
                  >
                    View Expense
                  </button>
                </div>
              </div>
            ))
            .reverse()}
        </div>
        {!visibleData.length && (
          <div className="h-[90%] flex-1 w-full flex justify-center items-center">
            <p className="text-4xl font-medium text-gray-700 text-center">
              Add <span className="text-primary">expenses</span> to view your
              data here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

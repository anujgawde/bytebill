"use client";
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
    <div className="container mx-auto h-full max-h-full overflow-y-auto rounded-lg mb-8">
      <div className="bg-white h-full border rounded-lg relative max-h-full overflow-y-auto">
        {/* Header */}
        <div className="flex bg-gray-100 text-gray-700 font-bold sticky right-0 top-0 left-0 rounded-t-lg">
          <div className="py-2 px-4 flex-1">Merchant Name</div>
          <div className="py-2 px-4 flex-1">Type</div>
          <div className="py-2 px-4 flex-1">Contact</div>
          <div className="py-2 px-4 flex-1">Address</div>
          <div className="py-2 px-4 flex-1">Date</div>
        </div>

        {/* Data Rows */}
        <div>
          {visibleData
            .map((expense) => (
              <div
                onClick={() => openExpense(expense.id)}
                key={expense.id}
                className={`font-medium hover:bg-gray-50  hover:rounded-md cursor-pointer duration-75 ease-in-out transition-all flex bg-white border-b last-of-type:border-none`}
              >
                <div className="py-2 px-4 flex-1">{expense.merchantName}</div>
                <div className="py-2 px-4 flex-1">{expense.docType}</div>
                <div className="py-2 px-4 flex-1">
                  {expense.merchantPhoneNumber}
                </div>
                <div className="py-2 px-4 flex-1">
                  {expense.merchantAddress}
                </div>
                <div className="py-2 px-4 flex-1">
                  {expense.transactionDate}
                </div>
              </div>
            ))
            .reverse()}
        </div>
        {!visibleData.length && (
          <div className="h-[90%] flex-1 w-full flex justify-center items-center">
            <p className="text-4xl font-medium text-gray-700">
              Add your <span className="text-primary">bills</span> to view your
              data here!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

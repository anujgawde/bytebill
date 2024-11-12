"use client";
import { useState } from "react";
import InfiniteScrollTable from "./components/InfinteScrollTable";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "@/config/firebase";
import firebase from "firebase/compat/app";

export default function Home() {
  const [selectedExpense, setSelectedExpense] = useState({
    id: "",
    merchantAddress: "",
    merchantName: "",
    merchantPhoneNumber: "",
    billTotal: 0,
    docType: "",
    transactionDate: "",
    currency: "",
  });
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isUpdatingExpense, setIsUpdatingExpense] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState();

  const openExpensePanel = async (expenseId) => {
    const reportedExpenses = JSON.parse(
      localStorage.getItem("reported_expenses")
    );

    const expense = reportedExpenses.find((e) => e.id === expenseId);

    const listRef = ref(storage, `${expenseId}/`);

    const allFiles = await listAll(listRef);
    console.log();

    getDownloadURL(ref(storage, allFiles.items[0]._location.path_))
      .then((url) => {
        console.log(url, "url");
        setReceiptUrl(url);
      })
      .catch((error) => {
        // Handle any errors
      });

    setSelectedExpense(expense);
    setIsPanelOpen(true);
  };

  const closeExpensePanel = () => {
    setIsPanelOpen(false);
  };

  const handleDetailChange = (field, value) => {
    setSelectedExpense((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const updateExpense = async () => {
    const reportedExpenses = JSON.parse(
      localStorage.getItem("reported_expenses")
    );
    const itemIndex = reportedExpenses.findIndex(
      (e) => e.id === selectedExpense.id
    );

    if (itemIndex !== -1) {
      // Step 3: Update the object with new data
      reportedExpenses[itemIndex] = {
        ...reportedExpenses[itemIndex],
        ...selectedExpense,
      };

      // Step 4: Save the updated array back to local storage
      localStorage.setItem(
        "reported_expenses",
        JSON.stringify(reportedExpenses)
      );
    }
  };

  return (
    <div className=" min-h-screen h-screen overflow-y-auto flex flex-col">
      <div className="py-6">
        <p className="text-4xl text-gray-700 font-bold text-center">
          <span className="font-thin italic">byte</span>
          <span className="text-primary">bill</span>
        </p>
      </div>

      <InfiniteScrollTable openExpense={openExpensePanel} />

      <div
        className={`fixed overflow-y-auto top-0 right-0 h-full bg-white transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        } w-[70%] shadow-lg z-50`}
      >
        {/* Close Button */}
        <button
          onClick={closeExpensePanel}
          className="absolute top-4 right-4 text-gray-700 font-bold text-lg"
        >
          Close
        </button>

        {/* Panel Content */}
        {selectedExpense && (
          <div className="p-8">
            <p className="text-3xl">Receipt Details</p>

            <div className="flex justify-center py-6">
              <img
                src={receiptUrl}
                className="z-50 max-h-[500px] min-h-[500px] h-fit"
              />
            </div>
            <div className="space-y-2 my-4 overflow-y-auto ">
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Merchant Name
                </label>
                <input
                  onChange={(e) =>
                    handleDetailChange("merchantName", e.target.value)
                  }
                  value={selectedExpense.merchantName}
                  className="w-full py-1 px-4 rounded-md border outline-black"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Merchant Address
                </label>
                <textarea
                  onChange={(e) => {
                    handleDetailChange("merchantAddress", e.target.value);
                  }}
                  value={selectedExpense.merchantAddress}
                  className="w-full py-1 px-4 rounded-md border outline-black resize-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Merchant Contact
                </label>
                <input
                  onChange={(e) => {
                    handleDetailChange("merchantPhoneNumber", e.target.value);
                  }}
                  value={selectedExpense.merchantPhoneNumber}
                  className="w-full py-1 px-4 rounded-md border outline-black"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Billed Amount ({selectedExpense.currency})
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    handleDetailChange("billTotal", parseFloat(e.target.value));
                  }}
                  value={selectedExpense.billTotal}
                  className="w-full py-1 px-4 rounded-md border outline-black"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Expense Type
                </label>
                <input
                  value={selectedExpense.docType}
                  onChange={(e) =>
                    handleDetailChange("docType", e.target.value)
                  }
                  className="w-full py-1 px-4 rounded-md border outline-black"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold" htmlFor="merchant-address">
                  Expense Date
                </label>
                <input
                  type="date"
                  value={selectedExpense.transactionDate}
                  onChange={(e) => {
                    handleDetailChange("transactionDate", e.target.value);
                  }}
                  className="w-full py-1 px-4 rounded-md border outline-black"
                />
              </div>
            </div>

            <div className="flex justify-center items-center my-2">
              <button
                onClick={updateExpense}
                className="rounded-md bg-primary py-2 w-full text-white font-semibold flex justify-center items-center"
              >
                {!isUpdatingExpense ? (
                  <p>Update Expense</p>
                ) : (
                  <span>
                    <svg
                      className=" left-4 w-5 h-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

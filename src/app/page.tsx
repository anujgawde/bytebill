"use client";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const trial =
    "Contoso\n123 Main Street\nRedmond, WA 98052\n987-654-3210\n6/10/2019 13:59\nSales Associate: Paul\n2 Surface Pro 6\n$1,998.00\n3 Surface Pen\n$299.97\nSub-Total\n$2,297.97\nTax\n$218.31\nTotal\n$2,516.28";
  const [file, setFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState<string>();
  const [expenseType, setExpenseType] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [extractedBillDetails, setExtractedBillDetails] = useState({
    merchantAddress: "",
    merchantName: "",
    merchantPhoneNumber: "",
    billTotal: 0,
    docType: "",
    transactionDate: new Date(),
  });

  const handleUpload = async (event: any) => {
    if (!event.target.files[0]) {
      alert("Please select a file!");
      return;
    }

    console.log(event.target.files[0]);
    setIsLoading(true);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);

    const formData = new FormData(); // Create FormData object
    formData.append("file", event.target.files[0]);

    formData.forEach((e) => {
      console.log(e);
    });

    try {
      const response = await axios.post(
        "http://localhost:8001/expenses/upload-receipt",
        formData
      );

      console.log(response.data);
      // const extractedBillData = {
      //   merchantAddress: response.data.fields.MerchantAddress.content,
      //   merchantName: response.data.fields.MerchantName.content,
      //   merchantPhoneNumber: response.data.fields.MerchantPhoneNumber.content,
      //   billTotal: response.data.fields.Total.content,
      //   docType: response.data.docType,
      //   transactionDate: response.data.fields.TransactionDate.content,
      // };

      // if (extractedBillData.docType === "receipt.retailMeal") {
      //   setExpenseType("Restaurant");
      // } else if (extractedBillData.docType === "receipt.hotel") {
      //   setExpenseType("Hotel");
      // } else {
      //   setExpenseType("Miscellaneous");
      // }

      // setExtractedBillDetails(extractedBillData);

      // response.data.fields.merchantAddress
      // response.data.fields.merchantName
      // response.data.fields.merchantPhoneNumber
      // response.data.fields.Total
      // response.data.fields.TransactionDate
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsLoading(false);
  };

  const resetFile = async () => {
    setFileUrl("");
    setFile(null);
    setExtractedBillDetails({
      merchantAddress: "",
      merchantName: "",
      merchantPhoneNumber: "",
      billTotal: 0,
      docType: "",
      transactionDate: new Date(),
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen h-screen overflow-y-auto flex flex-col">
      {/* <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <p>{status}</p>
      </form> */}
      <div className="py-8">
        <p className="text-4xl text-gray-700 font-bold text-center">
          <span className="font-thin">byte</span>bill
        </p>
      </div>

      <div className=" flex-1 flex justify-between items-center px-16 space-x-8">
        <div className="relative bg-gray-100 hover:border-gray-500 z-30 transition-all ease-in delay-[0.1] w-1/2 h-full border-dashed border-2 rounded-lg flex justify-center items-center ">
          {file && (
            <button onClick={resetFile}>
              <img
                src="/refresh-ccw.svg"
                className="h-10 w-10 rounded-lg bg-white p-2 absolute top-2 right-2 z-50"
              />
            </button>
          )}

          {file && file.type === "image/png" && (
            <img src={fileUrl} className="w-full h-full z-50 max-h-fit" />
          )}

          {!file && (
            <>
              <label className="font-semibold text-2xl text-gray-400  absolute ">
                Drop your file anywhere, or click to upload.
              </label>
              <input
                onChange={handleUpload}
                className="opacity-0 h-full w-full hover:cursor-pointer absolute "
                type="file"
              />
            </>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-lg">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
            </div>
          )}
        </div>
        <div className="relative bg-gray-100 w-1/2 h-full flex-col border-2 rounded-lg flex py-6 px-6 font-semibold text-gray-700">
          <p className="text-3xl">Receipt Details</p>

          <div className="space-y-2 my-8">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Merchant Name
              </label>
              <input
                onChange={() => {}}
                value={extractedBillDetails.merchantName}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Merchant Address
              </label>
              <textarea
                onChange={() => {}}
                value={trial}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            {/* <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Merchant Address
              </label>
              <textarea
                onChange={() => {}}
                value={extractedBillDetails.merchantAddress}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div> */}
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Merchant Contact
              </label>
              <input
                onChange={() => {}}
                value={extractedBillDetails.merchantPhoneNumber}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Billed Amount
              </label>
              <input
                onChange={() => {}}
                value={extractedBillDetails.billTotal}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Expense Type
              </label>
              <input
                value={expenseType}
                onChange={() => {}}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-8"></div>
    </div>
  );
}

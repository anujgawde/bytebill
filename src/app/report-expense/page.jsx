"use client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/config/firebase";
import { ref, uploadString } from "firebase/storage";
import Link from "next/link";

export default function ReportExpensePage() {
  const router = useRouter();

  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [isLoading, setIsLoading] = useState();
  const [isSubmittingReport, setIsSubmittingReport] = useState();
  const [extractedBillDetails, setExtractedBillDetails] = useState({
    id: "",
    merchantAddress: "",
    merchantName: "",
    merchantPhoneNumber: "",
    billTotal: 0.0,
    docType: "",
    transactionDate: "",
  });

  const handleUpload = async (event) => {
    if (!event.target.files[0]) {
      alert("Please select a file!");
      return;
    }

    setIsLoading(true);
    setFileUrl(URL.createObjectURL(event.target.files[0]));
    setFile(event.target.files[0]);

    const formData = new FormData(); // Create FormData object
    formData.append("file", event.target.files[0]);

    try {
      // const response = await axios.post(
      //   "http://localhost:8001/expenses/upload-receipt",
      //   formData
      // );
      const response = await axios.post("api/upload-receipt", formData);
      console.log(response.data);
      let expenseType = "";
      if (response.data.docType === "receipt.retailMeal") {
        expenseType = "Food";
      } else if (response.data.docType === "receipt.hotel") {
        expenseType = "Hotel";
      } else {
        expenseType = "Miscellaneous";
      }
      console.log(response.data.fields);
      const extractedBillData = {
        id: uuidv4(),
        merchantAddress: response.data?.fields?.MerchantAddress?.content ?? "",
        merchantName: response.data?.fields?.MerchantName?.content ?? "",
        merchantPhoneNumber:
          response.data?.fields?.MerchantPhoneNumber?.content ?? "",
        billTotal: response.data?.fields?.Total?.value ?? 0.0,
        docType: expenseType,
        transactionDate:
          new Date(response?.data?.fields?.TransactionDate?.value)
            .toISOString()
            .split("T")[0] ?? new Date().toISOString().split("T")[0],
      };
      setExtractedBillDetails(extractedBillData);
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    setIsLoading(false);
  };

  const handleDetailChange = (field, value) => {
    setExtractedBillDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const resetFile = async () => {
    setFileUrl("");
    setFile(null);
    setExtractedBillDetails({
      id: "",
      merchantAddress: "",
      merchantName: "",
      merchantPhoneNumber: "",
      billTotal: 0.0,
      docType: "",
      transactionDate: "",
    });
  };

  const submitExpense = async () => {
    if (!extractedBillDetails.id.length) {
      return;
    }
    setIsSubmittingReport(true);
    let reportedExpenses;
    if (localStorage.getItem("reported_expenses")) {
      reportedExpenses = JSON.parse(localStorage.getItem("reported_expenses"));
    } else {
      reportedExpenses = [];
    }
    const updatedExpenses = [...reportedExpenses, extractedBillDetails];

    localStorage.setItem("reported_expenses", JSON.stringify(updatedExpenses));

    await uploadReceipt(extractedBillDetails.id);
  };

  const uploadReceipt = async (expenseId) => {
    let fileBase64 = await getBase64(file);
    const storageRef = ref(storage, `${expenseId}/${file?.name}`);

    uploadString(storageRef, fileBase64, "data_url").then(() => {
      setIsSubmittingReport(false);
      router.push("/");
    });
  };

  // TODO: file is a file uploaded by user. Update Type
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen h-screen overflow-y-auto flex flex-col max-h-[90%]">
      {/* <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <p>{status}</p>
      </form> */}
      <div className="pt-6">
        <Link href="/">
          <div className="text-4xl text-gray-700 font-bold text-center">
            <span className="font-thin italic">byte</span>
            <span className="text-primary">bill</span>
          </div>
        </Link>
      </div>

      <div className="max-h-[100%] h-full flex justify-between items-center px-16 space-x-8 py-8">
        <div className="relative flex-1 bg-gray-100 hover:border-gray-500 z-30 transition-all ease-in delay-[0.1] w-1/2 h-full border-dashed border-2 rounded-lg flex justify-center items-center ">
          {file && (
            <button onClick={resetFile}>
              <img
                src="/refresh-ccw.svg"
                className="h-10 w-10 rounded-lg bg-white p-2 absolute top-2 right-2 z-50"
              />
            </button>
          )}

          {file && file.type.startsWith("image/") && (
            <img src={fileUrl} className="z-40 object-contain max-h-[550px]" />
          )}

          {!file && (
            <>
              <label className="font-semibold text-2xl text-gray-400  absolute ">
                Drop your file anywhere, or click to upload.
                {/* <p className="text-center">(Allowed Fyle Types: .jpg, .png)</p> */}
              </label>
              <input
                accept="image/png, image/jpeg"
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
        <div className="relative h-full bg-gray-100 w-1/2 flex-1 overflow-auto flex-col border-2 rounded-lg flex py-6 px-6 font-semibold text-gray-700">
          <p className="text-3xl">Receipt Details</p>

          <div className="space-y-2 my-4 overflow-y-auto ">
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Merchant Name
              </label>
              <input
                onChange={(e) =>
                  handleDetailChange("merchantName", e.target.value)
                }
                value={extractedBillDetails.merchantName}
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
                value={extractedBillDetails.merchantAddress}
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
                value={extractedBillDetails.merchantPhoneNumber}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Billed Amount
              </label>
              <input
                type="number"
                min={0}
                onChange={(e) => {
                  handleDetailChange("billTotal", parseFloat(e.target.value));
                }}
                value={extractedBillDetails.billTotal?.toString()}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Expense Type
              </label>
              <input
                value={extractedBillDetails.docType}
                onChange={(e) => handleDetailChange("docType", e.target.value)}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold" htmlFor="merchant-address">
                Expense Date
              </label>
              <input
                type="date"
                value={extractedBillDetails.transactionDate}
                onChange={(e) => {
                  handleDetailChange("transactionDate", e.target.value);
                }}
                className="w-full py-1 px-4 rounded-md border outline-black"
              />
            </div>
          </div>
          {/* CTAs */}
          <div className="flex justify-center items-center my-2">
            <button
              disabled={isLoading || !file || isSubmittingReport}
              onClick={submitExpense}
              className={`rounded-md bg-primary py-2 w-full text-white font-semibold flex justify-center items-center disabled:bg-primary-light`}
            >
              {!isSubmittingReport ? (
                <p>Submit Expense</p>
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
      </div>

      {/* Footer */}
      {/* <div className="py-8"></div> */}
    </div>
  );
}

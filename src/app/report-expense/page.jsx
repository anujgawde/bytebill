"use client";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { storage } from "@/config/firebase";
import { ref, uploadString } from "firebase/storage";

export default function ReportExpensePage() {
  const dummyObj = {
    docType: "receipt.retailMeal",
    boundingRegions: [
      {
        pageNumber: 1,
        polygon: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 1802,
            y: 0,
          },
          {
            x: 1802,
            y: 930,
          },
          {
            x: 0,
            y: 930,
          },
        ],
      },
    ],
    spans: [
      {
        offset: 0,
        length: 192,
      },
    ],
    fields: {
      Items: {
        kind: "array",
        values: [
          {
            kind: "object",
            properties: {
              Description: {
                kind: "string",
                value: "Surface Pro 6",
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 752,
                        y: 512,
                      },
                      {
                        x: 904,
                        y: 512,
                      },
                      {
                        x: 904,
                        y: 540,
                      },
                      {
                        x: 752,
                        y: 540,
                      },
                    ],
                  },
                ],
                content: "Surface Pro 6",
                spans: [
                  {
                    offset: 97,
                    length: 13,
                  },
                ],
                confidence: 0.987,
              },
              Quantity: {
                kind: "number",
                value: 2,
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 725,
                        y: 511,
                      },
                      {
                        x: 734,
                        y: 512,
                      },
                      {
                        x: 734,
                        y: 540,
                      },
                      {
                        x: 725,
                        y: 541,
                      },
                    ],
                  },
                ],
                content: "2",
                spans: [
                  {
                    offset: 93,
                    length: 1,
                  },
                ],
                confidence: 0.995,
              },
              TotalPrice: {
                kind: "number",
                value: 1998,
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 989,
                        y: 512,
                      },
                      {
                        x: 1086,
                        y: 513,
                      },
                      {
                        x: 1086,
                        y: 538,
                      },
                      {
                        x: 989,
                        y: 538,
                      },
                    ],
                  },
                ],
                content: "$1,998.00",
                spans: [
                  {
                    offset: 111,
                    length: 9,
                  },
                ],
                confidence: 0.995,
              },
            },
            boundingRegions: [
              {
                pageNumber: 1,
                polygon: [
                  {
                    x: 725,
                    y: 511,
                  },
                  {
                    x: 1086,
                    y: 511,
                  },
                  {
                    x: 1086,
                    y: 541,
                  },
                  {
                    x: 725,
                    y: 541,
                  },
                ],
              },
            ],
            content: "2 | Surface Pro 6\n$1,998.00",
            spans: [
              {
                offset: 93,
                length: 27,
              },
            ],
            confidence: 0.987,
          },
          {
            kind: "object",
            properties: {
              Description: {
                kind: "string",
                value: "Surface Per",
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 752,
                        y: 552,
                      },
                      {
                        x: 884,
                        y: 553,
                      },
                      {
                        x: 884,
                        y: 581,
                      },
                      {
                        x: 752,
                        y: 580,
                      },
                    ],
                  },
                ],
                content: "Surface Per",
                spans: [
                  {
                    offset: 125,
                    length: 11,
                  },
                ],
                confidence: 0.987,
              },
              Quantity: {
                kind: "number",
                value: 3,
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 724,
                        y: 551,
                      },
                      {
                        x: 733,
                        y: 552,
                      },
                      {
                        x: 733,
                        y: 580,
                      },
                      {
                        x: 725,
                        y: 580,
                      },
                    ],
                  },
                ],
                content: "3",
                spans: [
                  {
                    offset: 121,
                    length: 1,
                  },
                ],
                confidence: 0.995,
              },
              TotalPrice: {
                kind: "number",
                value: 299.97,
                boundingRegions: [
                  {
                    pageNumber: 1,
                    polygon: [
                      {
                        x: 1006,
                        y: 553,
                      },
                      {
                        x: 1087,
                        y: 553,
                      },
                      {
                        x: 1087,
                        y: 578,
                      },
                      {
                        x: 1006,
                        y: 577,
                      },
                    ],
                  },
                ],
                content: "$299.97",
                spans: [
                  {
                    offset: 137,
                    length: 7,
                  },
                ],
                confidence: 0.995,
              },
            },
            boundingRegions: [
              {
                pageNumber: 1,
                polygon: [
                  {
                    x: 724,
                    y: 551,
                  },
                  {
                    x: 1087,
                    y: 553,
                  },
                  {
                    x: 1087,
                    y: 582,
                  },
                  {
                    x: 724,
                    y: 580,
                  },
                ],
              },
            ],
            content: "3 | Surface Per\n$299.97",
            spans: [
              {
                offset: 121,
                length: 23,
              },
            ],
            confidence: 0.988,
          },
        ],
      },
      MerchantAddress: {
        kind: "address",
        value: {
          houseNumber: "123",
          road: "Main Street",
          city: "Redmond",
          state: "WA",
          postalCode: "98052",
          streetAddress: "123 Main Street",
        },
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 720,
                y: 200,
              },
              {
                x: 941,
                y: 199,
              },
              {
                x: 941,
                y: 263,
              },
              {
                x: 720,
                y: 264,
              },
            ],
          },
        ],
        content: "123 Main Street\nRedmond, WA 98052",
        spans: [
          {
            offset: 8,
            length: 33,
          },
        ],
        confidence: 0.987,
      },
      MerchantName: {
        kind: "string",
        value: "Contosd",
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 802,
                y: 79,
              },
              {
                x: 1003,
                y: 78,
              },
              {
                x: 1003,
                y: 118,
              },
              {
                x: 802,
                y: 119,
              },
            ],
          },
        ],
        content: "Contosd",
        spans: [
          {
            offset: 0,
            length: 7,
          },
        ],
        confidence: 0.963,
      },
      MerchantPhoneNumber: {
        kind: "phoneNumber",
        value: "+19876543210",
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 723,
                y: 318,
              },
              {
                x: 867,
                y: 317,
              },
              {
                x: 866,
                y: 341,
              },
              {
                x: 723,
                y: 340,
              },
            ],
          },
        ],
        content: "987-654-3210",
        spans: [
          {
            offset: 42,
            length: 12,
          },
        ],
        confidence: 0.995,
      },
      Subtotal: {
        kind: "number",
        value: 2297.97,
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 988,
                y: 634,
              },
              {
                x: 1087,
                y: 634,
              },
              {
                x: 1087,
                y: 660,
              },
              {
                x: 989,
                y: 658,
              },
            ],
          },
        ],
        content: "$2,297.97",
        spans: [
          {
            offset: 155,
            length: 9,
          },
        ],
        confidence: 0.987,
      },
      Total: {
        kind: "number",
        value: 2516.28,
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 995,
                y: 755,
              },
              {
                x: 1093,
                y: 754,
              },
              {
                x: 1093,
                y: 779,
              },
              {
                x: 995,
                y: 780,
              },
            ],
          },
        ],
        content: "$2,516.28",
        spans: [
          {
            offset: 183,
            length: 9,
          },
        ],
        confidence: 0.959,
      },
      TotalTax: {
        kind: "number",
        value: 218.31,
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 1014,
                y: 674,
              },
              {
                x: 1089,
                y: 674,
              },
              {
                x: 1089,
                y: 697,
              },
              {
                x: 1014,
                y: 696,
              },
            ],
          },
        ],
        content: "$218.31",
        spans: [
          {
            offset: 169,
            length: 7,
          },
        ],
        confidence: 0.995,
      },
      TransactionDate: {
        kind: "date",
        value: "2019-06-10T00:00:00.000Z",
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 720,
                y: 396,
              },
              {
                x: 822,
                y: 395,
              },
              {
                x: 822,
                y: 422,
              },
              {
                x: 720,
                y: 423,
              },
            ],
          },
        ],
        content: "6/10/2019",
        spans: [
          {
            offset: 55,
            length: 9,
          },
        ],
        confidence: 0.99,
      },
      TransactionTime: {
        kind: "time",
        value: "13:59:00",
        boundingRegions: [
          {
            pageNumber: 1,
            polygon: [
              {
                x: 828,
                y: 395,
              },
              {
                x: 878,
                y: 394,
              },
              {
                x: 878,
                y: 422,
              },
              {
                x: 828,
                y: 422,
              },
            ],
          },
        ],
        content: "13:59",
        spans: [
          {
            offset: 65,
            length: 5,
          },
        ],
        confidence: 0.995,
      },
    },
    confidence: 0.954,
  };

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
    currency: "",
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
        expenseType = "Restaurant";
      } else if (response.data.docType === "receipt.hotel") {
        expenseType = "Hotel";
      } else {
        expenseType = "Miscellaneous";
      }

      const extractedBillData = {
        id: uuidv4(),
        merchantAddress: response.data.fields.MerchantAddress.content,
        merchantName: response.data.fields.MerchantName.content,
        merchantPhoneNumber: response.data.fields.MerchantPhoneNumber.content,
        billTotal: response.data.fields.Total.value,
        docType: expenseType,
        transactionDate: new Date(response.data.fields.TransactionDate.value)
          .toISOString()
          .split("T")[0],
        currency:
          response.data.fields.Total?.valueCurrency?.currencySymbol ?? "$",
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
      currency: "",
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

    setIsSubmittingReport(false);
    router.push("/");
  };

  const uploadReceipt = async (expenseId) => {
    let fileBase64 = await getBase64(file);
    const storageRef = ref(storage, `${expenseId}/${file?.name}`);

    uploadString(storageRef, fileBase64, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!", snapshot);
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
        console.log(baseURL);
        resolve(baseURL);
      };
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen h-screen overflow-y-auto flex flex-col">
      {/* <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
        <p>{status}</p>
      </form> */}
      <div className="py-6">
        <p className="text-4xl text-gray-700 font-bold text-center">
          <span className="font-thin italic">byte</span>
          <span className="text-primary">bill</span>
        </p>
      </div>

      <div className=" flex justify-between items-center px-16 space-x-8">
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
        <div className="relative bg-gray-100 w-1/2 flex-1 overflow-auto flex-col border-2 rounded-lg flex py-6 px-6 font-semibold text-gray-700">
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
                Billed Amount ({extractedBillDetails.currency})
              </label>
              <input
                type="number"
                min={0}
                onChange={(e) => {
                  handleDetailChange("billTotal", parseFloat(e.target.value));
                }}
                value={extractedBillDetails.billTotal.toString()}
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
              disabled={isLoading || !file}
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

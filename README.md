
# Bytebill - Expense Management Feature

Bytebill is a full-stack expense management application built with **Next.js**. This feature allows users to upload receipts (bills), extract relevant expense data, and manage their expenses seamlessly. Users can verify and edit extracted data, submit expenses, and view or manage their reported expenses.

---

## Features

### Receipt Upload and Data Extraction
- Upload receipt images to extract data such as date, amount, and vendor using **Azure Document Intelligence**.
- Automatically fills key fields in the expense form for user verification and editing.

### Expense Management
- **Submit Expense**: Users can finalize their expenses and submit them for record-keeping.
- **All Expenses Page**: Displays a list of all reported expenses with key details.

### Expense Details View
- **Sliding Panel**: View expense details by clicking on an expense row. 
- **Editable Data**: Update expense details directly in the panel.
- **Receipt Image**: View the original uploaded receipt for reference.

---

## Technologies Used

- **Next.js**: Framework for building the frontend and backend (API integration).
- **Microsoft Azure**: Document Intelligence model for extracting data from receipts.
- **Firebase Storage**: For securely storing receipt images.
- **TailwindCSS**: For responsive and modern styling.

---

## How It Works

1. **Upload Receipt**:
   - Users upload a receipt image.
   - The backend calls the Azure Document Intelligence model to extract receipt data.
2. **Expense Form**:
   - Extracted data populates key fields (editable by the user).
   - Users verify and correct data, then submit the expense.
3. **All Expenses**:
   - Displays a list of submitted expenses.
   - Clicking an expense row opens a detailed sliding panel.
4. **Expense Details**:
   - Edit expense details or view the original uploaded receipt.

---

## Prerequisites

- Node.js (v14 or later)
- Firebase account for image storage
- Azure account with the Document Intelligence service configured
- API key and endpoint for Azure Document Intelligence

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bytebill.git
   cd bytebill
2. Install dependencies:
   ```bash
   npm install
3. Configure environment variables: Create a `.env.local` file in the root of the project and add the following:
   ```bash
   AZURE_FORM_RECOGNIZER_ENDPOINT=<your-endpoint>
   AZURE_FORM_RECOGNIZER_KEY=<your-api-key>
   AZURE_FORM_RECOGNIZER_MODEL=<your-azure-model> 'prebuilt-receipt' in this case
   FIREBASE_API_KEY=<your-firebase-api-key> 
   FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   FIREBASE_PROJECT_ID=<your-firebase-project-id> 
   FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
   FIREBASE_APP_ID=<your-firebase-app-id>
   FIREBASE_MEASUREMENT_ID=<your-firebase-measurement-id>
4. Start the development server::
   ```bash
   npm run dev
## Notes

1.  **API Simplification**:
    
    -   For simplicity, the APIs for Azure integration are implemented directly in Next.js.
    -   Alternatively, you can use the [Bytebill Server](https://github.com/anujgawde/bytebill-server) (NestJS) for the backend and update the frontend API calls.

## Stay in touch

- Author - [Anuj Gawde](https://x.com/axgdevv)

export default function SlidingPanel({ expenseId, isOpen }) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const openPanel = (expense) => {
    setSelectedExpense(expense);
    setIsPanelOpen(true);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };
  return (
    <div
      className={`fixed top-0 right-0 h-full bg-white transition-transform duration-300 ease-in-out ${
        isPanelOpen ? "translate-x-0" : "translate-x-full"
      } w-[70%] shadow-lg z-50`}
    >
      {/* Close Button */}
      <button
        onClick={closePanel}
        className="absolute top-4 right-4 text-gray-700 font-bold text-lg"
      >
        Close
      </button>

      {/* Panel Content */}
      {selectedExpense && (
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Expense Details</h2>
          <p>
            <strong>Merchant Name:</strong> {selectedExpense.merchantName}
          </p>
          <p>
            <strong>Type:</strong> {selectedExpense.docType}
          </p>
          <p>
            <strong>Contact:</strong> {selectedExpense.merchantPhoneNumber}
          </p>
          <p>
            <strong>Address:</strong> {selectedExpense.merchantAddress}
          </p>
          <p>
            <strong>Date:</strong> {selectedExpense.transactionDate}
          </p>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useDashboard } from '../context/DashboardContext';

const emptyForm = {
  date: '',
  description: '',
  category: 'Groceries',
  type: 'expense',
  amount: '',
  source: '',
};

export default function TransactionModal() {
  const {
    showModal,
    setShowModal,
    editingTransaction,
    addTransaction,
    updateTransaction,
    categories,
  } = useDashboard();

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTransaction) {
      setForm({ ...editingTransaction, amount: String(editingTransaction.amount) });
    } else {
      setForm(emptyForm);
    }
  }, [editingTransaction, showModal]);

  if (!showModal) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      amount: Number(form.amount),
    };

    if (editingTransaction) {
      updateTransaction(payload);
    } else {
      addTransaction(payload);
    }

    setShowModal(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="section-head compact">
          <div>
            <h3>{editingTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>
            <p>Only admin can add or edit transactions</p>
          </div>
          <button className="close-btn" onClick={() => setShowModal(false)}>×</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Date
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
          </label>
          <label>
            Description
            <input type="text" name="description" value={form.description} onChange={handleChange} required />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label>
            Amount
            <input type="number" name="amount" value={form.amount} onChange={handleChange} min="0" step="0.01" required />
          </label>
          <label>
            Source / Recipient
            <input type="text" name="source" value={form.source} onChange={handleChange} required />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-btn" onClick={() => setShowModal(false)}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {editingTransaction ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

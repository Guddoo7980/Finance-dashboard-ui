import { Download, Pencil, Plus, Search, SlidersHorizontal } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency, formatDate } from '../utils/formatters';

function exportJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'transactions.json';
  link.click();
  URL.revokeObjectURL(url);
}

export default function TransactionsTable() {
  const {
    filteredTransactions,
    categories,
    role,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    openAddModal,
    openEditModal,
  } = useDashboard();

  return (
    <section className="card table-card">
      <div className="section-head">
        <div>
          <h3>Recent Transactions</h3>
          <p>Search, filter, sort, and manage transaction records</p>
        </div>

        <div className="toolbar-actions">
          {role === 'admin' && (
            <button className="primary-btn" onClick={openAddModal}>
              <Plus size={16} /> Add Transaction
            </button>
          )}
          <button className="icon-btn" onClick={() => exportJSON(filteredTransactions)} title="Export JSON">
            <Download size={16} />
          </button>
        </div>
      </div>

      <div className="filters-grid">
        <label className="field search-field">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by transaction, source, category, or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <label className="field">
          <SlidersHorizontal size={16} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="field">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="amount-desc">Amount High to Low</option>
            <option value="amount-asc">Amount Low to High</option>
          </select>
        </label>
      </div>

      {filteredTransactions.length ? (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Source</th>
                <th>Type</th>
                <th>Amount</th>
                {role === 'admin' && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>#{transaction.id} · {transaction.description}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.source}</td>
                  <td>
                    <span className={`status ${transaction.type}`}>{transaction.type}</span>
                  </td>
                  <td className={transaction.type === 'income' ? 'amount income' : 'amount expense'}>
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </td>
                  {role === 'admin' && (
                    <td>
                      <button className="edit-btn" onClick={() => openEditModal(transaction)}>
                        <Pencil size={14} /> Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="empty-state">No transactions match the selected filters.</div>
      )}
    </section>
  );
}

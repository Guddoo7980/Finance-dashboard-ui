import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { categories, initialTransactions, trendData } from '../data/mockData';

const DashboardContext = createContext(null);

const STORAGE_KEYS = {
  transactions: 'finance-dashboard-transactions',
  role: 'finance-dashboard-role',
  theme: 'finance-dashboard-theme',
};

export function DashboardProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.transactions);
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [role, setRole] = useState(() => localStorage.getItem(STORAGE_KEYS.role) || 'admin');
  const [theme, setTheme] = useState(() => localStorage.getItem(STORAGE_KEYS.theme) || 'light');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.transactions, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.role, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.theme, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const filteredTransactions = useMemo(() => {
    const normalizedSearch = search.toLowerCase();
    const list = transactions.filter((item) => {
      const matchesSearch =
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch) ||
        item.source.toLowerCase().includes(normalizedSearch) ||
        String(item.id).includes(normalizedSearch);

      const matchesType = typeFilter === 'all' ? true : item.type === typeFilter;
      const matchesCategory = categoryFilter === 'all' ? true : item.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case 'amount-asc':
          return a.amount - b.amount;
        case 'amount-desc':
          return b.amount - a.amount;
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'date-desc':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return sorted;
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);

  const summary = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income').reduce((sum, item) => sum + item.amount, 0);
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
    const balance = income - expenses;

    return {
      income,
      expenses,
      balance,
      transactionCount: transactions.length,
    };
  }, [transactions]);

  const spendingBreakdown = useMemo(() => {
    const expenseTransactions = transactions.filter((item) => item.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, item) => sum + item.amount, 0);

    return expenseTransactions.reduce((acc, item) => {
      const found = acc.find((entry) => entry.name === item.category);
      if (found) {
        found.value += item.amount;
      } else {
        acc.push({ name: item.category, value: item.amount });
      }
      return acc;
    }, []).map((item) => ({
      ...item,
      percentage: totalExpenses ? Math.round((item.value / totalExpenses) * 100) : 0,
    }));
  }, [transactions]);

  const insights = useMemo(() => {
    const topCategory = [...spendingBreakdown].sort((a, b) => b.value - a.value)[0];
    const currentMonthIncome = transactions
      .filter((t) => t.type === 'income' && new Date(t.date).getMonth() === 4)
      .reduce((sum, t) => sum + t.amount, 0);

    const currentMonthExpense = transactions
      .filter((t) => t.type === 'expense' && new Date(t.date).getMonth() === 4)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      highestSpendingCategory: topCategory?.name || 'No expenses',
      monthlySavings: currentMonthIncome - currentMonthExpense,
      observation:
        currentMonthIncome > currentMonthExpense
          ? 'You are saving more than you spend this month.'
          : 'Expenses are higher than income this month. Consider reducing discretionary spending.',
    };
  }, [spendingBreakdown, transactions]);

  const addTransaction = (payload) => {
    setTransactions((prev) => [{ ...payload, id: Date.now() }, ...prev]);
  };

  const updateTransaction = (payload) => {
    setTransactions((prev) => prev.map((item) => (item.id === payload.id ? payload : item)));
  };

  const openAddModal = () => {
    setEditingTransaction(null);
    setShowModal(true);
  };

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const value = {
    transactions,
    filteredTransactions,
    summary,
    trendData,
    spendingBreakdown,
    insights,
    categories,
    role,
    setRole,
    theme,
    setTheme,
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    sortBy,
    setSortBy,
    addTransaction,
    updateTransaction,
    showModal,
    setShowModal,
    editingTransaction,
    openAddModal,
    openEditModal,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard must be used within DashboardProvider');
  return context;
}

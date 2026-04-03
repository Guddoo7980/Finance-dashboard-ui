# Finance Dashboard UI

A responsive React finance dashboard built with Vite. It includes:

- Summary cards for balance, income, and expenses
- Balance trend chart and spending breakdown chart
- Transaction search, filter, sort, and export
- Frontend-only role-based UI
- Dark and light mode toggle for the whole dashboard
- Admin-only add/edit transaction modal
- Local storage persistence for role, theme, and transactions
- Responsive layout and empty-state handling

## Tech Stack

- React + Vite
- Recharts
- Lucide React
- Plain CSS
- Context API for state management

## Folder Structure

```bash
finance-dashboard-ui/
├── public/
├── src/
│   ├── components/
│   │   ├── BalanceChart.jsx
│   │   ├── Header.jsx
│   │   ├── InsightsPanel.jsx
│   │   ├── SpendingChart.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── TransactionModal.jsx
│   │   └── TransactionsTable.jsx
│   ├── context/
│   │   └── DashboardContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── utils/
│   │   └── formatters.js
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Setup

```bash
npm install
npm run dev
```

## Role Behavior

- **Viewer**: can only view dashboard data.
- **Admin**: can add new transactions and edit existing ones.

## Notes

- Data is mock/static but persists in browser local storage.
- The layout is inspired by the provided dashboard screenshot.
- You can further enhance it with CSV export, API integration, pagination, and auth.

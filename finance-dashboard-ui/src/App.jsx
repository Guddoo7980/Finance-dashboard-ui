import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import BalanceChart from './components/BalanceChart';
import TransactionsTable from './components/TransactionsTable';
import SpendingChart from './components/SpendingChart';
import InsightsPanel from './components/InsightsPanel';
import TransactionModal from './components/TransactionModal';
import { useDashboard } from './context/DashboardContext';

export default function App() {
  const { role } = useDashboard();

  return (
    <div className="app-shell">
      <div className="dashboard-container">
        <Header />
        <SummaryCards />
        <BalanceChart />

        <div className="content-grid">
          <div className="left-panel">
            <TransactionsTable />
          </div>

          <div className="right-panel">
            <SpendingChart />
            <InsightsPanel />
           
          </div>
        </div>
      </div>

      <TransactionModal />
    </div>
  );
}

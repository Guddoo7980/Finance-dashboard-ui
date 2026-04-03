import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency } from '../utils/formatters';

function SummaryCard({ title, value, trend, trendType, icon }) {
  return (
    <article className="summary-card card">
      <div className="summary-content">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
      <div className="summary-meta">
        <div className="summary-icon">{icon}</div>
        {trend && <span className={`pill ${trendType}`}>{trend}</span>}
      </div>
    </article>
  );
}

export default function SummaryCards() {
  const { summary } = useDashboard();

  return (
    <section className="summary-grid">
      <SummaryCard
        title="Total Balance"
        value={formatCurrency(summary.balance)}
        icon={<Wallet size={24} />}
      />
      <SummaryCard
        title="Monthly Income"
        value={formatCurrency(summary.income)}
        trend="+3.5%"
        trendType="positive"
        icon={<ArrowUpRight size={24} />}
      />
      <SummaryCard
        title="Monthly Expenses"
        value={formatCurrency(summary.expenses)}
        trend="-2.1%"
        trendType="negative"
        icon={<ArrowDownRight size={24} />}
      />
    </section>
  );
}

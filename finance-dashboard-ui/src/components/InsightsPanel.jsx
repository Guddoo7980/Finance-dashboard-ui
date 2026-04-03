import { CircleDollarSign, Lightbulb, TrendingUp } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency } from '../utils/formatters';

export default function InsightsPanel() {
  const { insights } = useDashboard();

  const items = [
    {
      icon: <TrendingUp size={18} />,
      label: 'Highest Spending Category',
      value: insights.highestSpendingCategory,
    },
    {
      icon: <CircleDollarSign size={18} />,
      label: 'Monthly Savings',
      value: formatCurrency(insights.monthlySavings),
    },
    {
      icon: <Lightbulb size={18} />,
      label: 'Observation',
      value: insights.observation,
    },
  ];

  return (
    <section className="card insights-card">
      <div className="section-head compact">
        <div>
          <h3>Insights</h3>
          <p>Quick observations from your activity</p>
        </div>
      </div>
      <div className="insights-list">
        {items.map((item) => (
          <div className="insight-item" key={item.label}>
            <span className="insight-icon">{item.icon}</span>
            <div>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { formatCurrency } from '../utils/formatters';

const COLORS = ['#3b82f6', '#14b8a6', '#f97316', '#7c3aed', '#ef4444', '#f59e0b'];

export default function SpendingChart() {
  const { spendingBreakdown } = useDashboard();

  return (
    <section className="card spending-card">
      <div className="section-head compact">
        <div>
          <h3>Spending Breakdown</h3>
          <p>Category wise expense distribution</p>
        </div>
      </div>

      {spendingBreakdown.length ? (
        <>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height={270}>
              <PieChart>
                <Pie
                  data={spendingBreakdown}
                  innerRadius={58}
                  outerRadius={105}
                  paddingAngle={2}
                  dataKey="value"
                  nameKey="name"
                  label={({ percentage }) => `${percentage}%`}
                >
                  {spendingBreakdown.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="legend-list">
            {spendingBreakdown.map((item, index) => (
              <div className="legend-item" key={item.name}>
                <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <strong>{item.percentage}%</strong>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="empty-state small">No expense data available for breakdown.</div>
      )}
    </section>
  );
}

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { formatCompactCurrency } from '../utils/formatters';

export default function BalanceChart() {
  const { trendData } = useDashboard();

  return (
    <section className="card chart-card">
      <div className="section-head">
        <div>
          <h3>Balance Trend</h3>
          <p>Weekly balance growth across recent months</p>
        </div>
        <div className="tab-group">
          <button className="active">Weekly</button>
          <button>Monthly</button>
          <button>Yearly</button>
        </div>
      </div>

      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={trendData} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.28} />
                <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--grid)" vertical={false} />
            <XAxis dataKey="label" tickLine={false} axisLine={false} />
            <YAxis tickFormatter={formatCompactCurrency} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => formatCompactCurrency(value)} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="var(--accent)"
              strokeWidth={3}
              fill="url(#balanceFill)"
              dot={{ r: 5, fill: 'var(--surface)', stroke: 'var(--accent)', strokeWidth: 3 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

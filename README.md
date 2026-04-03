📊 Finance Dashboard UI

A clean and interactive Finance Dashboard UI built with React. This project demonstrates frontend design, component structure, and data handling without relying on a backend.

🚀 Objective

This project is designed to:

Showcase frontend development skills
Build an intuitive and responsive dashboard UI
Demonstrate component-based architecture in React
Handle and visualize financial data effectively
✨ Features
📈 Dashboard Overview
Displays financial trends using charts
Clean and modern UI layout
🔄 Trend Filtering
Toggle between:
Weekly
Monthly
Yearly
Chart updates dynamically based on selected range
🌗 Dark / Light Mode
Toggle button to switch theme across entire dashboard
👥 Role-Based UI
Viewer
Can only view data
Admin
Can add/edit transactions
📊 Data Visualization
Built using Recharts
Smooth and responsive charts
Currency formatting included
📱 Fully Responsive
Works across all screen sizes
Optimized layout for mobile, tablet, and desktop
🛠️ Tech Stack
React (Vite)
Recharts
CSS / Custom Styling
Context API (for state management)
📂 Folder Structure
finance-dashboard-ui/
│
├── src/
│   ├── components/
│   │   ├── BalanceChart.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   │
│   ├── context/
│   │   └── DashboardContext.jsx
│   │
│   ├── utils/
│   │   └── formatters.js
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles/
│       └── global.css
│
├── package.json
└── README.md
⚙️ Installation & Setup
1. Clone the repository
git clone <your-repo-link>
cd finance-dashboard-ui
2. Install dependencies
npm install
3. Run the project
npm run dev
4. Open in browser
http://localhost:5173
📊 Data Structure (Trend Example)

To make Weekly, Monthly, and Yearly filters work correctly:

[
  {
    label: "Week 1",
    balance: 12000,
    month: "Jan",
    monthlyBalance: 48000,
    year: "2024",
    yearlyBalance: 580000
  }
]
🎯 Key Highlights
Simple but scalable architecture
Clean UI with attention to UX
Reusable components
Dynamic chart updates
Theme switching support
🧠 Design Philosophy
Keep UI simple and readable
Focus on clarity over complexity
Use modular components
Ensure smooth user interaction
🔮 Future Improvements
Backend integration (Node.js / MongoDB)
Authentication system
Real-time data updates
Export reports (PDF / CSV)
Advanced analytics
📌 Notes
This is a frontend-focused project
Not intended to be production-ready
Built for learning and evaluation purposes

import React, { useState, useMemo, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#4CAF50", "#FF6384", "#36A2EB", "#FFCE56"];

const initialData = [
  { id: 1, date: "2026-03-01", amount: 5000, category: "Salary", type: "income" },
  { id: 2, date: "2026-03-02", amount: 800, category: "Food", type: "expense" },
  { id: 3, date: "2026-03-03", amount: 1200, category: "Rent", type: "expense" },
  { id: 4, date: "2026-03-05", amount: 2000, category: "Freelance", type: "income" }
];

export default function Dashboard() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("tx");
    return saved ? JSON.parse(saved) : initialData;
  });
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
   const [sort, setSort] = useState("date");

  useEffect(() => {
    localStorage.setItem("tx", JSON.stringify(transactions));
  }, [transactions]);

  const filtered = useMemo(() => {
    let data = transactions.filter(t => {
      const s = t.category.toLowerCase().includes(search.toLowerCase());
      const f = filter === "all" || t.type === filter;
      return s && f;
    });

    if (sort === "amount") data.sort((a, b) => b.amount - a.amount);
    if (sort === "date") data.sort((a, b) => new Date(b.date) - new Date(a.date));

    return data;
  }, [transactions, search, filter, sort]);

  const income = transactions.filter(t => t.type === "income").reduce((a, t) => a + t.amount, 0);
  const expense = transactions.filter(t => t.type === "expense").reduce((a, t) => a + t.amount, 0);
  const balance = income - expense;

  const categoryData = useMemo(() => {
    const map = {};
    transactions.forEach(t => {
      if (t.type === "expense") map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return Object.keys(map).map(k => ({ name: k, value: map[k] }));
  }, [transactions]);

  const trendData = useMemo(() => {
    let bal = 0;
    return [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(t => {
        bal += t.type === "income" ? t.amount : -t.amount;
        return { date: t.date, balance: bal };
      });
  }, [transactions]);

  const highestCategory = categoryData.sort((a, b) => b.value - a.value)[0]?.name || "None";

  const addTx = () => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      amount: 1000,
      category: "Misc",
      type: "expense"
    };
    setTransactions([...transactions, newTx]);
  };

  const deleteTx = id => setTransactions(transactions.filter(t => t.id !== id));

  return (
    <div className="container">
      <h1>💰 Finance Dashboard</h1>

      <div className="top-bar">
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="cards">
        <div className="card balance">Balance ₹{balance}</div>
        <div className="card income">Income ₹{income}</div>
        <div className="card expense">Expense ₹{expense}</div>
      </div>

      <div className="charts">
        <LineChart width={400} height={250} data={trendData}>
          <XAxis dataKey="date" />
             <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#4CAF50" />
        </LineChart>

        <PieChart width={300} height={250}>
          <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={80}>
            {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      <div className="controls">
        <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
        {role === "admin" && <button onClick={addTx}>+ Add</button>}
      </div>
       <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan="5">No Data</td></tr>
          ) : filtered.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.category}</td>
              <td>₹{t.amount}</td>
              <td className={t.type === "income" ? "green" : "red"}>{t.type}</td>
              {role === "admin" && (
                <td><button className="delete" onClick={() => deleteTx(t.id)}>Delete</button></td>
              )}
            </tr>
          ))}
           </tbody>
      </table>
    </div>
  );
}
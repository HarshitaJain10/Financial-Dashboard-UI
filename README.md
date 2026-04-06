# Financial-Dashboard-UI
# 💰 Finance Dashboard UI

## 📌 Overview

This project is a frontend Finance Dashboard built using React to help users track financial activity, explore transactions, and understand spending patterns.

The application focuses on clean UI, modular component structure, and efficient state management. It works entirely on the frontend using mock data and does not depend on any backend services.

---

## 🚀 Features

### 📊 Dashboard Overview

* Summary cards displaying:

  * Total Balance
  * Total Income
  * Total Expenses
* Time-based visualization:

  * Line chart showing balance trend
* Category-based visualization:

  * Pie chart for spending breakdown

---

### 💳 Transactions Section

* Displays transaction details:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)
* Functionalities:

  * 🔍 Search by category
  * 🎯 Filter by type (Income / Expense)
  * 🔄 Sort by date or amount
* Handles empty state gracefully

---

### 🔐 Role-Based UI (Simulated)

* **Viewer**

  * Can only view data
* **Admin**

  * Can add new transactions
  * Can delete transactions
* Role switching implemented via dropdown

---

### 📈 Insights Section

* Provides simple financial insights:

  * Highest spending category
  * Monthly comparison of expenses
* Helps users understand spending behavior

---

### ⚙️ State Management

* Implemented using React Hooks:

  * useState
  * useMemo
  * useEffect
* Manages:

  * Transactions data
  * Filters and sorting
  * User roles

---

### 💾 Data Persistence

* Uses LocalStorage to persist data
* Ensures data is retained after refresh

---

## 🛠️ Tech Stack

* React (JavaScript)
* Recharts (for data visualization)
* CSS (custom styling)

---

## 🧑‍💻 Setup Instructions

1. Clone the repository:
   git clone <your-repo-link>

2. Navigate to project folder:
   cd finance-dashboard

3. Install dependencies:
   npm install

4. Install chart library:
   npm install recharts

5. Start the application:
   npm start

---

## 📌 Assumptions

* Data is mocked and handled on frontend
* No backend or authentication is implemented
* Role-based access is simulated for demonstration

---

## 🔮 Future Improvements

* Edit transaction functionality
* Enhanced UI/UX and responsiveness
* Dark mode support
* Export data (CSV/JSON)
* Advanced analytics and insights

---

## 👩‍💻 Author

Harshita Jain

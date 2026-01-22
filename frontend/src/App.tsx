import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ExpenseList } from './components/expenses/ExpenseList';
import { ExpenseForm } from './components/expenses/ExpenseForm';
import { IncomeSettings } from './components/income/IncomeSettings';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expenses" element={<ExpenseList />} />
          <Route path="/expenses/new" element={<ExpenseForm />} />
          <Route path="/expenses/:id/edit" element={<ExpenseForm />} />
          <Route path="/settings" element={<IncomeSettings />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

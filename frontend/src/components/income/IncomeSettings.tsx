import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { RetroCard } from '../common/RetroCard';
import { RetroButton } from '../common/RetroButton';
import { RetroInput } from '../common/RetroInput';
import { useIncome } from '../../hooks/useIncome';
import { formatCurrency } from '../../utils/formatters';

export function IncomeSettings() {
  const { income, saveIncome, monthlyIncome } = useIncome();

  const [biweeklyAmount, setBiweeklyAmount] = useState('');
  const [lastPayDate, setLastPayDate] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (income) {
      setBiweeklyAmount(income.biweeklyAmount.toString());
      setLastPayDate(income.lastPayDate.split('T')[0]);
    }
  }, [income]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    saveIncome({
      biweeklyAmount: parseFloat(biweeklyAmount),
      lastPayDate: new Date(lastPayDate).toISOString()
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  // Calculate next pay dates
  const getNextPayDates = () => {
    if (!income?.lastPayDate) return [];
    const dates: Date[] = [];
    const lastPay = new Date(income.lastPayDate);
    const now = new Date();

    let nextPay = new Date(lastPay);
    while (nextPay <= now) {
      nextPay.setDate(nextPay.getDate() + 14);
    }

    for (let i = 0; i < 3; i++) {
      dates.push(new Date(nextPay));
      nextPay.setDate(nextPay.getDate() + 14);
    }

    return dates;
  };

  const nextPayDates = getNextPayDates();

  return (
    <RetroCard title="Income Settings" className="income-settings">
      <form className="expense-form" onSubmit={handleSubmit}>
        <RetroInput
          id="biweeklyAmount"
          label="Bi-weekly Income"
          type="number"
          step="0.01"
          min="0"
          value={biweeklyAmount}
          onChange={(e) => setBiweeklyAmount(e.target.value)}
          placeholder="Enter your bi-weekly pay"
          required
        />

        <RetroInput
          id="lastPayDate"
          label="Last Pay Date"
          type="date"
          value={lastPayDate}
          onChange={(e) => setLastPayDate(e.target.value)}
          required
        />

        <div className="expense-form__actions">
          <RetroButton type="submit" variant="primary">
            Save Settings
          </RetroButton>
        </div>

        {saved && (
          <div style={{ color: 'var(--neon-green)', marginTop: '12px' }}>
            Settings saved!
          </div>
        )}
      </form>

      {income && (
        <div className="income-settings__info">
          <div className="income-settings__info-item">
            <span className="income-settings__info-label">Monthly Est.</span>
            <span className="income-settings__info-value">
              {formatCurrency(monthlyIncome)}
            </span>
          </div>
          <div className="income-settings__info-item">
            <span className="income-settings__info-label">Yearly Est.</span>
            <span className="income-settings__info-value">
              {formatCurrency(income.yearlyIncome ?? income.biweeklyAmount * 26)}
            </span>
          </div>

          {nextPayDates.length > 0 && (
            <>
              <div
                style={{
                  marginTop: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--bg-hover)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '10px',
                  color: 'var(--neon-cyan)',
                  marginBottom: '8px'
                }}
              >
                Upcoming Pay Dates
              </div>
              {nextPayDates.map((date, i) => (
                <div key={i} className="income-settings__info-item">
                  <span className="income-settings__info-label">
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                  <span className="income-settings__info-value">
                    {date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </RetroCard>
  );
}

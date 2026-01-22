import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <h1 className="header__title">Expense Tracker</h1>
        <nav className="header__nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/expenses"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Expenses
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `header__link ${isActive ? 'header__link--active' : ''}`
            }
          >
            Settings
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

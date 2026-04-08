import { NavLink } from "react-router-dom";
import styles from "./AdminSectionNav.module.css";

const navItems = [
  {
    to: "/adminpanel",
    label: "Dashboard",
    description: "Current store data, core KPIs and customer snapshot.",
    end: true,
  },
  {
    to: "/adminpanel/catalog",
    label: "Product Modify",
    description: "Create, edit, delete products and manage image paths.",
    end: false,
  },
  {
    to: "/adminpanel/orders",
    label: "Orders",
    description:
      "Aggregated order activity built from current admin store data.",
    end: false,
  },
];

const AdminSectionNav = () => {
  return (
    <div className={styles.shell}>
      <nav className={styles.nav} aria-label="Admin sections">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <span>{item.label}</span>
            <small>{item.description}</small>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default AdminSectionNav;

import AdminSectionNav from "./AdminSectionNav";
import styles from "../pages/AdminWorkspace.module.css";

type AdminPageHeaderProps = {
  title: string;
  description: string;
  meta: string;
};

const AdminPageHeader = ({
  title,
  description,
  meta,
}: AdminPageHeaderProps) => {
  return (
    <section className={styles.heroFrame}>
      <div className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Flow Admin</p>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.heroText}>{description}</p>
        </div>
        <span className={styles.sectionMeta}>{meta}</span>
      </div>

      <AdminSectionNav />
    </section>
  );
};

export default AdminPageHeader;

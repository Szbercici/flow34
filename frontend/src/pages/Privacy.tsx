import styles from "./Privacy.module.css";

const Privacy = () => {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Privacy Policy</h1>
        <p className={styles.effectiveDate}>Effective date: April 14, 2026</p>

        <section className={styles.section}>
          <h2>1. INTRODUCTION</h2>
          <p>
            Flow Webshop (the "Data Controller", "we", "us") is committed to
            protecting the personal data of visitors and customers. This notice
            explains how we process personal data in line with the GDPR
            (Regulation (EU) 2016/679) and applicable Hungarian laws.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. DATA CONTROLLER DETAILS</h2>
          <p>Name: Flow Webshop Kft. (fictional company for this project)</p>
          <p>Registered office: 1111 Budapest, Flow Street 10.</p>
          <p>Tax number: 12345678-1-12</p>
          <p>Company registration number: 01-09-123456</p>
          <p>Representative: Flow Webshop Management</p>
          <p>Email: flowproducts@gmail.com</p>
        </section>

        <section className={styles.section}>
          <h2>3. DEFINITIONS</h2>
          <p>
            Personal data: any information related to an identified or
            identifiable natural person.
          </p>
          <p>
            Data processing: any operation performed on personal data (for
            example collection, storage, access, transfer, or deletion).
          </p>
          <p>
            Data processor: a partner processing personal data on our behalf
            (for example hosting, delivery, or payment providers).
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. DATA PROCESSING BY ACTIVITY</h2>
          <h3>4.1. Online shopping and account registration</h3>
          <p>
            Data processed: name, billing address, shipping address, email
            address, phone number.
          </p>
          <p>
            Purpose: order fulfillment, invoicing, delivery, and customer
            communication.
          </p>
          <p>Legal basis: performance of a contract [GDPR Article 6(1)(b)].</p>
          <p>
            Retention: accounting records are kept for 8 years under Hungarian
            accounting requirements.
          </p>

          <h3>4.2. Contact requests</h3>
          <p>Data processed: name, email address, and message content.</p>
          <p>Purpose: responding to customer questions and support requests.</p>
          <p>Legal basis: consent of the data subject.</p>
          <p>Retention: up to 1 year after the request is closed.</p>

          <h3>4.3. Cookies</h3>
          <p>
            Our website may place small data files (cookies) in your browser.
          </p>
          <p>
            Essential cookies: support cart and session functionality.
          </p>
          <p>
            Analytics/marketing cookies: used only with consent (for example
            analytics tools).
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. DATA PROCESSORS (DATA TRANSFERS)</h2>
          <p>
            Hosting: Fictional Hosting Kft. - Example City, Example Street 1.
          </p>
          <p>Delivery: GLS General Logistics Systems Hungary Kft.</p>
          <p>Payment provider: Barion Payment Zrt. - Budapest</p>
          <p>Invoicing/accounting: Szamlazz.hu - KBOSS.hu Kft.</p>
        </section>

        <section className={styles.section}>
          <h2>6. DATA SECURITY MEASURES</h2>
          <p>
            We apply reasonable technical and organizational safeguards
            (including SSL/TLS encryption and access-protected systems) to
            protect personal data against unauthorized access and misuse.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. YOUR RIGHTS</h2>
          <p>You have the right to access, rectify, and erase your data.</p>
          <p>You may object to processing where permitted by law.</p>
          <p>
            You may request data portability in a machine-readable format.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. COMPLAINTS AND REMEDIES</h2>
          <p>
            If you have any privacy concern, please contact us first at:
            flowproducts@gmail.com
          </p>
          <p>
            Supervisory authority: National Authority for Data Protection and
            Freedom of Information (NAIH)
          </p>
          <p>Address: 1055 Budapest, Falk Miksa utca 9-11.</p>
          <p>Website: www.naih.hu</p>
          <p>Email: ugyfelszolgalat@naih.hu</p>
        </section>
      </div>
    </main>
  );
};

export default Privacy;

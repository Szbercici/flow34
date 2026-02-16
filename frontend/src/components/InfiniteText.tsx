import Marquee from "react-fast-marquee";

const InfiniteText = () => {
  return (
    <div style={{ padding: '70px 0', background: 'var(.)', color: 'transparent', WebkitTextStroke: '2px var(--accent-color)' }}>
      <Marquee 
        speed={60}        
        gradient={true}
        pauseOnHover={false} 
        autoFill={true}
      >
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', margin: '0 40px' }}>Fresh • Sustainibiltiy • Zero sugar • Eco friendly • The healthy way •</h2>
      </Marquee>
    </div>
  );
};

export default InfiniteText;
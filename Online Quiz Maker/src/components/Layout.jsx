import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container" style={{ padding: '2rem 1.5rem' }}>
        <Outlet />
      </main>
    </>
  );
}

import ShopPage from './pages/ShopPage';
import Dashboard from './pages/Dashboard';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
const hostname = window.location.hostname; // e.g., shop1.localtest.me
// const parts = hostname.split('.');
// const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');
// const isSubdomain = parts.length > 2 || (!isLocalhost && parts.length > 1);
const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'localhost';
const isSubdomain = hostname.endsWith(baseDomain) && hostname.split('.').length > 2;

if (isSubdomain) {
  return <ShopPage />;
}

  return (
    <div style={{ width: '100%' }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/shop" element={<ShopPage/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

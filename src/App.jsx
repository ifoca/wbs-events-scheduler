import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import AuthState from './contexts/AuthState';

function App() {
  return (
    <BrowserRouter>
      <AuthState>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="event/:id" element={<EventDetails />} />
              <Route path="login" element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="create" element={<CreateEvent />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </Routes>
          <Footer />
        </div>
      </AuthState>
    </BrowserRouter>
  );
}

export default App;

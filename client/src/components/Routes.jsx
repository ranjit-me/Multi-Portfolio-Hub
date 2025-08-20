import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import About from '../pages/About';
import Template from '../pages/Template';
import TemplateDemo from '../pages/TemplateDemo';
import NotFound from '../pages/NotFound';
import Login from './Login';
import ProfileEdit from './ProfileEdit';
import ProfileView from './ProfileView';
import Dashboard from './Dashboard';
import ApiTest from './ApiTest';

// Layout component that includes navigation for authenticated users
const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      {isAuthenticated && <Navigation />}
      {children}
    </>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/" 
        element={
          <>
            <Navigation />
            <Home />
            <Footer />
          </>
        } 
      />
      <Route 
        path="/about" 
        element={
          <>
            <Navigation />
            <About />
            <Footer />
          </>
        } 
      />
      <Route 
        path="/templates" 
        element={
          <>
            <Navigation />
            <Template />
            <Footer />
          </>
        } 
      />
      <Route 
        path="/templates/demo/:templateId" 
        element={<TemplateDemo />} 
      />
      <Route 
        path="/login" 
        element={
          isAuthenticated ? (
            <Navigate to={`/${localStorage.getItem('username')}`} replace />
          ) : (
            <>
              <Login />
              <Footer />
            </>
          )
        } 
      />

      {/* API Test Route - temporary */}
      <Route 
        path="/api-test" 
        element={
          <>
            <Navigation />
            <ApiTest />
            <Footer />
          </>
        } 
      />
      
      {/* Dashboard Route - Protected */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Navigation />
            <Dashboard />
            <Footer />
          </ProtectedRoute>
        } 
      />

      {/* Profile Routes */}
      <Route 
        path="/:username" 
        element={
          <>
            <Navigation />
            <Dashboard />
            <Footer />
          </>
        } 
      />
      
      {/* Legacy Dashboard Route - Redirect to protected */}
      <Route 
        path="/dashboard-old" 
        element={
          <ProtectedRoute>
            <Navigation />
            <Dashboard />
            <Footer />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Profile Edit Route */}
      <Route 
        path="/profile/edit" 
        element={
          <ProtectedRoute>
            <Navigation />
            <ProfileEdit />
            <Footer />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Profile Edit Route with Username */}
      <Route 
        path="/:username/edit" 
        element={
          <ProtectedRoute>
            <Navigation />
            <ProfileEdit />
            <Footer />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all route - redirect to 404 */}
      <Route path="*" element={
        <>
          <NotFound />
          <Footer />
        </>
      } />
    </Routes>
  );
};

export default AppRoutes;

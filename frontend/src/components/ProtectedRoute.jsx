import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, type = 'student' }) {
  if (type === 'admin') {
    const token = localStorage.getItem('admin_token');
    if (!token) return <Navigate to="/admin/login" replace />;
  } else {
    const token = localStorage.getItem('pea_token');
    if (!token) return <Navigate to="/login" replace />;
  }
  return children;
}

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      // Redirect to the login page if the user is not authenticated
      router.replace('/');
    } else {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    // Render nothing if not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
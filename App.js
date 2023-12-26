import AppNavigation from "./navigation/appNavigation";

import { AuthProvider } from "./constants/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigation />
    </AuthProvider>
  );
}

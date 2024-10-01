import AuthProvider from "./src/context/AuthContext";
import Rotas from "./src/routes/Rotas";

export default function App() {
  return (
    <AuthProvider>
      <Rotas />
    </AuthProvider>
  );
}

import PMain from './Pages/PMain';
import { UserContextProvider } from './context/userContext';

export default function App() {
  return (
    <UserContextProvider>
      <PMain />
    </UserContextProvider>
  );
}

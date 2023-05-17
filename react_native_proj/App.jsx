import PMain from './Pages/PMain';
import { RidesContextProvider } from './context/RidesContext';
import { UserContextProvider } from './context/UserContext';

export default function App() {
  return (
    <UserContextProvider>
      <RidesContextProvider>
        <PMain />
      </RidesContextProvider>
    </UserContextProvider>
  );
}

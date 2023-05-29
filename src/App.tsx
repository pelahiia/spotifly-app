import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import './styles/main.scss';

function App() {
  const code = new URLSearchParams(window.location.search).get("code")

  return(
    <>
     {code ? <Dashboard code={code} /> : <Login />}
    </>
  )
}
export default App

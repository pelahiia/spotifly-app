import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import './styles/main.scss';

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return(
    <>
     {code ? <Dashboard code={code} /> : <Login />}
    </>
  )
}
export default App

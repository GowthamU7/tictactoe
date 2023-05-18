import {BrowserRouter as Router,Route,Link,Routes,Outlet} from "react-router-dom"
import Session from "./session"
import Details from "./details"
import Game from "./game"
function App(){
  return <Router>
    <Routes>
      <Route Component={Session} path=""></Route>
      <Route Component={Details} path="details"></Route>
      <Route Component={Game} path="game"></Route>
    </Routes>
  </Router>
}


export default App
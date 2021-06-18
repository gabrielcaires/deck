import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewPage from "./pages/New";
import Details from "./pages/Details";

function App() {
	return (
		<Router>
			<section>
				<Switch>
					<Route path="/deck/new">
						<NewPage />
					</Route>
					<Route path="/deck/:deck">
						<Details />
					</Route>
				</Switch>
			</section>
		</Router>
	);
}

export default App;

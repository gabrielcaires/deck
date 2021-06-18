import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewPage from "./pages/New";
import Details from "./pages/Details";

function App() {
	return (
		<Router>
			<main>
				<Switch>
					<Route path="/deck/new">
						<NewPage />
					</Route>
					<Route path="/deck/:id">
						<Details />
					</Route>
				</Switch>
			</main>
		</Router>
	);
}

export default App;

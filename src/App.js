import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";


const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"))

const App = () => {
  return (
    <div className="p-0 m-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)"
      }}>
      <Suspense fallback={<h2>loading route</h2>}>
        <Router>
          <header className="w-full mb-10 text-center p-7 bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
            <Link className="text-6xl text-white hover:text-gray-200" to="/">
              <h1>Adopt Me!</h1>
            </Link>
          </header>
          <Switch>
            <Route path="/details/:id">
              <Details />
            </Route>
            <Route path="/">
              <SearchParams />
            </Route>
          </Switch>

        </Router>

      </Suspense>

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));

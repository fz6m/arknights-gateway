import React, { lazy, Suspense, useRef } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import Loading from "./components/Loading";
import RotateScreen from "./components/RotateScreen";
import { setResize } from "./utils/index";
import { useEffectOnce } from "react-use";
// import { loadingTest } from "./utils/loading";

const routes = (route) => {
  return [
    {
      path: "/",
      exact: true,
      element: lazy(() =>
        import(/* webpackChunkName: "home" */ "./pages/Home")
      ),
      title: route.home,
    },
    {
      path: "/",
      exact: false,
      element: lazy(() =>
        import(/* webpackChunkName: "error" */ "./pages/Error")
      ),
      title: route.error,
    },
  ];
};

const App = (props) => {
  const $tip = useRef(null);

  useEffectOnce(() => {
    const resize = () => {
      console.log("zoom resize");
      const max = Math.max(window.innerHeight, window.innerWidth);
      document.body.style.zoom = max / 1366;
      $tip.current.style.zoom = 1366 / max;
    };
    resize();
    setResize(resize);
  });

  return (
    <Router>
      <RotateScreen ref={$tip} />
      <Switch>
        {routes(props.router).map((route) => {
          return (
            <Route
              exact={route.exact}
              path={route.path}
              key={route.path}
              render={() => (
                <Suspense fallback={<Loading />}>
                  <DocumentTitle title={route.title}>
                    <route.element />
                  </DocumentTitle>
                </Suspense>
              )}
            />
          );
        })}
      </Switch>
    </Router>
  );
};

export default connect((state) => ({ router: state.router }))(App);

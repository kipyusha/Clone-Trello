import type { AppProps } from "next/app";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";

const App = ({ Component, ...appProps }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(appProps);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
};

export default App;

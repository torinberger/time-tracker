import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StoreInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  token: string;
  username: string;
}

export default store(({ Vue }) => {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StoreInterface>({
    modules: {
      // example
    },
    mutations: {
      setToken(state, newToken) {
        state.token = newToken;
      },
      setUsername(state, newUsername) {
        state.username = newUsername;
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEV,
  });

  return Store;
});

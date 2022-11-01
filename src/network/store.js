import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // TODO - REPLACE THIS WITH PINIA. Vuex is garbage, but it is what it is

/*
    Define the following state objects:
        menu - iff a user can view a page, it will be included in this list
    security - iff a user is authenticated, this object will not be null

    State gets refreshed a lot, so we can leverage it to check out authentication.
     -> If the user is authorized via the MSAL returned values, then everything
    should function normally, the user will have active menu items they can see and 
    the only thing we will need to do is request a job title from MSAL in order to 
    know what sort of permissions the person has. Otherwise, if MSAL fails, the 
    consequent will be that the state fails to load any data, meaning that the user 
    will not have anything within the "menu" or "security" state objects.   
*/ 
export function create() {
    return new Vuex.Store({
        state: {
            app: null
        },
        mutations: {
            app(state, app) {
                state.app = app
            }
        },
        modules: {
            // Track which pages we can see (Iff a user can't see the page, he gets booted)
            menu: {
                namespaced: true,
                state: {
                    items: [],
                },
                mutations: {
                    items(state, items) {
                        state.items = items
                    },
                }
            },
            // Track the user session (Iff the user is not logged in, he gets booted)
            security: {
                namespaced: true,
                state: {
                    user: null,
                },
                mutations: {
                    user(state, user) {
                        state.user = user
                    },
                }
            }
        }
    })
}

import * as React from "react";
import { Admin , ListGuesser , Resource} from 'react-admin';
import { dataProvider } from "./Components/DataProvider";
import {WasteData} from './Components/WasteData/WasteData'
import Auth from "./Components/Auth";
import Analysis from "./Components/Analyse/Analysis";
import { CustomRoutes } from "react-admin";
import  {Route}  from 'react-router-dom';

const App = () => (
    <Admin authProvider={Auth} dataProvider={dataProvider}>
        <Resource name="waste" list={WasteData} />
        {/* <Resource name="analyse" list={Analysis} />
        <CustomRoutes>
            <Route path="/analyse" element={<Analysis/>}>Analyse</Route>
      </CustomRoutes> */}
    </Admin>
    
);

export default App;


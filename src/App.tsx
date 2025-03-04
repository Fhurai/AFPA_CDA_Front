import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from "./pages";
import Contact from "./pages/contact";
import Error from "./pages/error";
import ClientsIndex from "./pages/clients";
import ProspectIndex from "./pages/prospects";
import 'bootstrap/dist/css/bootstrap.min.css';
import Consult from "./pages/consult";
import Connexion from "./pages/connexion";
import Deconnexion from "./pages/deconnexion";

function App() {
  return (
    <div id={"application"}>
      <BrowserRouter>
        <Routes>
          <Route index path={"/"} element={<IndexPage typePage={""}/>}/>
          <Route path={"/contact"} element={<Contact/>}/>
          <Route path={"/connexion"} element={<Connexion />} />
          <Route path={"/deconnexion"} element={<Deconnexion />} />
          <Route path={"/clients"}>
            <Route path={"/clients/"} element={<ClientsIndex typePage={"clients"}/>}/>
            <Route path={"/clients/:id/view"} element={<Consult consulttype={'view'} datatype={'client'}/>}/>
            <Route path={"/clients/create"} element={<Consult consulttype={'create'} datatype={'client'}/>}/>
            <Route path={"/clients/:id/update"} element={<Consult consulttype={'update'} datatype={'client'}/>}/>
            <Route path={"/clients/:id/delete"} element={<Consult consulttype={'delete'} datatype={'client'}/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>
          <Route path={"/prospects"}>
            <Route path={"/prospects/"} element={<ProspectIndex typePage={"prospects"}/>}/>
            <Route path={"/prospects/:id/view"} element={<Consult consulttype={'view'} datatype={'prospect'}/>}/>
            <Route path={"/prospects/create"} element={<Consult consulttype={'create'} datatype={'prospect'}/>}/>
            <Route path={"/prospects/:id/update"} element={<Consult consulttype={'update'} datatype={'prospect'}/>}/>
            <Route path={"/prospects/:id/delete"} element={<Consult consulttype={'delete'} datatype={'prospect'}/>}/>
            <Route path="*" element={<Error/>}/>
          </Route>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

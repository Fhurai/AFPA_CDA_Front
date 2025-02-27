import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import IndexPage from "./pages";
import Contact from "./pages/contact";
import Error from "./pages/error";
import ClientsIndex from "./pages/clients";
import ProspectIndex from "./pages/prospects";

function App() {
    return (
        <div id={"application"}>
            <BrowserRouter>
                <Routes>
                    <Route index path={"/"} element={<IndexPage/>}/>
                    <Route path={"/contact"} element={<Contact/>}/>
                    <Route path={"/clients"}>
                      <Route path={"/clients/"} element={<ClientsIndex />} />
                      <Route path={"/clients/create"} />
                      <Route path={"/clients/update"} />
                      <Route path={"/clients/delete"} />
                      <Route path="*" element={<Error/>}/>
                    </Route>
                    <Route path={"/prospects"}>
                      <Route path={"/prospects/"} element={<ProspectIndex />} />
                      <Route path={"/prospects/"} />
                      <Route path={"/prospects/"} />
                      <Route path={"/prospects/"} />
                    </Route>
                    <Route path="*" element={<Error/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;

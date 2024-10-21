import logoBntu from './img/BNTU.svg';
import {FormattedMessage, IntlProvider} from 'react-intl'
import './App.css';
import WordComponent from './pages/WordComponent';
import LoginComponent from "./pages/LoginComponent";
import EditorComponent from "./pages/EditorComponent";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {LOCALES} from './i18n/locales'
import {messages} from './i18n/messages'
import React, {useState} from "react";

import Footter from "./pages/Footter";
import {getUserRole, setAuthHeader} from "./service/Authservice";
import "./css/bootstrap.min.css"
import "./css/magnific-popup.css"
import "./css/font-awesome.min.css"
import "./css/themify-icons.css"
import "./css/nice-select.css"
import "./css/flaticon.css"
import "./css/gijgo.css"
import "./css/animate.css"
import "./css/slicknav.css"
import "./css/style.css"

// import "./css-js/cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
// import "./css/cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
// import "./css/cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"

function App() {
    const [locale, setLocale] = useState(LOCALES.RUSSIAN);

    return (

        <Router>
            <div>

                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <script src="selectList.js"/>

                <IntlProvider
                    messages={messages[locale]}
                    locale={locale}
                    defaultLocale={LOCALES.ENGLISH}>

                    <nav className="navbar navbar-expand-lg navbar-light bg-white">
                        <a href="https://bntu.by/" className="m-2"> <img src={logoBntu} alt="" height="70"/> </a>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/chapters/1/terms"><FormattedMessage id='home'/> <span
                                        className="sr-only">(current)</span></a>
                                </li>
                                {(getUserRole() === "EDITOR" || getUserRole() === "ADMIN") ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="/editor"><FormattedMessage id='editor'/> <span
                                            className="sr-only">(current)</span></a>
                                    </li> : ""
                                }
                                {(getUserRole() === "ADMIN") ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="/admin"><FormattedMessage id='users'/> <span
                                            className="sr-only">(current)</span></a>
                                    </li> : ""
                                }
                                <li className="nav-item">
                                    {(getUserRole() === null) ?
                                        <a className="nav-link disabled" href="/login"><FormattedMessage id='sign_in'/></a> :
                                        <a className="nav-link disabled" href="/logout"
                                           onClick={() => setAuthHeader(null, null)}><FormattedMessage
                                            id='sign_out'/></a>
                                    }
                                </li>
                            </ul>
                        </div>
                        {/*Select Lang -- start*/}
                        <select id="selectPagesLang" className="custom-select " name="langSelect"
                                style={{width: '100px'}}>
                            <option disabled><FormattedMessage id='select'/></option>
                            <option value="ru" onClick={(e) => setLocale(LOCALES.RUSSIAN)}><FormattedMessage
                                id='russian'/>
                            </option>
                            <option value="en" onClick={(e) => setLocale(LOCALES.ENGLISH)}><FormattedMessage
                                id='english'/>
                            </option>
                            <option value="ch" onClick={(e) => setLocale(LOCALES.CHINA)}><FormattedMessage id='china'/>
                            </option>
                        </select>
                        {/*Select Lang -- end*/}
                    </nav>

                    <content>
                        <Routes>
                            <Route path='/chapters/:chapterId/terms' element={<WordComponent/>}/>
                            <Route path='/login' element={<LoginComponent/>}></Route>
                            <Route path='/editor' element={<EditorComponent/>}></Route>
                        </Routes>
                    </content>

                    <Footter/>

                </IntlProvider>

                <script src="css-js/code.jquery.com/jquery-3.2.1.slim.min.js"
                        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
                        crossOrigin="anonymous"></script>
                <script src="css-js/cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                        crossOrigin="anonymous"></script>
                <script src="css-js/maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                        crossOrigin="anonymous"></script>

            </div>
        </Router>
    );

}

export default App;

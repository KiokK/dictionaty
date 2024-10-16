import axios from 'axios';
import logoBntu from './BNTU.svg';
import {FormattedDate, FormattedMessage, FormattedNumber, FormattedPlural, IntlProvider} from 'react-intl'
import './App.css';
import WordComponent from './pages/WordComponent';
import LoginComponent from "./pages/LoginComponent";
import EditorComponent from "./pages/EditorComponent";
import {Link, BrowserRouter as Router, Routes, Route, useParams} from 'react-router-dom';
import { LOCALES } from './i18n/locales'
import { messages } from './i18n/messages'
import React, {useState} from "react";

function App() {
    const [locale, setLocale] = useState(LOCALES.RUSSIAN);

  return (
      <div>
          <link rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
                integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
                crossOrigin="anonymous"/>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
                  integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                  crossOrigin="anonymous"></script>

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
                              <a className="nav-link" href="/terms"><FormattedMessage id='home'/> <span
                                  className="sr-only">(current)</span></a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link disabled" href="/login"><FormattedMessage id='sign_in'/></a>
                          </li>
                      </ul>
                  </div>
                  {/*Localization*/}
                  <select id="selectPagesLang" className="custom-select " name="langSelect" style={{width: '100px'}}>
                      <option disabled><FormattedMessage id='select'/></option>
                      <option value="ru" onClick={(e) => setLocale(LOCALES.RUSSIAN)}><FormattedMessage id='russian'/>
                      </option>
                      <option value="en" onClick={(e) => setLocale(LOCALES.ENGLISH)}><FormattedMessage id='english'/>
                      </option>
                      <option value="ch" onClick={(e) => setLocale(LOCALES.CHINA)}><FormattedMessage id='china'/>
                      </option>
                  </select>
              </nav>

              <header className="App-header">
                  <div><br/> <br/><br/><br/><br/>
                      <FormattedMessage id='title'/>
                  </div>
              </header>
              <content>
                  <Router>
                      {/*<Navbar />*/}
                      <Routes>
                          <Route path='/terms' exact element={<WordComponent/>}/>
                          {/* <Route path='/login' exact element={<Login/>} /> */}
                          <Route path='/login' element={<LoginComponent/>}></Route>
                          <Route path='/editor' element={<EditorComponent/>}></Route>

                      </Routes>
                  </Router>
              </content>
              <footer><br/>
                  <hr/>
                  <div className="bg-light">
                      <div className="container text-center mt-5 mb-0">
                          <br/><br/><br/><br/>
                          <div className="row">
                              <div className="col-lg-5 text-center bg-white form-control">
                                  <p><br/>
                                      <i className="fas fa fa-graduation-cap"
                                         style={{fontSize: '28px', color: 'forestgreen', opacity: 0.7}}></i><b><a
                                          href="#" className="text-black"> Электронный словарь</a></b><br/>
                                      <span>Словарь электронного репозитория БНТУ</span>
                                      <br/>
                                  </p>
                              </div>
                              <div className="col-2"></div>
                              <div className="col-5 text-center bg-white form-control">
                                  <p>
                                      <br/><i className="fas fa fa-graduation-cap"
                                              style={{fontSize: '28px', color: 'forestgreen', opacity: 0.7}}></i>
                                      <b><a href="#">Научная библиотека БНТУ</a></b><br/>
                                      <span>Пр-т. Независимости...</span>
                                  </p>
                              </div>

                          </div>
                          <br/><br/><br/><br/>
                          {/*<FormattedDate value={Date.now()}/>*/}
                          {/*<br/><br/>*/}
                      </div>
                  </div>
              </footer>
          </IntlProvider>

      </div>
  );

}

export default App;

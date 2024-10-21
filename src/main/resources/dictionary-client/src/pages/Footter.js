import React, {useState} from "react";

const Footter = () =>  {
    return (<>
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
                                    href="https://rep.bntu.by/handle/data/111582" className="text-black"> Электронный словарь</a></b><br/>
                                <span>Словарь электронного репозитория БНТУ</span>
                                <br/>
                            </p>
                        </div>
                        <div className="col-2"></div>
                        <div className="col-5 text-center bg-white form-control">
                            <p>
                                <br/><i className="fas fa fa-graduation-cap"
                                        style={{fontSize: '28px', color: 'forestgreen', opacity: 0.7}}></i>
                                <b><a href="https://library.bntu.by">Научная библиотека БНТУ</a></b><br/>
                                <span>г.Минск, ул.Якуба колоса, 16</span>
                            </p>
                        </div>

                    </div>
                    <br/><br/><br/><br/>
                </div>
            </div>
        </footer>
    </>);

}

export default Footter

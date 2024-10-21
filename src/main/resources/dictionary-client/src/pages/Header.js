import React, {useState} from "react";
import {FormattedMessage} from "react-intl";

const Header = () =>  {
    return (<>
        <div className="slider_area">
            <div className="single_slider slider_bg_1 align-items-center">

                <div className="mt-4 ml-4 col-md-6">
                    <div className="slider_text">
                        <h3><FormattedMessage
                            id='title'/> </h3>
                    </div>
                </div>
                <div className="container d-flex ">
                    <div className="row">
                        <div className="col-lg-5 col-md-6">
                            <div className="slider_text">
                                {/*<h3><FormattedMessage id='title'/> </h3>*/}
                                {/*<p>Lorem ipsum dolor sit amet, consectetur <br/>*/}
                                {/*    adipiscing elit, sed do eiusmod.</p>*/}
                                <a href="https://rep.bntu.by/bitstream/handle/data/111582/Russko_kitajsko_anglijskij.pdf?sequence=1&isAllowed=y" className="boxed-btn4"><FormattedMessage
                                    id='download'/></a>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="dog_thumb d-none d-lg-block">*/}
                {/*    <img src="../img/banner/dog.png" alt=""/>*/}
                {/*</div>*/}
            </div>
        </div>
        </>);
}

export default Header

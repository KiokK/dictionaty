import React, { useState } from 'react'
import { loginAPICall, setAuthHeader } from '../service/Authservice';
import {useNavigate} from 'react-router-dom'

import { FormattedMessage } from 'react-intl'
import Header from "./Header";

const LoginComponent = () => {

    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginForm(e){
        e.preventDefault();

        loginAPICall(username, password).then((response) => {
            // console.log(response.data);
            setAuthHeader(response.data.token, response.data.role);

            if (response.data.role !== "ADMIN" && response.data.role !== "EDITOR") {
                alert("Profile is not active - connect to admin!");
                return;
            }
            navigate(`/editor`);
            window.location.reload()
        }).catch(error => {
            alert("Неверный логи или пароль!");
            console.error(error);
        })
    }

    return (<>
        <Header/>

        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h2 className='text-center'>
                                <FormattedMessage id='sign_in' />
                            </h2>
                        </div>

                        {/*Login form on page*/}
                        <div className='card-body'>
                            <form>
                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> <FormattedMessage id='login' /> </label>
                                    <div className='col-md-9'>
                                        <input type='text' name='username' className='form-control' placeholder='Enter username'
                                            value={username} onChange={ (e) => setUsername(e.target.value)}>
                                        </input>
                                    </div>
                                </div>

                                <div className='row mb-3'>
                                    <label className='col-md-3 control-label'> <FormattedMessage id='password' /> </label>
                                    <div className='col-md-9'>
                                        <input type='password' name='password' className='form-control' placeholder='Enter password'
                                            value={password} onChange={ (e) => setPassword(e.target.value)}>
                                        </input>
                                    </div>
                                </div>
                                <div className='form-group mb-3 text-center'>
                                    <button className='btn btn-success' onClick={ (e) => handleLoginForm(e)}>
                                        <FormattedMessage id='enter' />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default LoginComponent

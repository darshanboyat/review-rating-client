import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import theme from '../../Assets/bg.png'
import star from '../../Assets/star.jpeg'
// import './Signin.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { changePasswordForVarifiedUser } from '../../features/auth'
import { useNavigate, useParams } from 'react-router-dom'

const Index = () => {
    const dispatch = useDispatch();

    const defaultValue = {
        newPassword: '',
        confirmPassword: '',
    }
    const validationSchema = yup.object().shape({
        newPassword: yup.string().required("Please Enter Password"),
        confirmPassword: yup.string().required("Please Enter Password"),
        // newPassword: yup.string().required()("Please Enter Password"),
        // confirmPassword: yup.string().required()("Please Enter Password"),

    })
    
    const {id, token} = useParams()

    const handelSubmit = (value) => {
        console.log(value)
        value = {...value, id, token};
        console.log(value)
        dispatch(changePasswordForVarifiedUser(value))
    }

    const user = useSelector(state => state.user)

    const navigate = useNavigate();

    useEffect(() => {
        if (user.user === '' && user.msg === '' && user.error === '' && user.loading === false && user.token === '') {
            console.log("Loading")
        }
        else if (user.msg === '' && user.loading === false)
            toast.error(user.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        else if (user.error === '' && user.loading === false) {
            toast.success(user.msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            // dispatch(clearState())
            setTimeout(() => {
                navigate('/auth/signin')
            }, 3000)
        }
    }, [user])

    return (
        <>
            <div className="text-sm">
                <ToastContainer />
            </div>

            <div className="flex main-container">
                <div className="left-container">
                    <h1 className='hue'>Welcome</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> consectetur adipisicing elit</p>
                    <img src={theme} alt="" loading='lazy' className='theme' width="80%" />
                </div>
                <div className="right-container">
                    <div className="form">
                        <div className="flex form-head">
                            <div className="ball-group">
                                <div className="signin-ball" />
                                <div className="signin-ball2" />
                            </div>
                            <h2 className='form-heading'>Reset Password</h2>
                            <img src={star} alt="" loading='lazy' className='star' width="10%" />
                        </div>
                        <div className="form-container">
                            <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handelSubmit}>
                                <Form>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter New Password" name="newPassword" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='newPassword' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Re-Enter Password" name="confirmPassword" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='confirmPassword' />
                                        </p>
                                    </div>
                
                                    <button className='mt-8 btn btn-primary login-btn' type="submit" >Reset</button>
                                    <div className="flex link">
                                        <p>Don't have an account &nbsp;</p>
                                        <a href="/auth/signup"> Signup</a>
                                    </div>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index
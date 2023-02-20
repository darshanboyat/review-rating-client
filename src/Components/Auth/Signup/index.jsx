import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import theme from '../../../Assets/bg.png'
import star from '../../../Assets/star.jpeg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { signupUser, clearState } from '../../../features/auth'
import { useNavigate } from 'react-router-dom'
import './Signin.css'

const Index = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const navigate = useNavigate();

    const [profilepic, setProfilePic] = useState("");


    const addUserPic = (e) => {
        console.log(e.target.files[0])
        setProfilePic(e.target.files[0]);
    }

    useEffect(() => {
        if (user.user === "" && user.msg === "" && user.error === "" && user.loading === false && user.token === "") {
            console.log("Loading")
        }
        else if (user.msg === "" && user.loading === false)
        {
            console.log(user)
            toast.error(user.error, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
        else if (user.error === "" && user.loading === false) {
            console.log(user)
            toast.success(user.msg, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setTimeout(() => {
                dispatch(clearState())
                navigate('/')
            }, 2000)
        }
    }, [user])



    const defaultValue = {
        name: '',
        email: '',
        password: '',
        mobile: '',
        city: '',
        state: '',
        profilepic: ''
    }
    const validationSchema = yup.object().shape({
        name: yup.string().required("Please Enter Name"),
        email: yup.string().required().email("Please Enter Email"),
        password: yup.string().required("Please Enter Password"),
        city: yup.string().required("Please Enter City"),
        state: yup.string().required("Please Enter state"),
        mobile: yup.string().required("Please Enter mobile number"),
        profilepile: yup.string()
    })
    const handelSubmit = (value) => {
        // const formdata = new FormData();
        // formdata.append('profilepic', imgData);
        // value.profilepic = formdata

        // console.log(formdata.get('profilepic'))
        // setData(value)
        // axios.post('http://localhost:9000/user/registerUser', data)
        // .then(res => console.log(res))
        // .catch(err => console.log(err));

        // using redux thunk - toolkit
        const userObj = { ...value, profilepic: profilepic }
        console.log("net data:- ", userObj)
        dispatch(signupUser(userObj));
    }


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
                                <div className="ball" />
                                <div className="ball2" />
                            </div>
                            <h2 className='form-heading'>Sign Up</h2>
                            <img src={star} loading='lazy' alt="" className='star' width="10%" />
                        </div>
                        <div className="form-container">
                            <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handelSubmit}>
                                <Form>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your Name" name="name" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='name' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your Email" name="email" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='email' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your Mobile Number" name="mobile" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='mobile' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your Password" name="password" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='password' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your City" name="city" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='city' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1'>
                                        <Field placeholder="Enter Your state" name="state" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='state' />
                                        </p>
                                    </div>

                                    <div className='col-md-12 mt-1 img-upload'>
                                        <p>Upload Image +</p>
                                        <input type="file" name="userProfilePic" id="" onChange={addUserPic} required />
                                    </div>

                                    <button className='mt-8 btn btn-primary login-btn signup-btn' type="submit">Submit</button>
                                    <div className="flex link">
                                        <p>I already have an account &nbsp;</p>
                                        <a href="/auth/signin"> Login</a>
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

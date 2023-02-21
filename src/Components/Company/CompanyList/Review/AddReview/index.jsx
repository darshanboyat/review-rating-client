import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { createCompany } from '../../../features/company';
import CloseIcon from '@mui/icons-material/Close';
import { toggleUpdate } from '../../../features/company'
// import './createCompany.css'
import { getUser } from '../../../utils/HelperFunctions';

const Index = () => {
    const dispatch = useDispatch();

    const defaultValue = {
        companyName: '',
        location: '',
        city: '',
        founded: '',
        companyLogo: ''
    }
    const validationSchema = yup.object().shape({
        companyName: yup.string().required("Please Enter Company Name"),
        location: yup.string().required("Please Enter location"),
        city: yup.string().required("Please Enter City"),
        founded: yup.date().required("Please Enter Company Founded founded"),
        companyLogo: yup.string()
    })
    const [company_logo, setCompanyLogo] = useState("")


    const addCompanyLogo = (e) => {
        // console.log(e.target.files[0])
        setCompanyLogo(e.target.files[0])
    }


    const handelSubmit = (value) => {
        // const user = getUser();
        
        var user = localStorage.getItem("user")
        user = JSON.parse(user);
        value = { ...value, userId: user._id, company_logo}

        console.log("Data:- ", value)
        dispatch(createCompany(value))
    }
    const { cmsg, error } = useSelector(state => state.company)

    useEffect(() => {
        if (cmsg) {
            toast.success(cmsg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (error) {
            toast.error(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [cmsg, error])




    return (
        <div className='add-company-container'>
            <div className="text-sm">
                <ToastContainer />
            </div>
            <div className="flex create-company-form-wrapper">
                <div className="right-container">
                    <div className="form">
                        <div className="flex form-head">
                            <div className="ball-group">
                                <div className="create-company-ball" />
                                <div className="create-company-ball2" />
                            </div>
                            <h2 className='createCompany-form-heading'>Add Company</h2>
                            <button className="close-btn" onClick={() => dispatch(toggleUpdate(false))}><CloseIcon /></button>
                        </div>
                        <div className="createCompany-container">
                            <Formik initialValues={defaultValue} validationSchema={validationSchema} onSubmit={handelSubmit}>
                                <Form>
                                    <div className='col-md-12 mt-1 create-company-field-wrapper'>
                                        <label htmlFor="" className='createCompany-label'>Company Name</label>
                                        <Field placeholder="Enter Your company name" name="companyName" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='companyName' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1 create-company-field-wrapper'>
                                        <label htmlFor="" className='createCompany-label'>Location</label>
                                        <Field placeholder="Enter Your location" name="location" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='location' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1 create-company-field-wrapper'>
                                        <label htmlFor="" className='createCompany-label'>City</label>
                                        <Field placeholder="Enter Your City" name="city" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='city' />
                                        </p>
                                    </div>
                                    <div className='col-md-12 mt-1 create-company-field-wrapper'>
                                        <label htmlFor="" className='createCompany-label'>Founded on</label>
                                        <Field type="date" placeholder="Enter Your Company Founded date " name="founded" />
                                        <p className='text-danger'>
                                            <ErrorMessage name='founded' />
                                        </p>
                                    </div>

                                    <div className='col-md-12 mt-1 create-company-field-wrapper img-upload'>
                                        <p>Upload Company Logo +</p>
                                        <input type="file" name="userProfilePic" id="" onChange={addCompanyLogo} required />
                                    </div>
                                    <button className='mt-8 btn btn-primary login-btn' type="submit">Create</button>
                                </Form>
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
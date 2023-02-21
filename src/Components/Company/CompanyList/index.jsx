import React, { useEffect, useState } from 'react'
import CreateCompany from "../CreateCompany";
import { useDispatch, useSelector } from 'react-redux';
import { CompanyList, toggleUpdate, CompanyDetail } from '../../../features/company';
import Navbar from '../../Navbar'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Rating from './RatingStars'
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './CompanyList.css'



const Index = () => {

  const dispatch = useDispatch();
  const [addReviewBtn, setAddReviewBtn] = useState(false);

  useEffect(() => {
    dispatch(CompanyList())
  }, [dispatch])

  var companyList = []
  companyList = useSelector(state => state.company)

  const navigate = useNavigate();

  const handelDetail = async (data) => {
    console.log("Tab:- ", data)

    navigate(`/company/review/${data._id}`)
  }

  const [expanded, setExpanded] = useState('');
  const [expandedContent, setExpandedContent] = useState(undefined);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  companyList.company_data.length > 0 && companyList.company_data.map(data => (
    console.log(data)
  ))

  return (
    <div>
      <Navbar />

      <div className="flex dashboard-btns">

        <input type="text" name="" id="" placeholder="Search company in city....   " />
        <button>Find Company</button>
        <button onClick={() => dispatch(toggleUpdate(true))}>Add Company</button>
      </div>

      <div className="company-list">

        {
          companyList.company_data.length > 0 && companyList.company_data.map(data => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                  m: 1,
                  width: "100vw",
                  height: "auto",
                  px: 2
                },
              }}
            >
              <a href={`/company/review/${data._id}`} className="company-list-url">
                <Paper elevation={3} sx={{ px: 6, py: 5, cursor: "pointer" }} >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box sx={{ display: 'flex' }}>
                      <img className="company-logo" src="data:image/jpeg;base64,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" class="img-thumbnail" alt="..." />

                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography sx={{ mt: 2, ml: 5, fontSize: 13, fontWeight: "medium", color: "gray" }}>Founded {data.founded} </Typography>
                        <Typography sx={{ mt: 2, ml: 5, fontWeight: "bold" }}>{data.companyName}</Typography>
                        <Typography sx={{ mt: 2, ml: 5, fontSize: 13, fontWeight: "medium", color: "gray" }}><LocationOnIcon />{data.city} {data.location}</Typography>
                        <Rating rate={4} />
                      </Box>
                    </Box>
                    <ArrowForwardIosIcon />
                  </Box>
                </Paper >
              </a>

            </Box >
          ))
        }
      </div>
      {companyList.toggle && <CreateCompany />}
    </div>
  )
}
export default Index

































{/* 




              import * as React from 'react';
              import {styled} from '@mui/material/styles';
              import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
              import MuiAccordion from '@mui/material/Accordion';
              import MuiAccordionSummary from '@mui/material/AccordionSummary';
              import MuiAccordionDetails from '@mui/material/AccordionDetails';
              import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
              <MuiAccordion disableGutters elevation={0} square {...props} />
              ))(({theme}) => ({
                border: `1px solid ${theme.palette.divider}`,
              '&:not(:last-child)': {
                borderBottom: 0,
  },
              '&:before': {
                display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
              <MuiAccordionSummary
                expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
                {...props}
              />
              ))(({theme}) => ({
                backgroundColor:
              theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, .05)'
              : 'rgba(0, 0, 0, .03)',
              flexDirection: 'row-reverse',
              '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                transform: 'rotate(90deg)',
  },
              '& .MuiAccordionSummary-content': {
                marginLeft: theme.spacing(1),
  },
}));

              const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
                padding: theme.spacing(2),
              borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

  

              return (
              <div>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Collapsible Group Item #1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum dolor
                      sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                      sit amet blandit leo lobortis eget.
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </div>
              );
} */}
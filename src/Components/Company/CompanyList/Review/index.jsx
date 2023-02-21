import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import Navbar from "../../../Navbar"
import Rating from '../RatingStars';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Avatar from '@mui/material/Avatar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Review.css'

export default function SimplePaper() {

    const [review, setReview] = React.useState(undefined)

    const { id } = useParams();


    React.useEffect(() => {
        axios.get(`http://localhost:9000/company/reviews/${id}`).then(res => setReview(res.data.compDetails))
    }, [review])


    return (
        <>
            <Navbar />
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: "80vw",
                        height: "auto",
                        px: 2,
                        my: 8,
                        mb: 12,
                        ml: 20
                    },
                }}
            >
                <Paper elevation={3} sx={{ py: 5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box sx={{ display: 'flex' }}>
                            <img height="40%" className="review-company-logo" src="https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGRhcmt8ZW58MHwwfDB8fA%3D%3D&auto=format&fit=crop&w=200&q=60" class="img-thumbnail" alt="..." />

                            {review && <>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Typography sx={{ mt: .7, ml: 5, fontSize: 13, fontWeight: "bold", color: "gray" }}>Founded {review.companyName.founded} </Typography>
                                    <Typography sx={{ mt: .7, ml: 5, fontWeight: "bold" }}>{review.companyName.companyName}</Typography>
                                    <Typography sx={{ mt: .7, ml: 5, fontSize: 13, fontWeight: "medium", color: "gray" }}><LocationOnIcon />{review.companyName.city} {review.companyName.location}</Typography>
                                    {review && <Rating rate={4} total={true} count={review.comment.length} />}
                                </Box>
                            </>}
                        </Box>
                        <button className="add-review-btn">+ Add Review</button>
                    </Box>

                    {review !== undefined && review.comment.length > 0 && review.comment.map(data => (
                        <Box sx={{ mt: 5, px: 2 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignItems: 'center' }}>
                                    <Avatar alt="Harish Sharp" src="/static/images/avatar/1.jpg" />
                                    <Box>
                                        <Typography sx={{ ml: 2 }}>{data.name}</Typography>
                                        <Typography sx={{ ml: 2, color: "grey", fontSize: ".75rem", fontWeight: "bold", letterSpacing: '.07rem' }}>01-01-2022  14:33</Typography>
                                    </Box>
                                </Box>
                                <Rating rate={data.rating} total={false} />
                            </Box>
                            <Box sx={{ mt: 1, ml: 7 }}>
                                <Typography>
                                    {data.review}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: "center", mt: 2 }}> <a href="">See all</a> </Box>
                </Paper >

            </Box >
        </>
    );
}

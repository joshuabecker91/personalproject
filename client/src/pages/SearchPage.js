import React, { useState, useEffect } from 'react';
import './SearchPage.css'
import { Link } from 'react-router-dom';
import Search from '../components/Search';
import SearchIcon from '@material-ui/icons/Search';
import ImageIcon from '@material-ui/icons/ImageOutlined';
import LocalOfferIcon from '@material-ui/icons/LocalOfferOutlined';
import VideoIcon from '@material-ui/icons/VideoCallOutlined';
import DescriptionIcon from '@material-ui/icons/DescriptionOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVertOutlined';
import { useStateValue } from '../StateProvider';
import UseGoogleSearch from '../components/UseGoogleSearch';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Response from '../Response';
// import SettingsIcon from '@material-ui/icons/SettingsOutlined';

const SearchPage = () => {

    const [{term}, dispatch] = useStateValue();

    const navigate = useNavigate(); 

    // LIVE API CALL
    const { data } = UseGoogleSearch(term);
    console.log(data)

    // const data = Response;
    // console.log(data)

    const [allAds, setAllAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ad')
        .then((response) => {
            console.log(response.data);
            // if active. grab 5 random and rank highest bidder.
            setAllAds(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, [term]);


    // const handleClickAd = (id) => {
    //     axios.patch(`http://localhost:8000/api/ad/${id}`, {
    //         clicks: 1,
    //         // amountBilled: ad.amountBilled + ad.bidForPlacement,
    //     })
    //     .then((response) => {
    //         console.log(response);
    //         // setStatus(false)
    //         // navigate(address);
    //     })
    //     .catch((err) => {
    //         console.log(err.response.data.err.errors);
    //         // setErrors(err.response.data.err.errors);
    //     });
    // }

    return (
        <div className="searchPage">
            <div className='searchPage__header'>
                <Link className='searchPage__headerLeft' to="/"><img className="searchPage__logo" src='https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' alt=''></img></Link>
                <div className='searchPage__headerBody'>
                    <Search hideButtons/>
                </div>
            </div>
            <div className='searchPage__options'>
                <div className='searchPage__optionsLeft'>
                    <div className='searchPage__option'>
                        <SearchIcon/>
                        <Link to="/all">All</Link>
                    </div>
                    <div className='searchPage__option'>
                        <ImageIcon/>
                        <Link to="/images">Images</Link>
                    </div>
                    <div className='searchPage__option'>
                        <LocalOfferIcon/>
                        <Link to="/shopping">Shopping</Link>
                    </div>
                    <div className='searchPage__option'>
                        <VideoIcon/>
                        <Link to="/videos">Videos</Link>
                    </div>
                    <div className='searchPage__option'>
                        <DescriptionIcon/>
                        <Link to="/news">News</Link>
                    </div>
                    <div className='searchPage__option'>
                        <MoreVertIcon/>
                        <Link to="/more">More</Link>
                    </div>
                </div>
                <div className='searchPage__optionsRight'>
                    {/* <div className='searchPage__option'>
                        <SettingsIcon />
                        <Link to="/settings">Settings</Link>
                    </div> */}
                    <div className='searchPage__option'>
                        <Link to="/tools">Tools</Link>
                    </div>
                </div>
            </div>
            <div className='break'></div>

            <div className="d-flex justify-content-start">
            {true && (
                <div className='searchPage__results'>
                    <p className='searchPage__resultCount'>
                        About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
                    </p>

                    {data?.items.map(item => (
                        <div className='searchPage__result'>
                            <div className='searchPage__resultText'>
                                <a href={item.link}>
                                    <p>{item.displayLink}</p>
                                    <h2 className='searchPage__resultTitle' href={item.link}>{item.title}</h2>
                                </a>
                                <p className='searchPage__resultSnippet'>{item.snippet}</p>
                            </div>

                            <div>
                            {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                <img className='searchPage__resultImage' src={item.pagemap?.cse_image[0]?.src} alt=''></img>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
                <div className="col-sm-5 col-md-4 col-lg-3 ads">
                    {allAds
                    // Sort the ads by type - alphabetically
                    .sort((a, b) => {
                        if (a.bidForPlacement > b.bidForPlacement) return -1;
                        if (a.bidForPlacement < b.bidForPlacement) return 1;
                        return 0;
                    })
                    .map((ad, index) => {
                        return (
                            <div className="m-4">
                                <div className="card px-3 py-2 col-10 ad" key={ad._id}>
                                    <h5>{ad.campaignTitle}</h5>
                                    {/* <p>Bid: {ad.bidForPlacement}</p> */}
                                    <a href={ad.targetAddress}>{ad.displayLink}</a>
                                    {/* href={ad.targetAddress}  */}
                                    {/* onClick={() => handleClickAd(ad._id)} */}
                                    <p>{ad.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>



            {/* <h1>{term}</h1> */}

            {/* add map through images for new component */}

        </div>
    )
}

export default SearchPage;
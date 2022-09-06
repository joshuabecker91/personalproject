import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllAds = () => {

    const [allAds, setAllAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/ad')
        .then((response) => {
            console.log(response.data);
            setAllAds(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, []);

    return (
        <div className="col-sm-11 col-md-10 col-lg-8 mx-auto">
            <h2 className="my-4 py-4">Campaign Dashboard</h2>
            <div className="col-12 d-flex justify-content-between my-4 align-items-center">
                <div className="d-flex justify-content-start col-4">
                    <Link to={"/new"}>
                        <button className="btn btn-dark">See All Ads</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-end col-8">
                    <Link to={"/new"}>
                        <button className="btn btn-dark mx-2">User Profile</button>
                    </Link>
                    <Link to={"/new"}>
                        <button className="btn btn-success">New Campaign</button>
                    </Link>
                </div>
            </div>
            <div className="card p-2">
                <table className="col-12 mx-auto table table-hover text-start mt-4">
                    <thead className="col-12">
                        <tr className="text-start col-12">
                            <th className="col-3">Campaign Title</th>
                            <th className="col-3">Address</th>
                            <th className="col-1">Status</th>
                            {/* <th className="col-2">Date Created</th> */}
                            <th className="col-1">Clicks</th>
                            <th className="col-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody  className="col-12">
                        {allAds
                        // Sort the ads by type - alphabetically
                        .sort((a, b) => {
                            if (a.campaignTitle.toLowerCase() < b.campaignTitle.toLowerCase()) return -1;
                            if (a.campaignTitle.toLowerCase() > b.campaignTitle.toLowerCase()) return 1;
                            return 0;
                        })
                        .map((ad, index) => {
                            return (
                                <tr className="text-start col-12" key={ad._id}>
                                    <td className="col-3">{ad.campaignTitle}</td>
                                    <td className="col-3"><a href={`${ad.targetAddress}`}>{ad.displayLink}</a></td>
                                    <td className="col-1">{ad.status.toString() === "true" ? "Active" : "Paused"}</td>
                                    {/* <td className="col-2">{ad.createdAt}</td> */}
                                    <td className="col-1">{ad.clicks}</td>
                                    <td className="col-4">
                                        <Link to={`/${ad._id}`}>
                                            <button className="btn btn-primary mx-1">Details</button>
                                        </Link>
                                        {/* <Link to={`/${ad._id}`}>
                                            <button className="btn btn-secondary mx-1">{ad.status.toString() === "true" ? "Pause" : "Resume"}</button>
                                        </Link> */}
                                        <Link to={`/${ad._id}/update`}>
                                            <button className="btn btn-warning mx-1">Update</button>
                                        </Link>
                                        {/* <button className="btn btn-danger" onClick={() => handleDeletePet(pet._id)}>Adopt</button> */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllAds;
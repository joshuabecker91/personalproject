import React from 'react'
import { Link,useParams } from 'react-router-dom';

const AdUpdate = (props) => {

    const { id } = useParams();
    console.log(id);

    return (
        <div className="col-xs-12 col-md-10 col-lg-8 mx-auto">
            <h1 className="my-4 py-4">Update Campaign</h1>
            <div className="col-12 d-flex justify-content-between my-4 align-items-center">
                <div className="d-flex justify-content-start col-4">
                    <Link to={"/"}>
                        <button className="btn btn-dark">See All Ads</button>
                    </Link>
                </div>
                <div className="d-flex justify-content-end col-8">
                    <Link to={"/new"}>
                        <button className="btn btn-dark mx-2">User Profile</button>
                    </Link>
                    {/* <Link to={"/new"}>
                        <button className="btn btn-success">New Campaign</button>
                    </Link> */}
                </div>
            </div>
        </div>
    )
}

export default AdUpdate;
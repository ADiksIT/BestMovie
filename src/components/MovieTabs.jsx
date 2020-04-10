import React from "react";

const MovieTabs = (props) => {
    const { sort_by, updateSortBy } = props;

    const handelClick = (value) => {
        return () => {
            updateSortBy(value);
        };
        
    };

    const getClassLink = (value) => {
        return `nav-link ${
            sort_by === value ? "active" : ""
        }`
    };
    return (
    <ul className="tabs nav nav-pills">
        <li className="nav-item">
            <div className={getClassLink('popularity.desc')}
            onClick={handelClick("popularity.desc")}>
            Popularity
            </div>
        </li>
        <li className="nav-item">
            <div className={getClassLink('revenue.desc')}
            onClick={handelClick("revenue.desc")}>
            Revenue
            </div>
        </li>
        <li className="nav-item">
            <div className={getClassLink('vote_average.desc')}
            onClick={handelClick("vote_average.desc")}>
            Vote average
            </div>
        </li>
    </ul>
    );
};

export default MovieTabs;

import React from "react";
class PageSwitching extends React.Component {
    render(){
        const {totalPages, nextPage, prevPage} = this.props;
        let {page} = this.props;
        return(
            <div className="col-12 d-flex justify-content-between">
                <button className="btn mb-4 btn-light" onClick={()=>{
                    prevPage();
                }}>Previos</button>
                <p>Page: {page} of {totalPages}</p>
                <button className="btn mb-4 btn-light" onClick={()=>{
                    nextPage();
                }}>Next</button>
            </div>
        ); 
    };
}
export default PageSwitching;
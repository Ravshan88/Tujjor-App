import React from 'react';
import './Loading.css'

function Loading(props) {
    return (
        <div
            className="bg-white d-flex justify-content-center align-items-center gap-2 p-2" style={{height:"150px"}}>
            <div>
                <div id="loading-bar-spinner" className="spinner">
                    <div className="spinner-icon"></div>
                </div>
            </div>
        </div>
    );
}
export default Loading;
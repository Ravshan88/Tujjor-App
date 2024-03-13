import React from 'react';
import {connect} from "react-redux";
import {catalogActions} from "pages/Telegram/Catalog/Redux/catalogReducer";

function Basket(props) {
    return (
        <div>
            Add Product
        </div>
    );
}

export default connect((state) => state, catalogActions)(Basket);
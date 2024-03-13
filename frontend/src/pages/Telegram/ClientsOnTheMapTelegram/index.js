import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import ClientsOnTheMap from "../../Clients/Components/ClientOnTheMap/clientsOnTheMap";

function Index(props) {
    const {token} = useParams()
    useEffect(() => {
        localStorage.setItem("access_token", token)
        localStorage.setItem("no_token","sorry")
    }, [token]);
    return (
        <div id={"bigFather"}>
            <div id={"bottomDiv"}>
                <ClientsOnTheMap />
            </div>
        </div>
    );
}

export default Index;
import React, {useContext, useEffect} from "react";
import {connect} from "react-redux";
import Table from "../../../universal/Table/Table";
import {companyProfileActions} from "./Redux/Reducers/companyProfileReducer";
import langData from "../../../../Languages/Language.json"
import LanguageContext from "../../../../Languages/Contex/Language";


function Company(props) {
    const {langIndex} = useContext(LanguageContext)
    const {companyProfile} = props
    useEffect(() => {
        props.getCompanies();
    }, [])


    const columns = [
        {
            id: 0,
            title: "№",
            key: "index",
            type: "index",
            show: true,
        },
        {
            id: 1,
            title: "Name",
            key: "companyName",
            type: "text",
            show: true,
        },
        {
            id: 2,
            title: "Region",
            key: "region",
            type: "text",
            show: true,
        },
        {
            id: 3,
            title: "Phone",
            key: "supportPhone",
            type: "text",
            show: true,
        },
        {
            id: 4,
            title: "Email @",
            key: "email",
            type: "text",
            show: true,
        }
    ];
    return (
        <div style={{width: "100%"}}>
            <div className="d-flex flex-column align-items-start">
                <div className="title text-dark" style={{borderBottom:'2px solid #F5B301'}}>{langData[langIndex]?.companyProfile?.title}</div>
            </div>
            <Table
                excelWithoutSearch={true}
                localStoragePath="companies"
                columnOrderMode={false}
                dataProps={companyProfile.companies}
                changeSizeModeOptions={[10, 20, 50, 100, 200]}
                pagination={false}
                excel={true}
                changeSizeMode={false}
                fileName={"companies"}
                excelPath={"/excel?component=company-profile&"}
                columnsProps={columns}
            />
        </div>
    );
}

export default connect((state) => state, companyProfileActions)(Company);
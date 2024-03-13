import React, {useEffect} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {connect} from "react-redux";
import {clientsTelegramModel} from "./Redux/Reducers/clientsTelegramReducer";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import Filter from "../../universal/Filter/Filter";

function TelegramClientsDataMap(props) {
    useEffect(() => {
        props.claimData()
    }, []);

    function generateOptionsOfCity() {
        const optionsCity = [];
        props?.territories?.map((item) => {
            optionsCity.push({
                value: item.id,
                label: item.region,
            });
        });
        return optionsCity;
    }

    function generateOptionsOfCategory() {
        const optionsCategory = [];
        props?.categories?.map((item) => {
            optionsCategory.push({
                label: item.name,
                value: item.id,
            });
        });
        return optionsCategory;
    }

    return (
        <div style={{padding: 10}}>

            <Filter
                search={[
                    {
                        name: "city",
                        multi: true,
                        options: generateOptionsOfCity(),
                        defaultValue: {value: "", label: "All"},
                        placeholder: "search by territory",
                        selfEmployer: true,
                        filterApi: "/client/pagination?page={page}&limit=All"
                    },
                    {
                        name: "customerCategories",
                        multi: true,
                        options: generateOptionsOfCategory(),
                        defaultValue: {value: "", label: "All"},
                        placeholder: "Customer categories",
                        selfEmployer: true,
                        filterApi: "/client/pagination?page={page}&limit={limit}"
                    },
                ]}
            />
            {props.clients?.map((item) =>
                <div className={"my-3"}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{item?.clientName} &nbsp; {item?.telephone}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className={"text-start"}>CompanyName: &nbsp;{item?.companyName}</Typography>
                            <Typography className={"text-start"}>Territory: &nbsp;{item?.region}</Typography>
                            <Typography className={"text-start"}>Address: &nbsp;{item?.address}</Typography>
                            <Typography className={"text-start"}>Category: &nbsp;{item?.categoryName}</Typography>
                            <Typography
                                className={"text-start"}>Activity: &nbsp;{item?.active ? "Active" : "Noactive"}</Typography>
                            <Typography className={"text-start"}>Registration
                                Date: &nbsp;{new Date(item?.registrationDate).toLocaleString()}</Typography>
                            <Typography className={"text-start my-3"}><Button
                                onClick={() => props.editClient(item)}
                                variant={'contained'}><EditIcon/></Button></Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>)}
        </div>
    );
}

export default connect(state => state.clientsTelegram, clientsTelegramModel)(TelegramClientsDataMap);
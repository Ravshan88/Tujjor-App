import React, {useContext} from 'react';
import UniversalModal from "../../../../../universal/Modal/UniverModal";
import {connect} from "react-redux";
import {dealerAction} from "../../Redux/Reducers/dealerReducer";
import "../../Dealer.css"
import LanguageContext from "../../../../../../Languages/Contex/Language";
import langData from "../../../../../../Languages/Language.json"

function ModalForDealer(props) {
    const {langIndex} = useContext(LanguageContext)
    const {dealer} = props;

    return (
        <UniversalModal
            modalTitle={
                dealer.itemForTeritoryEdite === ""
                    ? `${langData[langIndex]?.dealerPage?.modal?.addTitle}`
                    : `${langData[langIndex]?.dealerPage?.modal?.editeTitle}`
            }
            checkPage={true}
            isOpen={dealer.openAgentModal}
            closeFunction={() => props.handleClose()}
            width={60}
            JsxData={
                <div className={"w-100"}>
                    <table className="table bg-dark text-white">
                        <thead className={""}>
                        <tr className={""}>
                            <th>Username</th>
                            <th>Phone</th>
                        </tr>
                        </thead>
                        <tbody>
                        {dealer.dealerAgents.map(item =>
                            <tr>
                                <td>{item.username}</td>
                                <td>{item.phone}</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            }

        />
    );
}

export default connect((state) => state, dealerAction)(ModalForDealer);
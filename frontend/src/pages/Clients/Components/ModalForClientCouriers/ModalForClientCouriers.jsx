import React, {useContext} from 'react';
import UniversalModal from "pages/universal/Modal/UniverModal";
import {connect} from "react-redux";
import {clientsAction} from "pages/Clients/Redux/Reducers/clientsReducer";
import "../../clients.css"
import LanguageContext from "../../../../Languages/Contex/Language";

function ModalForClientCouriers(props) {
    const {langIndex} = useContext(LanguageContext)
    const {clients} = props;

    console.log(clients.clients)

    return (
        <UniversalModal
            modalTitle={"Client Couriers"}
            checkPage={true}
            isOpen={clients.courierModalVisible}
            closeFunction={() => props.closeModal()}
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
                        {clients.clientCouriers.map(item =>
                            <tr>
                                <td>{item.fullName}</td>
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

export default connect((state) => state, clientsAction)(ModalForClientCouriers);
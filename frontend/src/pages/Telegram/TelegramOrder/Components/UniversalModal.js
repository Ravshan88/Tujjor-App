import React from 'react';
import {Modal} from "antd";

function UniversalModal({onOk, open, onCancel, children}) {
    return (
        <div>
            <Modal
                width={"80%"}
                onOk={onOk}
                open={open}
                onCancel={onCancel}
                okText={"Yes"}
                cancelText={"Cancel"}
            >
                {children}
            </Modal>
        </div>
    );
}

export default UniversalModal;
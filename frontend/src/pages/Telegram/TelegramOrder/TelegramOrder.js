import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux'
import {telegramOrder} from "pages/Telegram/TelegramOrder/Redux/reducer/TelegramOrderReducer";
import {useNavigate} from "react-router-dom";
import {Button, Skeleton, message, Modal, Popconfirm, Empty, Segmented, FloatButton} from "antd";
import UniversalModal from "pages/Telegram/TelegramOrder/Components/UniversalModal";

function TelegramOrder(props) {
    useEffect(() => {
        props.getOrdersStart()
        console.log(props.orders)
    }, [props.status]);
    const navigate = useNavigate();
    const openMap = (endLatitude, endLongitude) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const startLatitude = position.coords.latitude;
                const startLongitude = position.coords.longitude;
                const mapUrl = `https://yandex.com/maps/10330/bukhara/?ll=${startLongitude}%2C${startLatitude}&mode=routes&rtext=${startLatitude}%2C${startLongitude}~${endLatitude}%2C${endLongitude}&rtt=auto&ruri=~&z=16.5`;
                window.open(mapUrl, '_blank');
            }, function (error) {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };
    const [openStates, setOpenStates] = useState({});

    const showModal = (itemId) => {
        setOpenStates(prevStates => ({...prevStates, [itemId]: true}));
    };

    const hideModal = (itemId) => {
        setOpenStates(prevStates => ({...prevStates, [itemId]: false}));
    };

    function startRoute(item) {
        const deliveringOrder = props.orders.content.find(
            (item2) => item2.delivering
        );
        if (deliveringOrder) {
            message.error("There is an order already in delivery. Please complete it first.")
            hideModal(item.id)
        } else {
            hideModal(item.id)
            props.changeOrderStatusToDelivering(item.id)
            openMap(item?.latitude, item?.longitude);
        }
    }

    const handleOptionChange = (selectedValue) => {
        props.setStatus(selectedValue);
    };
    // const UniversalModal = ({onOk, open, onCancel, children}) => {
    //     console.log(children)
    //     return <Modal
    //         width={"80%"}
    //         onOk={onOk}
    //         open={open}
    //         onCancel={onCancel}
    //         okText={"Yes"}
    //         cancelText={"Cancel"}
    //     >
    //         {children}
    //     </Modal>
    // }
    return (
        <div>
            <FloatButton.BackTop/>
            <div className={"topBar"}>
                <Segmented
                    size={"large"}
                    options={[
                        {
                            label: 'Visitka',
                            value: "NEW"
                        },
                        {
                            label: 'Yuklangan',
                            value: "IN_PROGRESS"
                        },
                        {
                            label: 'Delivered',
                            value: "COMPLETED"
                        }
                    ]}
                    value={props.status}
                    onChange={handleOptionChange}
                />
            </div>
            <div className={"w-100 p-4 mx-auto orders"}>
                {
                    props.isLoading ? <div>
                        <div className={"border mb-2 rounded p-2 d-flex flex-column align-items-start"}>
                            <Skeleton active/>
                            <Skeleton.Button active={true} size="small" shape="round" block/>
                        </div>
                        <div className={"border mb-2 rounded p-2 d-flex flex-column align-items-start"}>
                            <Skeleton active/>
                            <Skeleton.Button active={true} size="small" shape="round" block/>
                        </div>
                    </div> : <>{
                        props?.orders?.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/> :
                            props?.orders?.content?.map(item => <div style={{cursor: "pointer"}}
                                                                     className={"border mb-2 rounded p-2 d-flex flex-column align-items-start"}>
                                <div onClick={() => {
                                    localStorage.setItem("productInfo", JSON.stringify(item))
                                    navigate(window.location.pathname + "/product")

                                }} className={"d-flex flex-column align-items-start w-100 gap-2"}>
                                    <h4 className={"text-center"}>Ordered by: {item?.clientName}</h4>
                                    {
                                        item?.products?.map((prod, index) =>
                                            <div className={"d-flex gap-3"}>
                                               <span>
                                                {index + 1 + ")"} {prod?.product?.title}
                                               </span>
                                                <span>
                                                   count: {prod?.count}
                                               </span>
                                            </div>
                                        )
                                    }
                                    {item?.description ?
                                        <div className={"border d-flex w-100 align-items-center rounded gap-3"}>
                                            <div className={"p-2 bg-secondary text-white"}>
                                                Description:
                                            </div>
                                            <div className={"p-2"}>
                                                {item?.description}
                                            </div>
                                        </div> :
                                        <span className={"text-warning"}>Bu buyurtma uchun izoh berilmagan</span>}
                                </div>
                                <div className={"w-100"}>
                                    {
                                        item?.status === "NEW" ? <Button
                                            type={"primary"}
                                            onClick={() => {
                                                props.changeOrderStatus({status: "IN_PROGRESS", id: item?.id})
                                            }}
                                            className={" w-100 mt-2"}>
                                            Load
                                        </Button> : item?.status === "IN_PROGRESS" ?
                                            <div className={"d-flex gap-2 mt-2"}>
                                                {item?.delivering && <div>
                                                    <Button
                                                        type={"default"}
                                                        onClick={() => {
                                                            showModal(item.id)
                                                        }}>
                                                        Completed
                                                    </Button>
                                                    <UniversalModal
                                                        // width={"80%"}
                                                        onOk={() => {
                                                            props.changeOrderStatus({
                                                                status: "COMPLETED",
                                                                id: item?.id
                                                            })
                                                        }}
                                                        open={openStates[item.id]}
                                                        onCancel={() => hideModal(item.id)}
                                                        children={`Do you want to finish ${item?.clientName + "`s"} order? `}
                                                    />
                                                </div>}
                                                <>
                                                    <Button disabled={item?.delivering} type="primary"
                                                            onClick={() => showModal(item.id)}>
                                                        Start delivery
                                                    </Button>
                                                    <UniversalModal
                                                        // width={"80%"}
                                                        onOk={() => {
                                                            startRoute(item)
                                                        }}
                                                        open={openStates[item.id]}
                                                        onCancel={() => hideModal(item.id)}
                                                        // okText="Yes"
                                                        // cancelText="Cancel"
                                                        children={"Want to start shipping to " + item?.clientName + "?"}
                                                    />
                                                </>
                                            </div> :
                                            <button disabled className={"btn btn-secondary w-100 mt-2"}>
                                                Completed
                                            </button>
                                    }
                                </div>
                            </div>)
                    }
                    </>
                }
            </div>


        </div>
    );
}

export default connect(state => state.telegramOrderSlice, telegramOrder)(TelegramOrder);
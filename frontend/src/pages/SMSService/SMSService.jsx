import "./SMSService.css";
import image from "../../images/telegram-client-header.jpeg";
import { useEffect } from "react";
import { connect } from "react-redux";
import { SmsActions } from "./Redux/SmsReducer";
import photo from "../../images/video_background.jpg";
import video from "../../images/photo.jpg";
import Filter from "../../pages/universal/Filter/Filter";
import { customerCategoryActions } from "pages/Settings/ChildComponents/CustomerCategory/Redux/Reducers/customerCategoryReducer";
import { teritoryAction } from "pages/Settings/ChildComponents/Teritory/Redux/Reducers/teritoryReducer";
import { useDispatch } from "react-redux";
import Table from "pages/universal/Table/Table";
import { clientsAction } from "pages/Clients/Redux/Reducers/clientsReducer";
import {Spin} from "antd";
const SMSService = (props) => {
  const { sms } = props;
  const dispatch = useDispatch();
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
      title: "Client name",
      key: "clientName",
      type: "text",
      show: true,
    },
    {
      id: 2,
      title: "Telephone",
      key: "telephone",
      type: "text",
      show: true,
    },

    {
      id: 3,
      title: "Category",
      key: "categoryName",
      type: "text",
      show: true,
    },
  ];
  function generateOptionsOfCity() {
    const optionsCity = [];
    props.teritory.regions.map((item) => {
      optionsCity.push({
        value: item.id,
        label: item.region,
      });
    });
    return optionsCity;
  }
  function generateOptionsOfCategory() {
    const optionsCategory = [];
    props.customerCategory.categories.map((item) => {
      optionsCategory.push({
        label: item.name,
        value: item.id,
      });
    });
    return optionsCategory;
  }
  useEffect(() => {
    props.setLoading(true);
    setTimeout(() => {
      props.setLoading(false);
    }, 500);
  }, [sms.title, sms.description]);

  useEffect(() => {
    dispatch(teritoryAction.getCities());
    dispatch(customerCategoryActions.getCategory());
    dispatch(clientsAction.getClients());
  }, [dispatch]);
  return (
    <div className="sms-service">
      <div className="title text-white">SMS Service</div>
      <div className="hints">
        <div className="hint">
          <div className="hint_title">
            <i class="bi bi-file-text"></i> Шаблон SMS
          </div>
        </div>
        <div className="hint_content">
          <div className="hint_content_title">
            <i class="bi bi-key"></i>
            Описание Ключей
          </div>
          <div className="hint_content_area">
            <div className="big_area">
              <div className="hint_item">
                <span>{"{name}"}</span>
                <span>-> Имя Клиента</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="sms-service-content">
        <div className="workspace_area">
          <div className="left_area">
            <input
              onChange={(e) => props.setTitle(e.target.value)}
              type="text"
              value={sms.title}
              className="sms-service-input"
              placeholder="sms-title"
            />
            <textarea
              cols="75"
              className="big_textarea"
              value={sms.description}
              rows="10"
              onChange={(e) => props.setDescription(e.target.value)}
              placeholder="description"
            ></textarea>
            <textarea
              cols="30"
              className="small_textarea"
              value={sms.description}
              rows="6"
              onChange={(e) => props.setDescription(e.target.value)}
              placeholder="description"
            ></textarea>  
            <label>
              {sms.base64 !== "" ? (
                <img width={400} src={sms.base64} alt="image" />
              ) : sms.video !== "" ? (
                <video src={sms.video} width={400}></video>
              ) : (
                <div className="sms-video-photo-select">
                  <i class="bi bi-play-circle custom_icon"></i>
                  <i class="bi bi-camera custom_icon"></i>
                </div>
              )}
              <input
                onChange={(e) => {
                  if (e.target.files.length) {
                    let file = e.target.files[0];
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = (res) => {
                      if (file.type.startsWith("video/")) {
                        props.setVideo(URL.createObjectURL(file));
                        props.setBase64("");
                      } else {
                        props.setVideo("");
                        props.setBase64(res.srcElement.result);
                      }
                    };
                    props.setFile(file);
                  }
                }}
                type="file"
                accept="image/*,video/*"
                hidden
              />
            </label>
            <div className="sms_custom_btn_div">
              <button
                className="sms_custom_btn"
                onClick={() => props.sendSms()}
              >
                Send SMS
              </button>
            </div>
          </div>
          <div className="sms-service-filters">
            <Filter
              filterButton={false}
              search={[
                {
                  name: "city",
                  multi: true,
                  options: generateOptionsOfCity(),
                  defaultValue: { value: "", label: "All" },
                  placeholder: "City",
                  selfEmployer: true,
                  filterApi: "/client/pagination?page={page}&limit={limit}",
                },
                {
                  name: "customerCategories",
                  multi: true,
                  options: generateOptionsOfCategory(),
                  defaultValue: { value: "", label: "All" },
                  placeholder: "Customer categories",
                  selfEmployer: true,
                  filterApi: "/client/pagination?page={page}&limit={limit}",
                },
              ]}
            />
            <h3 className="text-white text-start m-0 mt-2">Sms Will be Sent To:</h3>
            <Table
              localStoragePath="clients"
              pagination={true}
              excel={true}
              tableHeader={false}
              changeSizeMode={true}
              paginationApi={"/client/pagination?page={page}&limit={limit}"}
              dataProps={props.clients.clients}
              columnOrderMode={true}
              quickSearch={false}
              changeSizeModeOptions={["All", 5, 20, 50, 100, 200]}
              columnsProps={columns}
              fileName={"clients"}
              excelPath={"/excel?component=clients&"}
            />
          </div>
        </div>
        {!sms.smsView ? (
          <div
            className={
              "right_area_open_banner" +
              (sms.smsViewAnimation ? " show_banner" : "")
            }
          >
            <button
              className="open_sms_view"
              onClick={() => {
                props.setSmsView(true);
                setTimeout(() => {
                  props.setSmsViewAnimation(false);
                }, 500);
              }}
            >
              Open Sms View
            </button>
          </div>
        ) : (
          ""
        )}
        <div className={"right_area" + (sms.smsView ? " show_area" : "")}>
          <div className={"right_area_content"}>
            <button
              className="right_area_exit"
              onClick={() => {
                props.setSmsView(false);
                setTimeout(() => {
                  props.setSmsViewAnimation(true);
                }, 200);
              }}
            >
              <i class="bi bi-x-circle"></i>
            </button>
            <div className="right_title">Sms View</div>
            <div className="sms_content">
              {sms.loading ? (
                <div className="sms_loading">
                  <Spin size={"large"} className={"p-4"}/>
                </div>
              ) : (
                <>
                  <img className="sms_content_image" src={image} alt="Image" />
                  <div className="sms">
                    {sms.base64 !== "" ? (
                      <img width={250} alt="" src={sms.base64} />
                    ) : sms.video !== "" ? (
                      <video src={sms.video} width={250}></video>
                    ) : (
                      ""
                    )}
                    <p className="sms-send-title">{sms.title}</p>
                    <br />
                    <p>{sms.description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => state, SmsActions)(SMSService);

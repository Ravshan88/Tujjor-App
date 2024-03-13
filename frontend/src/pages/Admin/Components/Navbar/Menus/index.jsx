import React, { useContext, useEffect, useState } from "react";
import { icons } from "../../../../../Config/icons";
import LanguageContext from "../../../../../Languages/Contex/Language";
import langData from "../../../../../Languages/Language.json";
import { useNavigate } from "react-router-dom";
function Index(props) {
  const pages = [
    { path: "/admin/settings", texts: ["settings"] },
    { path: "/admin/agents", texts: ["agent"] },
    {
      path: "/admin/settings/company-profile",
      texts: ["company", "profile", "company profile"],
    },
    {
      path: "/admin/settings/customer-category",
      texts: ["customer", "customer-category", "customer category"],
    },
    { path: "/admin/settings/product", texts: ["product", "mahsulot"] },
    {
      path: "/admin/settings/territory",
      texts: ["teritory", "hudud", "teritoriya"],
    },
    { path: "/admin/settings/dealers", texts: ["diller", "dealer"] },
    { path: "/admin/settings/icons", texts: ["icon"] },
    {
      path: "/admin/settings/currier",
      texts: ["kurier", "kuriyer", "currier", "curieer"],
    },
    {
      path: "/admin/settings/product-category",
      texts: ["product category", "mahsulot kategoriyasi"],
    },
    { path: "/admin/clients", texts: ["mijoz", "klient", "client","clients"] },
    {
      path: "/admin/clients_on_the_map",
      texts: [
        "mijozlar xaritada",
        "xarita",
        "client on the map",
        "clients map",
        "client map",
      ],
    },
  ];
  const [search, setSearch] = useState("");
  const [filteredPages, setFilteredPages] = useState([]);
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  useEffect(() => {
    if (search === "") {
      setTimeout(() => {
        setSearching(false);
      }, 500);
      setFilteredPages([]);
    } else {
      setTimeout(() => {
        setSearching(true);
      }, 500);
      showFilteredContent();
    }
  }, [search]);
  const { langIndex } = useContext(LanguageContext);

  const showFilteredContent = () => {
    let copy = [];
    pages.map((item) => {
      let found = false;
      item.texts.map((text) => {
        if (text.includes(search)) {
          found = true;
        }
      });
      if (found) {
        copy.push({
          path: item.path,
          text: item.path
            .substring(item.path.lastIndexOf("/") + 1)
            .replaceAll("-", " ")
            .replaceAll("_", " "),
        });
      }
    });
    setFilteredPages(copy);
  };
 
  return (
    <>
      <div className="navbar_left_box">
        <button
          style={{ fontSize: "14px" }}
          className={"btn text-white custom_dashboard_button media_btn"}
        >
          {langData[langIndex]?.adminPage?.li1}
        </button>
        <button
          style={{ fontSize: "14px" }}
          className={"btn text-white custom_dashboard_button media_btn"}
        >
          {langData[langIndex]?.adminPage?.li2}
        </button>

        <button
          style={{ fontSize: "10px" }}
          className="custom_btn_success text-white p-2 media_btn"
        >
          {icons.onlineHelpIcon}
          {langData[langIndex]?.adminPage?.onlineHelp}
        </button>
        <div className="main_search">
          <input
            placeholder="Поиск..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            className="main_search_input"
          />
          <div
            className={
              search !== "" ? "main_search_body_active" : "main_search_body"
            }
          >
            {searching ? (
              <div className="main_search_content">
                <ul className="main_search_ul">
                  {filteredPages.length === 0 ? (
                    <li>No Routes Found!</li>
                  ) : (
                    filteredPages.map((item, index) => (
                      <li
                        onClick={() => {
                          navigate(item.path);
                          setSearching(false);
                          setSearch("");
                        }}
                      >
                        {index + 1}.{item.text}
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;

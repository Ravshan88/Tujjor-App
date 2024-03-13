import "./App.css";
import Login from "./pages/Login/Login";
import {Route, Routes, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Admin from "./pages/Admin/Admin";
import axios from "axios";
import Territory from "pages/Settings/ChildComponents/Teritory/Territory";
import {ToastContainer} from "react-toastify";
import Settings from "pages/Settings/Settings";
import {domen} from "Config/apiCall";
import {tableActions} from "pages/universal/Table/Redux/Reducers/tableReducer";
import Company from "pages/Settings/ChildComponents/Company/Company";
import CustomerCategory from "pages/Settings/ChildComponents/CustomerCategory/CustomerCategory";
import Clients from "pages/Clients/clients";
import ClientsOnTheMap from "pages/Clients/Components/ClientOnTheMap/clientsOnTheMap";
import NotFound from "pages/404/NotFound";
import {useDispatch} from "react-redux";
import LanguageContext from "./Languages/Contex/Language";
import Agents from "pages/Agents/Agents"
import AddClient from "./pages/Telegram/AddClient";
import ClientsOnTheMapTelegram from "./pages/Telegram/ClientsOnTheMapTelegram";
import TelegramClients from "./pages/Telegram/TelegramClients/TelegramClients";
import Currier from "./pages/Settings/ChildComponents/Currier/currier";
import Dealer from "./pages/Settings/ChildComponents/Dealers/Dealer";
import Icon from "pages/Settings/ChildComponents/Icons/Icon";
import ProductCategory from "pages/Settings/ChildComponents/ProductCategory/ProductCategory";
import TelegramProduct from "./pages/Telegram/Product";
import AddProduct from "./pages/Telegram/Product/AddProduct";
import AboutProduct from "./pages/Telegram/Product/AboutProduct";
import Order from "./pages/Telegram/Order";
import SelectedProduct from "pages/Telegram/Order/SelectedProduct";
import Basket from "pages/Telegram/Order/Basket";
import Main from "pages/Telegram/Catalog/Main/Main";
import Product from "pages/Settings/ChildComponents/Product/Product";
import CatalogPage from "pages/Telegram/Catalog/CatalogPage/CatalogPage";
import ProductAbout from "pages/Telegram/Catalog/ProductAbout/ProductAbout";
import AddProductToCategory from "pages/Telegram/Catalog/AddProduct/AddProductToCategory";
import SMSService from "pages/SMSService/SMSService";
import Checking from "pages/Telegram/Order/Checking";
import Failure from "pages/Telegram/Order/Failure";
import Success from "pages/Telegram/Order/Success";
import TelegramOrder from "pages/Telegram/TelegramOrder/TelegramOrder";
import ProductInformation from "pages/Telegram/TelegramOrder/Components/ProductInformation";


function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [langIndex, setLangIndex] = useState(0)
    const permissions = [
        {url: "/admin", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/settings", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/settings/company-profile", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/teritory", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/clients", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/clients_on_the_map", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
        {url: "/admin/settings/customer-category", roles: ["ROLE_SUPER_VISOR", "ROLE_AGENT"]},
    ];

    function hasPermissions() {
        let count = 0;
        permissions.map((item, index) => {
            if (item.url === location.pathname) {
                count = count + 1;
            }
        });
        if (count === 1) {
            if (localStorage.getItem("access_token") !== null) {
                axios({
                    url: domen + "/users/me",
                    method: "GET",
                    headers: {
                        token: localStorage.getItem("access_token"),
                    },
                })
                    .then((res) => {
                        let s = false;
                        permissions.map((item) => {
                            if (item.url === location.pathname) {
                                res.data.authorities.map((i1) => {
                                    if (item.roles.includes(i1.roleName)) {
                                        s = true;
                                    }
                                });
                            }
                        });
                        if (!s) {
                            navigate("/404");
                        }
                    })
                    .catch((err) => {
                        if (localStorage.getItem("no_token") === "sorry") {
                            navigate("/login");
                            localStorage.clear();
                            for (let i = 0; i < 1; i++) {
                                window.location.reload();
                            }
                        }
                        if (err.response.status === 401) {
                            axios({
                                url:
                                    domen +
                                    "/auth/refresh?refreshToken=" +
                                    localStorage.getItem("refresh_token"),
                                method: "POST",
                            })
                                .then((res) => {
                                    localStorage.setItem("access_token", res.data);
                                    window.location.reload();
                                })
                                .catch((err) => {
                                    navigate("/login");
                                    localStorage.clear();
                                });
                        }
                    });
            } else {
                navigate("/404");
            }
        }
    }

    function navigateByButtonId() {
        switch (localStorage.getItem("sidebar_button")) {
            case "1":
                navigate("/admin")
                break
            case "2":
                navigate("/admin")
                break
            case "3":
                navigate("/admin")
                break
            case "4":
                navigate("/admin")
                break
            case "5":
                navigate("/admin/clients")
                break
            case "map":
                // navigate("/admin/clients_on_the_map")
                break
            case "6":
                navigate("/admin/agents")
                break
            case "7":
                navigate("/admin")
                break
            case "8":
                navigate("/admin/settings/company-profile")
                break
        }
    }

    function checkLanguageIndex() {
        const indexLang = localStorage.getItem("langIndex");
        if (indexLang === null || indexLang < 0 || indexLang > 2) {
            return;
        }
        setLangIndex(JSON.parse(localStorage.getItem("langIndex")))
    }

    function changeLanguageIndex(index) {
        setLangIndex(index);
        localStorage.setItem("langIndex", index);
    }

    // nima uchun bu kerak edi. Men(Timur) udalit qilmadim, mojet if da xato ketgandir, agar zarur bo'lsa o'zgartirarsilar, lekin bu if bilan remember me ishlamayapdi
    // useEffect(() => {
    //     if (!(location.pathname.startsWith("/telegram") && location.pathname.includes("client"))) {
    //         let token = location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
    //         alert(token)
    //         localStorage.setItem("access_token", token);
    //         localStorage.setItem("no_token", "sorry")
    //     } else {
    //         hasPermissions();
    //         navigateByButtonId()
    //         checkLanguageIndex()
    //     }
    // }, []);

    const dispatch = useDispatch();

    useEffect(() => {

        if (location.pathname) {
            dispatch(tableActions.resetFormInputs());
        }
    }, [location.pathname]);

    return (
        <div className="App">
            <LanguageContext.Provider value={{langIndex, setLangIndex, changeLanguageIndex}}>
                <ToastContainer/>
                <Routes>
                    <Route path="/" element={<Login/>}></Route>
                    <Route path={"/login"} element={<Login/>}/>
                    <Route path={"/telegram/clients-on-the-map/:token"} element={<ClientsOnTheMapTelegram/>}/>
                    <Route path="/admin" element={<Admin/>}>
                        <Route path="/admin/sms" element={<SMSService />}/>

                        <Route path="/admin/settings" element={<Settings/>}>
                            <Route
                                path="/admin/settings/company-profile"
                                element={<Company/>}
                            />
                            <Route
                                path="/admin/settings/customer-category"
                                element={<CustomerCategory/>}
                            />
                            <Route
                                path="/admin/settings/icons"
                                element={<Icon/>}
                            />
                            <Route
                                path="/admin/settings/product"
                                element={<Product/>}
                            />
                            <Route path="/admin/settings/territory" element={<Territory/>}/>
                            <Route
                                path="/admin/settings/currier" element={<Currier/>}/>
                            <Route path="/admin/settings/dealers" element={<Dealer/>}/>
                            <Route path="/admin/settings/product-categories" element={<ProductCategory/>}/>
                        </Route>
                        <Route path="/admin/clients" element={<Clients/>}></Route>
                        <Route
                            path="/admin/clients_on_the_map"
                            element={<ClientsOnTheMap/>}
                        ></Route>
                        <Route path="/admin/agents" element={<Agents/>}></Route>
                    </Route>
                    <Route path={"telegram/add-client/:token"} element={<AddClient/>}/>
                    <Route path={"telegram/clients/:token"} element={<TelegramClients/>}/>
                    <Route path={"telegram/product/:token"} element={<TelegramProduct/>}/>
                    <Route path={"telegram/product-info/:id"} element={<AboutProduct/>}/>
                    <Route path={"telegram/product-add/:id"} element={<AddProduct/>}/>
                    <Route path={"telegram/product-add"} element={<AddProduct/>}/>
                    <Route path={"telegram/order/:clientId"} element={<Order/>}/>
                    <Route path={"telegram/order/selectedProduct/:id"} element={<SelectedProduct/>}/>
                    <Route path={"telegram/order/basket/:clientId"} element={<Basket/>}/>
                    <Route path={"telegram/order/checking/:clientId"} element={<Checking/>}/>
                    <Route path={"telegram/order/failure/:clientId"} element={<Failure/>}/>
                    <Route path={"telegram/order/success/:clientId"} element={<Success/>}/>
                    <Route path={"telegram/catalog/:token"} element={<Main/>}/>
                    <Route path={"telegram/catalog/about/:id"} element={<CatalogPage/>}/>
                    <Route path={"telegram/catalog/add-product/:catalogId"} element={<AddProductToCategory/>}/>
                    <Route path={"telegram/catalog/product/:id"} element={<ProductAbout/>}/>
                    <Route path={"telegram/orders/:token"} element={<TelegramOrder/>}/>
                    <Route path={"telegram/orders/:token/product"} element={<ProductInformation/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </LanguageContext.Provider>
        </div>
    );
}

export default App;

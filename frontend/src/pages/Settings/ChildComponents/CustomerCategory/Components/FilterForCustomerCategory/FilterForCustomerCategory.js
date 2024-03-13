import React, {useState} from 'react';
import Filter from "../../../../../universal/Filter/Filter";
import "../../CustomerCategory.css"

function FilterForCustomerCategory(props) {
    const [optionsActive] = useState([
        {value: "", label: "All"},
        {value: "true", label: "Active"},
        {value: "false", label: "Inactive"},
    ]);
    return (
        <Filter
            search={[
                {
                    name: "active",
                    multi: false,
                    options: optionsActive,
                    defaultValue: {value: "", label: "All"},
                    placeholder: "Active",
                    selfEmployer: true,
                    filterApi: "/customer-category/pagination?page={page}&limit={limit}"
                },
            ]}
        />
    );
}

export default FilterForCustomerCategory;
import React, {useEffect, useState} from "react";
import {dropdownActions} from "pages/Admin/Redux/Reducers/dropdownReducer";
import "./Dropdown.css";
import {connect} from "react-redux";

const Dropdown = (props) => {
  const { dropdownId, multiSelect } = props;
  const [animation, setAnimation] = useState(false);
  const [isAnyDropdownOpen, setIsAnyDropdownOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [hasOpened, setHasOpened] = useState(false); // New state variable

  useEffect(() => {
    if (!props[dropdownId]) {
      props.claimData({ dropdownId, body: props.body });
    }
  }, [props.body, dropdownId]);

  useEffect(() => {
    return ()=>{
      props.setCurrentItem({ dropdownId, currentItem: -1 });
    }
  }, []);

  useEffect(() => {
    // Initialize selected items for multi-select only on the first open
    if (multiSelect && isAnyDropdownOpen && !hasOpened) {
      setSelectedItems(
        props.body
          .filter((item) => item.show === true)
          .map((item) => item.title)
      );
      setHasOpened(true); // Set hasOpened to true after initializing selected items
    }
  }, [multiSelect, isAnyDropdownOpen, props.body, hasOpened]);

  const dropdownState = props[dropdownId] || {};

  const handleLayerClick = () => {
    setAnimation(false);
    setTimeout(() => {
      props.setLayer({ dropdownId, layer: !dropdownState.layer });
      setIsAnyDropdownOpen(false);
    }, 200);
  };

  const handleButtonClick = () => {
    setAnimation(!dropdownState.layer);
    props.setLayer({ dropdownId, layer: !dropdownState.layer });
    setIsAnyDropdownOpen(!dropdownState.layer && multiSelect);
  };


  const handleItemClick = (item, index) => {
    const isSelected = selectedItems.includes(item);

    if (multiSelect) {
      // If multiSelect is enabled, update selectedItems
      const updatedItems = isSelected
        ? selectedItems.filter((el) => el !== item)
        : [...selectedItems, item];

      setSelectedItems(updatedItems);
      props.setSelectedItems({
        dropdownId,
        selectedItems: updatedItems,
      });
      props.onItemClick(updatedItems);
    } else {
      // If multiSelect is disabled, update currentItem
      props.setCurrentItem({ dropdownId, currentItem: index });

      setAnimation(false);
      setTimeout(() => {
        props.setLayer({ dropdownId, layer: false });
        setIsAnyDropdownOpen(false);
      }, 200);

      // Close all other page_size_body in other dropdowns when multiSelect is not allowed
      Object.keys(props).forEach((key) => {
        if (props[key]?.layer && key !== dropdownId) {
          props.setLayer({ dropdownId: key, layer: false });
        }
      });
      props.onItemClick(item);
    }
  };

  return (
    <>
      <div
        onClick={handleLayerClick}
        className={
          "custom_layer " +
          ((animation ? "active_custom_layer_animation" : "") +
            (dropdownState.layer ? " active_custom_layer" : ""))
        }
      ></div>
      <div className="custom_btn_box">
        <button
          style={{ zIndex: 3, position: dropdownState.layer ? "relative" : "" }}
          className="custom_btn"
          onClick={handleButtonClick}
        >
          {props.countMode?selectedItems.length===0?props.customTitle:"By " +(selectedItems.length===props.allCountSize?"All":selectedItems.length)+" "+props.countModeTitle:props.customTitle.startsWith("By") && dropdownState.currentItem !== -1 &&
          props.body.length > dropdownState.currentItem
              ? "By " + props.body[dropdownState.currentItem].title
              : props.customTitle}
        </button>
        <div
          className={
            "page_size_body" +
            (dropdownState.layer ? " active_page_size_body" : "")
          }
        >
          {props.body.map((item, index) => (
            <div
              key={index}
              className={
                "page_size_body_item" +
                (index === dropdownState.currentItem
                  ? " active_page_size_item"
                  : " single_item") +
                (multiSelect && selectedItems.includes(item.title)
                  ? " multi_selected"
                  : " multi_select_item")
              }
              onClick={() => {
                handleItemClick(item.title, index);
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return state.dropdown;
};

export default connect(mapStateToProps, dropdownActions)(Dropdown);

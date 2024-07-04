import React, { useEffect, useState } from "react";
import "./style.css";

const Todo = () => {
  // Function to get data from local storage
  const getLocalData = () => {
    const lists = localStorage.getItem("myToDoList");
    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  // State for input data
  const [inputData, setInputData] = useState("");
  // State for list items, initialized with data from local storage
  const [items, setItems] = useState(getLocalData());
  // State to store the id of the item being edited
  const [editedItem, setEditedItem] = useState("");
  // State to toggle between add and edit button
  const [toggleButton, setToggleButton] = useState(false);

  // Function to add a new item or update an existing one
  const addItem = () => {
    if (!inputData) {
      alert("Input is Empty!");
    } else if (inputData && toggleButton) {
      // Update existing item
      setItems(
        items.map((currElem) => {
          if (currElem.id == editedItem) {
            return { ...currElem, name: inputData };
          }
          return currElem;
        })
      );
      setInputData([]);
      setEditedItem(null);
      setToggleButton(false);
    } else {
      // Add new item
      const myInputList = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myInputList]);
      setInputData("");
    }
  };

  // Function to set the item for editing
  const editItem = (id) => {
    const item_todo_edited = items.find((currElem) => currElem.id == id);

    setInputData(item_todo_edited.name);
    setEditedItem(id);
    setToggleButton(true);
  };

  // Function to delete an item
  const deleteItem = (id) => {
    const updatedItem = items.filter((currElem) => currElem.id !== id);
    setItems(updatedItem);
  };

  // Function to remove all items
  const removeAll = () => {
    setItems([]);
  };

  // Save items to local storage whenever the items state changes
  useEffect(() => {
    localStorage.setItem("myToDoList", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Items ..."
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i className="fa fa-pen-to-square add-btn" onClick={addItem}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItem}></i>
            )}
          </div>
          <div className="showItems">
            {items.map((currElem) => (
              <div className="eachItem" key="currElem.id">
                <h1>{currElem.name}</h1>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    onClick={() => editItem(currElem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    onClick={() => deleteItem(currElem.id)}
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;

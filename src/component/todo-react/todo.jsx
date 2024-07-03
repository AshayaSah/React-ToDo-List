import React, { useEffect, useState } from "react";
import "./style.css";

const Todo = () => {
  const getLocalData = () => {
    const lists = localStorage.getItem("myToDoList");

    if (lists) {
      return JSON.parse(lists);
    } else {
      return [];
    }
  };

  const [inputData, setInputData] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editedItem, setEditedItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert("Input is Empty!");
    } else if (inputData && toggleButton) {
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
      const myInputList = {
        id: new Date().getTime().toString(),
        name: inputData,
      };

      setItems([...items, myInputList]);
      setInputData("");
    }
  };

  const editItem = (id) => {
    const item_todo_edited = items.find((currElem) => {
      return currElem.id == id;
    });

    setInputData(item_todo_edited.name);
    setEditedItem(id);
    setToggleButton(true);
  };

  const deleteItem = (id) => {
    const updatedItem = items.filter((currElem) => {
      return currElem.id !== id;
    });
    setItems(updatedItem);
  };

  const removeAll = () => {
    setItems([]);
  };

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
            {items.map((currElem) => {
              return (
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
              );
            })}
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

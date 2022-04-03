import React, { useState } from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState('');

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios
      .post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(e => {
        alert('Помилка при додаванні завдання!');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Нове завдання</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Текст завдання"
            onChange={e => setInputValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? 'Додавання...' : 'Додати завдання'}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Відміна
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;

import React from 'react';
import Todo from './Todo.jsx';
import AddTodo from './AddTodo.jsx';

class TodosList extends React.Component {
    render() {
        return (
            <ul className="actual-list">
                {this.props.data.map(
                    todo => (
                        <Todo
                            key={`task-${todo.id}`}
                            done={todo.done}
                            title={todo.title}
                            id={todo.id}
                            editMode={todo.editMode}
                            toggleEditMode={this.props.toggleEditMode}
                            moveCaretAtEnd={this.props.moveCaretAtEnd}
                            updateTodo={this.props.updateList}
                            deleteTask={this.props.deleteTask}
                        />
                    )
                )}
            </ul>
        );
    }
};

export default class Todos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showCompleted: false, data: []};
    }
    moveCaretAtEnd(e) {
        let tempValue = e.target.value;
        e.target.value = '';
        e.target.value = tempValue;
    }
    createNewTask = (e) => {
        if ((e.which === 13 || !e.which) && e.target.value) {
            let newTask = {
                title: e.target.value,
                id: this.props.createID(this.state.data),
                done: false,
                editMode: false
            };
            this.setState({
                data: this.state.data.concat([newTask])
            });
            e.target.value = '';
        }
    }
    deleteTask = (id) => {
        return (e) => {
            if (this.state.data.filter(item => item.id === id).length) {
                this.setState(prevState => ({
                    data: prevState.data.filter(el => el.id !== id)
                }));
            }
        }
    }
    toggleEditMode = (id) => {
        return () => {
            let newList = [].concat(this.state.data); // new copy of the todos list
            let target = newList.find(item => item.id === id); // identify the targeted todo in the copied list
    
            // toggle the target's edit mode status
            target.editMode = !target.editMode;
    
            // turn off all other todo's editMode
            newList.forEach(item => {
                if (item.id !== id) {
                    item.editMode = false;
                }
            });
    
            this.setState(newList);
        }
    }
    toggleCompletedList = () => {
        this.setState({showCompleted: !this.state.showCompleted});
    }
    updateList = (id) => {
        return (e) => {
            let target = this.state.data.filter(item => item.id === id)[0]; // new copy of the item being updated
            let index = this.state.data.findIndex(item => item.id === id);
            
            // mutations are allowed on newly created item
            target[e.target.name] = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            // injecting the updated item to the new state
            this.setState([
                ...this.state.data.slice(0, index),
                target,
                ...this.state.data.slice(index + 1)
            ]);
        }
    }
    render() {
        const { showCompleted } = this.state;
        const { data } = this.state;
        const buttonIsDisabled = !showCompleted && (data.filter(item => item.done === true).length? false: true);

        return (
            <div className="todos-container">
                <AddTodo createNewTask={this.createNewTask}/>
                <TodosList
                    data={data.filter(item => item.done == false)}
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                    />
                {showCompleted && <hr/> &&
                <TodosList
                    data={data.filter(item => item.done == true)}
                    className="completed-list"
                    updateList={this.updateList}
                    toggleEditMode={this.toggleEditMode}
                    moveCaretAtEnd={this.moveCaretAtEnd}
                    deleteTask={this.deleteTask}
                />}
                <button className="toggle-completed" disabled={buttonIsDisabled} onClick={this.toggleCompletedList}>
                    {showCompleted? 'Hide' : 'Show'} completed todos
                </button>
            </div>
        );
    }
};
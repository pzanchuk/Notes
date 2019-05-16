import React, { Component } from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { FaTrashAlt } from 'react-icons/fa'
import { FaSave } from 'react-icons/fa'

class Note extends Component {
    constructor(props){
        super(props)
        this.state = {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.delete = this.delete.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this)
        this.renderNote = this.renderNote.bind(this)
    }

    edit() {
       this.setState({editing: true})
    }
      

    delete() {
        alert("deleted")
    }

    save(event) {
       event.preventDefault()
       this.props.onChange(this._newText.value, this.props.index)
       this.setState({editing: false})

    }

    renderForm(){
        return(
            <div className="note">
                <form onSubmit={this.save}>
                    <textarea ref={textarea => this._newText = textarea}/>
                    <button id="save"><FaSave /></button>
                </form>
            </div>
        )
    }



    renderNote() { 
        console.log(this.props)
        return ( 
            <div className="note">
                <p>{this.props.children}</p>
                <span>
                    <button onClick={this.edit} id="edit"><FaPencilAlt /></button>
                    <button onClick={this.delete} id="remove"><FaTrashAlt /></button>
                </span>
            </div>    
         );
    }

    render(){
        return this.state.editing ? this.renderForm() : this.renderNote()
    }
}
 
export default Note;
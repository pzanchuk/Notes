import React, { Component } from 'react'
import Note from './Note'
import { FaPlus } from 'react-icons/fa'
import { thisExpression } from '@babel/types';

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: []
    }
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
    this.add = this.add.bind(this)
    this.nextId = this.nextId.bind(this)
  }

  componentWillMount() {
    var self = this
    if(this.props.count){
      fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
        .then(response => response.json())
        .then(json => json[0]
          .split('. ')
          .forEach(sentence => self.add(sentence.substring(0, 25))))
    }
  }

  eachNote(note, i){
    return <Note key={i} index={i}
              onChange={this.update}
              onDelete = {this.delete}>
              {note.note}
           </Note>
  }

  update(newText, i){
    console.log('updating item at index', i, newText)
    this.setState(prevState =>({
      notes: prevState.notes.map(
        note => (note.id !==i) ? note : {...note, note: newText}
      )
    }))
  }

  delete(id){
    console.log('removing item at', id)
    this.setState(prevState =>({
      notes: prevState.notes.filter(note => note.id !== id)
    }))
  }

  add(text) {
    this.setState(prevState => ({
      notes: [
        ...prevState.notes,
        {
          id: this.nextId(),
          note: text
        }
      ]
    }))
  }

  nextId() {
    this.uniqId = this.uniqId || 0
    return this. uniqId++
  }
  
  render() { 
    return ( 
      <div className="board">
        {this.state.notes.map(this.eachNote)}
        <button
          onClick={this.add.bind(null, "New Note")}
          id="add">
            <FaPlus />  
        </button>
      </div>
    );
  }
}
 
export default Board;
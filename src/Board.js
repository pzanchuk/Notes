import React, { Component } from 'react'
import Note from './Note'

class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      notes: [
        {id: 0, note: 'Call Buzz'},
        {id: 1, note: 'Do something'}
      ]
    }
    this.eachNote = this.eachNote.bind(this)
    this.update = this.update.bind(this)
  }

  eachNote(note, i){
    return <Note key={i} index={i} onChange={this.update}>
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
  
  render() { 
    return ( 
      <div className="board">
        {this.state.notes.map(this.eachNote)}
      </div>
    );
  }
}
 
export default Board;
import React from 'react';

class QuizComponent extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.uid = props.uid; // user id
    this.course = props.course; // course name
    this.xmods = props.xmods; // the number of modules in the course
  }

  render()
  {
    return <div>
      <h1>{this.course}</h1>
      <hr/>
      <h2>{this.state.name}</h2>
      <p>{this.state.content}</p>
      {
        (this.state.mod < this.xmods - 1)
        ? <input type="button" value="Submit" onClick={this.handleAdvanceClick}/>
        : null
      }
    </div>;
  }
}

export default QuizComponent;
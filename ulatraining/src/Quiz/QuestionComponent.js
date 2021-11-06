import React from 'react';

function generateQuestion(d, n, qd) {
  if (d.type === "mco" || d.type === "mcm") {
    return <MultipleChoiceQuestionComponent data = {d} num = {n} questionData = {qd} />;
  } else if (d.type == "sa"){
    return <ShortAnswerQuestionComponent data = {d} num = {n} questionData = {qd}
    />;
  }
  else {
    return <QuestionComponent data = {d}/>;
  }
}

class QuestionComponent extends React.Component
{
  constructor(props)
  {
    super(props);
    this.data = props.data;
    this.num = props.num;
    this.questionData = props.questionData;
    this.state = {
      answer: null
    };
  }

  render()
  {
    return <div>
      <p> {this.data.text} </p>
    </div>;
  }
}

class MultipleChoiceQuestionComponent extends QuestionComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let choice = event.target.value;
    this.setState({answer: choice});
    if (this.data.type ==="mco") {
      this.questionData[this.num] = new Set([choice]);
    } else {
      if (this.questionData[this.num].has(choice)) {
        this.questionData[this.num].delete(choice);
      } else {
        this.questionData[this.num].add(choice);

      }
    }
  }

  render() {
    let groupid = "q" + this.num;
    let type = this.data.type==="mco" ? "radio" : "checkbox";
    let answers = this.data.answers;
    let answersRender = [];
    for (let i = 0; i < this.data.choice_num; i++) {
      answersRender.push(<div class = "choice" key={groupid + String.fromCharCode(i+65)}>
        <input type={type} name = {groupid} value = {String.fromCharCode(i + 65)} onChange = {this.handleChange}/>
        <label for={String.fromCharCode(i + 65)}>{answers[i]}</label>
      </div>)
    }
    return <div class = "question mc" key={groupid}>
      <h3>{this.num + 1}. {this.data.text}</h3>
      <fieldset id={groupid}>
        {answersRender}
      </fieldset>
    </div>
  }
}

class ShortAnswerQuestionComponent extends QuestionComponent {
  constructor(props) {
    super(props);
    this.state['spaceLeft']= this.data.maxCharacters;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({spaceLeft: this.data.maxCharacters - event.target.value.length});
  }

  render() {
    let groupid = "q" + this.num;
    let length = this.data.maxCharacters;
    let rows = Math.trunc(length / 100 - 1) + 1;
    let cols = 100;
    return <div class = "question mc">
      <h3>{this.num + 1}. {this.data.text}</h3>
      <textarea type="text" class = {groupid} rows = {rows} cols = {cols} maxLength = {length} onChange = {this.handleChange}>
      </textarea>
      <br/><span class = "remaining-chars">Characters Remaining: {this.state.spaceLeft} </span>
    </div>
  }
}

export default generateQuestion;
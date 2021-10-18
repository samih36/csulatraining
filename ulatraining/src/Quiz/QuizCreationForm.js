import React from 'react';

import generateQuestion from "./QuestionComponent.js"
import quizData from "./QuizTemplate.json"

class QuizCreationForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.uid = props.uid; // user id
    this.course = props.course; // course name
    this.quizid = props.quizid;
    this.state = {
      mod: props.mod, // the zero-based index of the module
      name: "",
      content: "",
      questions: [],
      questionData: [],
      submitted: false
        }   
    }   
    render() {
        return <p>f</p>;
    }
}

export default QuizCreationForm
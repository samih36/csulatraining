import { alertTitleClasses, touchRippleClasses } from '@mui/material';
import React from 'react';

import { useAuth } from "../contexts/AuthContext";
import generateQuestion from './QuestionComponent';


class QuizCreationForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.uid = props.uid; // user id
    this.courseid = props.courseid; // course name
    this.quizid = props.quizid;
    this.state = {
      mod: props.mod, // the zero-based index of the module
      renderedQuestions: [],
      newQuestionType : "mco",
      questions: [],
      values: {
        "id": "1",
        "questionNum": 0,
        "courseNum": "1",
        "quizName": "",
        "moduleNum": "0",
        "passPercentage": 0.6,
        "introduction": "",
        "shuffleChoices": false,
        "showFeedback": true,
        "questions": []
      }
        }   

        this.submitForm = this.submitForm.bind(this);
        this.formChange = this.formChange.bind(this);
        this.newQuestion = this.newQuestion.bind(this);
    }   

    save() {
        alert('hello');
        let modulesdb = this.database.ref("courses/" + this.courseid + '/modules');
        let quizNode = modulesdb.child(this.quizid);
        quizNode.update(this.state.values);
    }

    formChange(event) {
        let valuescp = Object.assign({},this.state.values);
        valuescp[event.target.id] = event.target.value;
        this.setState({values: valuescp});
    }

    submitForm(event) {
        event.preventDefault();
        this.save();
    }

    changeValue(valueName, value) {
        let valuescp = Object.assign({},this.state.values);
        valuescp[valueName] = value;
        console.log(valuescp, "cp");
        this.setState({values: valuescp});
    }
    generateQuestionContents(questionObj) {
        console.log(questionObj);
        return <p>Question</p>;
    }

    saveQuestion() {

    }

    newQuestion(event) {
        let qNum = this.state.values.questionNum + 1;
        let newQuestionObj = {
            type: event.target.value,
            text: "",
            maxCharacters: 1000
        }
        if (event.target.value === "mco") {
            newQuestionObj = {
            type: "mco",
            choice_num: 4,
            text: "",
            answers: 
            [
                "", "", "", ""
            ],
            correctChoices: ["A"]
            }
        }
        let valuescp = Object.assign({},this.state.values);
        valuescp['questionNum'] = qNum;
        let a1 = [...this.state.values.questions, newQuestionObj];
        valuescp['questions'] = a1;

        console.log(this.state.values.questions);
        let question = <div id = {"question" + this.state.values.questionNum}>
            <p>{qNum})</p>
            <div className="nested-form">
                <textarea rows="2" cols="80" value={a1[qNum - 1].text} onChange={(event) =>{ 
                    this.setState(function(state, props) {
                        newQuestionObj = Object.assign({}, this.state.questions[qNum - 1]);
                        newQuestionObj.text = event.target.value;
                        return {questions: [...this.state.questions.splice(qNum - 1, 1, newQuestionObj)]};
                    });
                }}></textarea>
            </div>
        </div>;
        this.setState({questions: a1});
        this.setState({values: valuescp});
        this.setState({renderedQuestions: [...this.state.renderedQuestions, question]})
    }

    render() {
        
        return <div>
            <br/>
            <h1>Quiz Creator</h1>
            <form onSubmit={this.submitForm}>
                <label for="moduleName">{"Quiz Name: "}</label>
                <input type="text" maxLength="20" id="quizName" value={this.state.values.quizName} onChange={this.formChange}></input><br/>

                <label for="introduction">{"Introductory Message: "}</label>
                <textarea maxLength="1000" id="introduction" value={this.state.values.introduction} rows="5" cols="50" onChange={this.formChange}></textarea><br/>

                <label for="passPercentage">Minimum Score to Pass: {this.state.values.passPercentage* 100 + "%"}</label>
                <input type="range" min="0" max="1" id="passPercentage" value={this.state.values.passPercentage} step=".05" onChange={this.formChange}></input><br/>

                <div id="questions-div">
                    <h2>Questions</h2>
                    <div id="question-add">
                        <label for="new-question-type">Type: </label>
                        <select id='new-question-type' value={this.state.newQuestionType} onChange = {(e) => this.setState({newQuestionType: e.target.value})}>
                            <option value="mco">Multiple Choice</option>
                            <option value="sa">Short Answer</option>
                        </select>
                        <button type="button" onClick={this.newQuestion}>Add</button>
                    </div>

                    <div id = "questions-main"> 
                        {this.state.renderedQuestions}
                    </div>
                </div>
                <button type="submit">Create Quiz</button>
            </form>
        </div>;
    }

}

export default QuizCreationForm;
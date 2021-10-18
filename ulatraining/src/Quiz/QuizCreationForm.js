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
      
      q_open: false,
      q_choices: 4,
      q_a1: '',
      q_a2: '',
      q_a3: '',
      q_a4: '',
      q_text: '',
      q_correct_choice: 'A',

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
        this.createQuestion = this.createQuestion.bind(this);
    }   

    save() {
        alert('Quiz Created!');
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

    newAnswer(item, i) {
            console.log(i);
            return <div key={i}>
                <p>{String.fromCharCode(65 + i)})</p> <input value={this.state.q_answers[i]} onChange = {(event) => this.setState(
                    {q_answers: [...this.state.q_answers.splice(i, 1, event.target.value)]}
                )}></input>
            </div>
    }

    createQuestion(event) {
        let q_json = {
            type: "mco",
            choice_num: 4,
            text: this.state.q_text, 
            answers: [this.state.q_a1, this.state.q_a2, this.state.q_a3, this.state.q_a4],
            correctChoices: [this.state.q_correct_choice]
        }

        let valuescp = Object.assign({},this.state.values);
        valuescp['questions'].push(q_json);
        console.log(valuescp)

        let newRender= <div>
            <h2>{(this.state.renderedQuestions.length + 1)+ ') ' + q_json.text}</h2>
            <p>A) {q_json.answers[0]}</p>
            <p>B) {q_json.answers[1]}</p>
            <p>C) {q_json.answers[2]}</p>
            <p>D) {q_json.answers[3]}</p>
            <p>Correct Answer: {q_json.correctChoices[0]}</p>
        </div>

        this.setState({
            renderedQuestions: [...this.state.renderedQuestions, newRender],
            values: valuescp,
            q_open: false,
            q_text: "",
            q_a1: '',
            q_a2: '',
            q_a3: '',
            q_a4: '',
        })
    }

    newQuestion(event) {
        if (this.state.q_open) {
            alert("Save or delete current question.");
            //return;
        }

        this.setState(function() {

            return {
            q_open: true}
        })

        // this.setState(function() {
        //     let qNum = this.state.values.questionNum + 1;
        //     let newQuestionObj = {
        //         type: event.target.value,
        //         text: "",
        //         maxCharacters: 1000
        //     }
        //     if (this.state.newQuestionType === "mco") {
        //         newQuestionObj = {
        //         type: "mco",
        //         choice_num: 4,
        //         text: "",
        //         answers: 
        //         [
        //             "", "", "", ""
        //         ],
        //         correctChoices: ["A"]
        //         }
        //     }
        //     let valuescp = Object.assign({},this.state.values);
        //     valuescp['questionNum'] = qNum;
        //     let a1 = [...this.state.values.questions, newQuestionObj];
        //     valuescp['questions'] = a1;

        //     return {
        //         questions: a1,
        //         values: valuescp,
        //     }
        // }, this.renderNewQuestion)

    }

    // renderNewQuestion() {
    //     console.log(this.state.questions);
    //     this.setState(function() {
    //         let question = <div id = {"question" + this.state.values.questionNum}>
    //             <p>{this.state.values.questionNum})</p>
    //             <div className="nested-form">
    //                 <textarea rows="2" cols="80" value={this.state.questions[this.state.values.questionNum - 1].text} onChange={(event) =>{ 
    //                     this.setState(function(state, props) {
    //                         let newQuestionObj = Object.assign({}, this.state.questions[this.state.values.questionNum - 1]);
    //                         newQuestionObj.text = event.target.value;

    //                         return {
    //                             renderedQuestions: [...this.state.renderedQuestions],
    //                             questions: [...this.state.questions.splice(this.state.values.questionNum - 1, 1, newQuestionObj)]};
    //                     });
    //                 }}></textarea>
    //             </div>
    //         </div>;
    //         return {renderedQuestions: [...this.state.renderedQuestions, question]}
    //     })
    // }

    render() {
        let open_question = <div className="nested-form">
        <label for="q-itself">Question:</label>
        <textarea id="q-itself" rows="2" cols="80" value={this.state.q_text} onChange={(event) =>{ 
            this.setState({q_text: event.target.value});}}></textarea>
        <div><p>{String.fromCharCode(65 + 0)})</p> <input id ="q_a1" type="text" value={this.state.q_a1} onChange = {(e) => {this.setState({q_a1: e.target.value});}}/></div>
        <div><p>{String.fromCharCode(65 + 1)})</p> <input value={this.state.q_a2} onChange = {e => this.setState({q_a2: e.target.value})}/></div>
        <div><p>{String.fromCharCode(65 + 2)})</p> <input value={this.state.q_a3} onChange = {e => this.setState({q_a3: e.target.value})}/></div>
        <div><p>{String.fromCharCode(65 + 3)})</p> <input value={this.state.q_a4} onChange = {e => this.setState({q_a4: e.target.value})}/></div>
        <span>Correct choice: </span>
        <select id='correct-choice' value={this.state.q_correct_choice} onChange = {(e) => this.setState({q_correct_choice: e.target.value})}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select><br/>
        <button type="button" onClick={this.createQuestion}>Create Question!</button>


    </div>;

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
                    <div id = {"question"}>
                    {this.state.renderedQuestions}
                    {this.state.q_open ? open_question : null}
                    </div>
                    </div>
                </div>
                <button type="submit">Create Quiz</button>
            </form>
        </div>;
    }

}

export default QuizCreationForm;
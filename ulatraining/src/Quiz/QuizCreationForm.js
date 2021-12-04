import { alertTitleClasses, touchRippleClasses } from '@mui/material';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import React from 'react';
import '../Module.css'
import './QuizCreation.css'


import { useAuth } from "../contexts/AuthContext";
import generateQuestion from './QuestionComponent';


class QuizCreationForm extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;
    this.uid = props.uid; // user id
    this.courseid = props.match.params.cid; // course name
    this.state = {
      mod: 0,
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
        //"id": "1",
        "questionNum": 0,
        //"courseNum": "1",
        "name": "",
        "moduleNum": "0",
        "passPercentage": 0.6,
        "introduction": "",
        "shuffleChoices": false,
        "showFeedback": true,
        "questions": [],
        "type": "quiz"
      }
        }

        this.submitForm = this.submitForm.bind(this);
        this.formChange = this.formChange.bind(this);
        this.newQuestion = this.newQuestion.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
    }

    componentDidMount()
    {
        this.database.ref("courses").child(this.courseid).child("modules").once('value').then(snapshot => {
            if (snapshot.exists())
            {
                this.setState({mod: Object.keys(snapshot.val()).length});
            }
        });
    }

    save() {
        alert('Quiz Created!');
        let modulesdb = this.database.ref("courses/" + this.courseid + '/modules');
        let quizNode = modulesdb.push();
        quizNode.update(this.state.values).then(response => {window.location.href=`/course/${this.courseid}`});
        
        this.database.ref('users').orderByChild('role').equalTo('student').once('value', snapshot => {
            if (snapshot.exists()) {
                const val = snapshot.val();
                for (const uid in val) {
                    if (val[uid].courses && val[uid].courses[this.courseid]) {
                        this.database.ref('users').child(uid).child('courses').child(this.courseid).child('modules').child(this.state.mod).set(0);
                    }
                }
            }
        })
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
        let q_json = {};
        let newRender = <div></div>
        if (this.state.newQuestionType === "mco") {
            q_json = {
                type: "mco",
                choice_num: 4,
                text: this.state.q_text,
                answers: [this.state.q_a1, this.state.q_a2, this.state.q_a3, this.state.q_a4],
                correctChoices: [this.state.q_correct_choice]
            }
            newRender= <div>
            <h2>{(this.state.renderedQuestions.length + 1)+ ') ' + q_json.text}</h2>
            <p>A) {q_json.answers[0]}</p>
            <p>B) {q_json.answers[1]}</p>
            <p>C) {q_json.answers[2]}</p>
            <p>D) {q_json.answers[3]}</p>
            <p>Correct Answer: {q_json.correctChoices[0]}</p>
        </div>;

        } else if (this.state.newQuestionType == "sa") {
            q_json = {
                type: "sa",
                text: this.state.q_text,
                maxCharacters: 1000,
            }
            newRender= <div>
            <h2>{(this.state.renderedQuestions.length + 1)+ ') ' + q_json.text}</h2>
            <p>Max Characters: {q_json.maxCharacters}</p>
            </div>;
        }

        let valuescp = Object.assign({},this.state.values);
        valuescp['questions'].push(q_json);
        valuescp['questionNum'] = valuescp['questionNum'] + 1;
        console.log(valuescp)

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
        console.log(this.state.newQuestionType);
        this.setState(function() {

            return {
            q_open: true}
        })

    }

    render_open_mc() {
        return <div className="nested-form">
        <label for="q-itself">Question:</label>
        <Form.Control className="w-50 m-auto" as='textarea' id="q-itself" rows="2" cols="80" value={this.state.q_text} onChange={(event) =>{
            this.setState({q_text: event.target.value});}}></Form.Control>
        <div><p>{String.fromCharCode(65 + 0)})</p> <Form.Control className="w-50 m-auto" id ="q_a1" type="text" value={this.state.q_a1} onChange = {(e) => {this.setState({q_a1: e.target.value});}}/></div>
        <div><p>{String.fromCharCode(65 + 1)})</p> <Form.Control className="w-50 m-auto" value={this.state.q_a2} onChange = {e => this.setState({q_a2: e.target.value})}></Form.Control></div>
        <div><p>{String.fromCharCode(65 + 2)})</p> <Form.Control className="w-50 m-auto" value={this.state.q_a3} onChange = {e => this.setState({q_a3: e.target.value})}></Form.Control></div>
        <div><p>{String.fromCharCode(65 + 3)})</p> <Form.Control className="w-50 m-auto" value={this.state.q_a4} onChange = {e => this.setState({q_a4: e.target.value})}></Form.Control></div>
        <span>Correct choice: </span>
        <select id='correct-choice' value={this.state.q_correct_choice} onChange = {(e) => this.setState({q_correct_choice: e.target.value})}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select><br/>
        <Button id="createQuestionButton" className="advanceButton" type="button" onClick={this.createQuestion}>Create Question!</Button>
        <Button id="cancelCreateButton" className="advanceButton" type="button" onClick={(e) => this.setState({q_open: false})}>Cancel</Button>
</div>;

    }

    render_open_sa() {
        return <div className="nested-form">
        <label for="q-itself">Question:</label>
        <Form.Control className="w-50 m-auto" as='textarea' id="q-itself" rows="2" cols="80" value={this.state.q_text} onChange={(event) =>{
            this.setState({q_text: event.target.value});}}></Form.Control>
        <Button id="createQuestionButton" className="advanceButton" type="button" onClick={this.createQuestion}>Create Question!</Button>
        <Button id="cancelCreateButton" className="advanceButton" type="button" onClick={(e) => this.setState({q_open: false})}>Cancel</Button>
        </div>;
    }

    render() {
        let open_question = this.state.newQuestionType === 'mco' ? this.render_open_mc() : this.render_open_sa();


        return <div className="quiz">
            <br/>
            <h1 className="QuizCreatorTitle">Quiz Creator</h1>
            <Form onSubmit={this.submitForm}>
                <label for="moduleName">{"Quiz Name: "}</label>
                <Form.Control className="w-25 m-auto" type="text" maxLength="50" id="name" value={this.state.values.name} onChange={this.formChange}></Form.Control><br/>

                <label for="introduction">{"Introductory Message: "}</label>
                <Form.Control as='textarea' className="w-50 m-auto" maxLength="1000" id="introduction" value={this.state.values.introduction} rows="5" cols="50" onChange={this.formChange}></Form.Control><br/>

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
                        <Button id="addButton" className="advanceButton" onClick={this.newQuestion}>Add</Button>
                    </div>

                    <div id = "questions-main">
                    <div id = {"question"}>
                    {this.state.renderedQuestions}
                    {this.state.q_open ? open_question : null}
                    </div>
                    </div>
                </div>
                <Button onClick={this.submitForm} id="createQuizButton" className="advanceButton" type="submit">Create Quiz</Button>
            </Form>
        </div>;
    }

}

export default QuizCreationForm;

import React from 'react';
import QuestionComponent from "./QuestionComponent.js";


class MCQuestionComponent extends React.Component {
    constructor(props) {
      super(props);
      this.data = props.data;
      this.updateParentQuestion = props.updateQuestion;
      this.state= {
          mode: "edit", //modes = {quiz, edit, preview}
          draggable: "true",
          selections: [],
          order: props.order,
          type: props.data.type,
          choice_num: props.data.choice_num,
          text: props.data.text,
          answers: props.data.answers,
          correctChoices: props.data.correctChoices
      }

      //change this stuff
      this.updateParentQuestion = function(s) {
        console.log(s); 
      };

      //this.handleChange = this.handleChange.bind(this);
      this.renderQuiz = this.renderQuiz.bind(this);
      this.renderEdit = this.renderEdit.bind(this);
      this.renderPreview = this.renderPreview.bind(this);
      this.updateSelections = this.updateSelections.bind(this);
    }

    updateSelections(e) {
        let letter = e.target.value;
        let newSelections = [];
        switch(this.state.type) {
            case 'mco':
                newSelections = [letter];
                break;
            case 'mcm':
                if (this.state.selections.includes(letter)) {
                    newSelections = [];
                    for (let i = 0; i < this.state.selections.length; i++) {
                        if (!(this.state.selections[i] == letter)) {
                            newSelections.push(this.state.selections[i]);
                        }
                    }
                } else {
                     newSelections = [...this.state.selections, letter];
                }
                break;
        }
        this.setState({selections: newSelections}, this.updateParentQuestion(this.state));
    }

    renderQuiz() {
        return <div className = "question question-mc">
            <span className = "question-name"><h2>{this.state.text}</h2></span>
            <div className = "question-body">
                <fieldset onChange={this.updateSelections}>
                    {this.state.answers.map((answer, i) => {
                        return <div>
                            <input type={this.state.type==="mco" ? 'radio' : 'checkbox'} name={'choice'+String.toString(i)} value={String.fromCharCode(i+65)}/>
                            <label for={'choice' + String.toString(i)}>{String.fromCharCode(i + 65) + ") " + answer}</label>
                            </div>
                })}
                </fieldset>
            </div>
        </div>;

    }

    renderEdit() {
        return <div className = "question question-mc">
            <span className= "question-name"><input type="text" value={this.state.text} onChange={(e) => this.setState({text: e.target.value}, this.updateParentQuestion(this.state))}/></span>
        </div>
    }

    renderPreview() {
        return <div>Preview</div>
    }

    render() {
        switch (this.state.mode) {
            case 'quiz':
                return this.renderQuiz();
            case 'edit':
                return this.renderEdit();
            case 'preview':
                return this.renderPreview();
        }
        return <div>Invalid Mode</div>
    }
}

export default MCQuestionComponent;
import React from 'react';
import QuizComponent from './Quiz/QuizComponent.js';
import QuizCreationForm from "./Quiz/QuizCreationForm.js";

class DevFeatureSelector extends React.Component
{
  constructor(props)
  {
    super(props);
    this.database = props.database;

    this.state = {
      selection: 0
    };

    this.options = [
      /*{
        name : "Reading Modules",
        content : <ReadingModule database={this.database} uid="dweslynch" mod={0} key="0" course="Comp XXX" xmods={3}/>
    },*/

      { name : "Course View", content : null },
      { name : "Quiz Modules", content : <QuizComponent database={this.database} uid="ayalcin" mod={0} key="0" course="QuizTestingCourse" quizid="Quiz1" xmods={3}/>},
      { name: "Quiz Creation", content: <QuizCreationForm database= {this.database} uid="ayalcin" mod={0} key="0" courseid="QuizTestingCourse"/>},
      { name : "Course Creation", content : null}
    ];

    this.advance = this.advance.bind(this);
  }

  advance(idx)
  {
    this.setState({selection: idx});
  }

  render()
  {
    let advance = this.advance;
    return <div>
      <div>
        {
          this.options.map((el, idx) =>
            <input type="button" value={el.name} onClick={() => advance(idx)}/>)
        }
      </div>
      <div>
        { this.options[this.state.selection].content }
      </div>
    </div>;
  }
}

export default DevFeatureSelector;

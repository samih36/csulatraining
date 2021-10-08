// Contains a set of buttons to switch between test features that we want to look at
// Until we get a working site this will let us see where we're at

import React from 'react';
import ReadingModule from './ReadingModule.js';

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
      {
        name : "Reading Modules",
        content : <ReadingModule database={this.database} uid="dweslynch" mod={0} key="0" course="Comp XXX" xmods={3}/>
      },

      { name : "Quiz Modules", content : null },
      { name : "Course View", content : null},
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
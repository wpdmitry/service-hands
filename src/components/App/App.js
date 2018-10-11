import React, { Component } from 'react';
import GradientPicker from 'components/GradientPicker/GradientPicker';

import './App.css';

class App extends Component {
  state = {
    gradient: null
  };

  changeGradient = gradient => this.setState({ gradient });

  render() {
    const { gradient } = this.state;

    return (
      <div className="app" style={{ background: gradient }}>
        <GradientPicker onChange={this.changeGradient} />
      </div>
    );
  }
}

export default App;

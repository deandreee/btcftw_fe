import React, { Component } from 'react';
import { Motion } from 'react-motion';
import _ from 'underscore';

export default class MotionSequence extends Component {
  constructor(props: Object) {
    super(props);

    let sequenceId = 0;

    console.log(this.props.styles[0]);
    let defaultStyle = this.props.defaultStyle;
    if (!defaultStyle) {
      defaultStyle = {};

      _.each(this.props.styles[0], (style: any, prop: string) => {
        defaultStyle[prop] = _.isObject(style) ? style.val : style;
      });

      sequenceId = 1;
    }

    this.state = {
      sequenceId,
      defaultStyle
    };
  }

  animationEnded = () => {
    setTimeout(() => {
      if (this.state.sequenceId < this.props.styles.length - 1) {
        this.setState({
          sequenceId: this.state.sequenceId + 1
        });
      }
    }, 0);
  }

  render() {
    const currentStyle = this.props.styles[this.state.sequenceId];

    return (
      <Motion
        defaultStyle={this.state.defaultStyle}
        style={currentStyle}
        onRest={this.animationEnded}
      >
        {this.props.children}
      </Motion>
    );
  }
}

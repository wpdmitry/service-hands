import React, { Component } from 'react';
import b_ from 'b_';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import { format, isValidColors, toHex, getRandomColor } from './tools';

import './GradientPicker.css';

const b = b_.with('gradient-picker');

class GradientPicker extends Component {
  state = {
    color1: '',
    color2: ''
  };

  changeColor = key => value => this.setState({ [key]: value });

  onClick = () => {
    const { color1, color2 } = this.state;
    const { onChange } = this.props;
    const gradient = format(color1, color2);
    onChange(gradient);
  };

  setRandomColors = () => {
    const { onChange } = this.props;
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    const gradient = format(color1, color2);
    this.setState({ color1, color2 }, () => onChange(gradient));
  };

  render() {
    const { color1, color2 } = this.state;

    return (
      <div className={b()}>
        <section className={b('color')}>
          <h3 className={b('label')}>Цвет №1</h3>
          <div className={b('input')}>
            <input
              className={b('color-input')}
              type="text"
              onChange={e => this.changeColor('color1')(e.target.value)}
              value={color1}
              placeholder="#ff0000"
              autoFocus
            />
            <div className={b('color-picker')}>
              <ColorPicker
                color={isValidColors(color1) ? toHex(color1) : ''}
                onChange={({ color }) => this.changeColor('color1')(color)}
                enableAlpha={false}
                placement="bottomLeft"
              />
            </div>
          </div>
        </section>

        <section className={b('color')}>
          <h3 className={b('label')}>Цвет №2</h3>
          <div className={b('input')}>
            <input
              className={b('color-input')}
              type="text"
              onChange={e => this.changeColor('color2')(e.target.value)}
              value={color2}
              placeholder="#ff0000"
            />
            <div className={b('color-picker')}>
              <ColorPicker
                color={isValidColors(color2) ? toHex(color2) : ''}
                onChange={({ color }) => this.changeColor('color2')(color)}
                enableAlpha={false}
                placement="bottomLeft"
              />
            </div>
          </div>
        </section>

        <div className={b('buttons')}>
          <input
            type="button"
            className={b('button')}
            onClick={this.onClick}
            disabled={!isValidColors(color1, color2)}
            value="Go"
          />
          <input
            type="button"
            className={b('button')}
            onClick={this.setRandomColors}
            value="Мне повезет"
          />
        </div>
      </div>
    );
  }
}

export default GradientPicker;

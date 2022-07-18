/* eslint-disable react/static-property-placement */
/**
 * @class FullpageNavigation
 */
// eslint-disable-next-line react/react-in-jsx-scope
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullpageContext from './FullpageContext';

// TODO: do navigation
// eslint-disable-next-line react/prefer-stateless-function
class FullpageNavigation extends PureComponent {
  static contextType = FullpageContext;

  static defaultProps = {
    style: {},
    itemStyle: {},
    reverse: false,
    buttonWidth: [14, 10],
    buttonHeight: [14, 10],
    margin: [3,3],
    color: ['yellow', 'white'],
    opacity: 0.6,
    borderRadius: '50%'
  };

  static propTypes = {
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    itemStyle: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.bool,
    ])),
    reverse: PropTypes.bool,
  };

  render() {
    const { style, itemStyle, reverse = false, buttonWidth, buttonHeight, color, margin, opacity, borderRadius } = this.props;
    const {
      number, slides, transitionTiming,
    } = this.context;

    const gotoSlide = (slide) => {
      const { goto } = this.context;
      goto(slide);
    };

    return (
      <div style={{
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        top: 0,
        right: 0,
        listStyleType: 'none',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        paddingRight: '1em',
        ...style,
      }}
      >
        {
          slides.map((slide, i) => (
            <div
              key={i.toString()}
            >
              <div
                style={{
                  borderRadius: borderRadius,
                  height: (number === i) ? buttonHeight[0] : buttonHeight[1],
                  width: (number === i) ? buttonWidth[0] : buttonWidth[1],
                  margin: (number === i) ? margin[0] : margin[1],
                  backgroundColor: (number === i) ? color[0] : color[1],
                  opacity: (number === i) ? 1 : opacity,
                  transition: `all ${transitionTiming * 0.5}ms ease-in-out`,
                  ...itemStyle,
                }}
                onClick={() => gotoSlide(slide)}
                onKeyPress={() => gotoSlide(slide)}
                role="button"
                tabIndex="-1"
                aria-label={`Slide ${i}`}
              >
                <span style={{
                  display: 'none',
                }}
                >
                  {`slide number ${i}`}
                </span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

export default FullpageNavigation;

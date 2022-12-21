class Typewriter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: '',
      fullTxt: '',
      loopNum: 0,
      isDeleting: false,
    };
  }

  componentDidMount() {
    this.tick();
  }

  componentDidUpdate(prevProps, prevState) {
    let delta = 200 - Math.random() * 100;

    if (this.state.isDeleting) {
      delta /= 2;
    }
    if (!this.state.isDeleting && this.state.txt === this.state.fullTxt) {
      delta = this.props.period;
    } else if (this.state.isDeleting && this.state.txt === '') {
      delta = 500;
    }

    setTimeout(() => this.tick(), delta);
  }

  tick() {
    let i = this.state.loopNum % this.props.toRotate.length;

    let setFullTxt = this.props.toRotate[i];

    let copy = { ...this.state };

    if (this.state.isDeleting) {
      copy.txt = setFullTxt.substring(0, copy.txt.length - 1);
    } else {
      copy.txt = setFullTxt.substring(0, copy.txt.length + 1);
    }

    if (!this.state.isDeleting && this.state.txt === setFullTxt) {
      copy.isDeleting = true;
    } else if (copy.isDeleting && this.state.txt === '') {
      copy.isDeleting = false;
      console.log('looping', copy.loopNum, copy.delta);
      copy.loopNum = copy.loopNum + 1;
    }

    copy.fullTxt = setFullTxt;

    console.log('copytxt', copy);

    this.setState(() => copy, console.log('delta', this.state.delta));
  }

  render() {
    return /*#__PURE__*/ React.createElement(
      'a',
      { className: 'typewrite' },
      this.state.txt /*#__PURE__*/,
      React.createElement('span', { class: 'wrap' }),
      ' '
    );
  }
}

ReactDOM.render(
  /*#__PURE__*/ React.createElement(Typewriter, {
    toRotate: [
      'Hi, what are you waiting for ?',
      'you want a cool website!',
      'i would love to build it for you',
    ],
    period: 1000,
  }),
  document.getElementById('root')
);

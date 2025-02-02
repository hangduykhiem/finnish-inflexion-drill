import React from 'react'


class UserIO extends React.Component {
    render() {
        return (
            <div className="container">
                <div /*class="card gray"*/>
                    <div className="row card-flex">
                        <div className="col-sm-12 col-xl-6 no-l-padding" id="left">
                            <FinnishWord
                                finnish_word={this.props.currentWord}
                                fontSize={computeFontSize(this.props.currentWord, 5, 40)}
                            />
                        </div>

                        <div className="col-sm-12 col-xl-6 no-r-padding" id="right">
                            <RightCard text={this.props.currentTranslation} fontSize={computeFontSize(this.props.currentTranslation, 1.5, 40)} cls='blue' image={process.env.PUBLIC_URL + "/img/translation.svg"} />
                            <RightCard text={this.props.currentFormName} fontSize={computeFontSize(this.props.currentFormName, 1.5, 40)} cls='red' image={process.env.PUBLIC_URL + "/img/target.svg"} />
                            <RightCard text={this.props.currentKotusType} fontSize={computeFontSize(this.props.currentKotusType, 1.5, 40)} cls='yellow' image={process.env.PUBLIC_URL + "/img/kotus_type.svg"} />
                            {/* https://en.wiktionary.org/wiki/Appendix:Finnish_nominal_inflection/nuoripari
                https://en.wiktionary.org/wiki/Appendix:Finnish_conjugation */}
                        </div>

                    </div>

                </div>
                <div className="row card-flex input-row">
                    <UserTextInput
                        onCorrectAnswer={this.props.onCorrectAnswer}
                        onSkipAnswer={this.props.onSkipAnswer}
                        currentWord={this.props.currentWord}
                        onHelpUse={this.props.onHelpUse}
                        currentAnswer={this.props.currentAnswer} />
                </div>
            </div>
        );
    }
}

class UserTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            textInputBG: 'black-bg',
        };
    }

    flicker = (colorCSSClass) => {
        this.setState({ textInputBG: colorCSSClass },
            () => {
                setTimeout(() => {
                    this.setState({ textInputBG: 'black-bg' })
                }, 100);

            });
    }

    handleEnterKey = () => {
        if (this.props.currentAnswer.includes(this.state.value.toLowerCase())) {
            this.props.onCorrectAnswer();
            this.flicker("green-bg");
            this.setState({ value: "" });
        } else {
            this.flicker("red-bg");
        }
    }

    handleNextLetterKey = () => {
        let newValue = "";
        for (let i = 0; i <= Math.min(this.state.value.length, this.props.currentAnswer[0].length); ++i) {
            if (i === this.props.currentAnswer[0].length) {
                newValue = this.props.currentAnswer[0];
                break;
            }
            else if (this.state.value.len < i || this.state.value[i] !== this.props.currentAnswer[0][i]) {
                newValue = this.props.currentAnswer[0].slice(0, i + 1);
                break;
            }
        }
        this.props.onHelpUse()
        this.setState({ value: newValue });
    }

    handleCorrectAnswerKey = () => {
        this.props.onHelpUse()
        this.setState({ value: this.props.currentAnswer[0] });
    }

    handleNextWordKey = () => {
        this.setState({ value: "" })
        this.props.onSkipAnswer();
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleEnterKey();
        }
    }

    handleTextChange = (event) => {
        var inputText = event.target.value
        this.setState({ value: inputText.replace(/[^A-Za-zäöÄÖšž ]/g, "") });

        if (inputText.includes("3")) {
            this.handleNextWordKey();
        } else if (inputText.includes("1")) {
            this.handleNextLetterKey();
        } else if (inputText.includes("2")) {
            this.handleCorrectAnswerKey();
        }
    }

    render() {
        return (
            <div className="word-input-flex col-12">
                <input type="text" className={"word-input " + this.state.textInputBG}
                    placeholder={"type '" + this.props.currentWord + "' in the form specified"}
                    autoCapitalize="off" autoComplete="off" spellCheck="false" autoCorrect="off"
                    onKeyDown={this.handleKeyDown}
                    onChange={this.handleTextChange}
                    ref={this.props.reference} autoFocus value={this.state.value} />
            </div>
        )
    }
}

function computeFontSize(text, defaultSize, textSpace) {
    const l = text.length;
    const coeffs = [0.885, -0.0811]
    let resizedFontSize = Math.max(Math.min(defaultSize, (textSpace / l + coeffs[1]) / coeffs[0]), defaultSize / 4);
    // console.log("Approximate width default "+(coeffs[0]*defaultSize+coeffs[1])*l+" changed to size "+resizedFontSize+"px and resulting size is "+(coeffs[0]*resizedFontSize+coeffs[1])*l)
    return resizedFontSize;
}

class FinnishWord extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, }
    }

    componentDidMount() {
        this.setState({ width: document.getElementById('left').clientWidth });
        window.addEventListener('resize', this.resize)
        this.resize()
        // console.log("width: ",document.getElementById('left').clientWidth);
    }

    resize = () => this.setState({ width: document.getElementById('left').clientWidth });

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        const style = {
            fontSize: computeFontSize(this.props.finnish_word, 80, this.state.width) + "px",
        }
        return (
            <div className="card word-card lcard card-text ltext"><p className="" style={style}>{this.props.finnish_word}</p></div>
        )
    }

}

class RightCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, }
    }

    componentDidMount() {
        this.setState({ width: document.getElementById('left').clientWidth });
        // console.log("width: ",document.getElementById('left').clientWidth);
        window.addEventListener('resize', this.resize)
        this.resize()
    }

    resize = () => this.setState({ width: document.getElementById('left').clientWidth });

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    render() {
        const style = {
            fontSize: computeFontSize(this.props.text, 30, this.state.width) + "px",
        }

        return (
            <div className={"container card word-card rcard " + this.props.cls}>
                <div style={{ height: "100px" }}>
                    <img style={{ display: "inline-block", width: "100px", marginTop: "-92px" }} className="rcard-image" alt="" src={this.props.image} />
                    <div style={{ display: "inline-block", width: this.state.width - 120 + "px" }}>
                        <p className="card-text rtext" style={style}>{this.props.text}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserIO
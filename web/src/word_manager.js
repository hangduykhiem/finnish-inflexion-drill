import React from 'react'
import UserIO from './userio'

class WordManager extends React.Component {
    constructor(props) {
        super(props);
        this.topWords = props.top;
        this.kotusWords = props.kotus;
        this.topWordsKeys = Object.keys(this.topWords);
        this.kotusWordsKeys = Object.keys(this.kotusWords);
        this.state = {
            currentWord: "",
            currentAnswer: "",
            currentTranslation: "",
            currentKotusType: "",
            currentFormName: "",
            currentWordHelpUsed: false,
            helpUsageNumber: 0,
            correctAnswerNumber: 0,
        };
    }

    componentDidMount() {
        this.generateNewWord();
    }

    // generates new word based on current settings
    generateNewWord = () => {
        let currentData;
        if (this.props.currentData === 'kotus') {
            currentData = {
                keys: Object.keys(this.props.kotus),
                data: this.props.kotus
            };
        } else {
            currentData = {
                keys: Object.keys(this.props.top),
                data: this.props.top
            };
        }
        const wordIndex = Math.floor(Math.random() * currentData.keys.length);
        const word = currentData.keys[wordIndex];
        const formsOnCount = this.props.formsOn.map(el => (el && el !== -1 ? el : 0)).reduce((a, b) => a + b);
        let formSubsetIndex = Math.floor(Math.random() * formsOnCount);
        let trueFormIndex = 0;

        // since index was generated based on the number of forms turned on, 
        // it is now necessary to find the index of the x-th form that is on
        for (let i = 0; i < this.props.forms.length; ++i) {
            if (this.props.formsOn[i] && this.props.formsOn[i] !== -1) {
                formSubsetIndex--;
            }
            if (formSubsetIndex < 0) {
                break;
            }
            trueFormIndex++;
        }

        let currentEntry = currentData.data[word];
        this.setState({
            currentWord: word,
            currentFormName: this.props.forms[trueFormIndex],
            currentAnswer: this.props.generateForm(currentEntry.forms, trueFormIndex),
            currentTranslation: currentEntry.tran,
            currentKotusType: currentEntry.kotus
        })
        console.log(this.state.currentAnswer)
    }

    onCorrectAnswer = () => {
        if (!this.state.currentWordHelpUsed) {
            this.setState({
                correctAnswerNumber: this.state.correctAnswerNumber + 1
            });
        }
        this.setState({
            currentWordHelpUsed: false,
        })
        this.generateNewWord();
    }

    onSkipAnswer = () => {
        this.generateNewWord();
    }

    onHelpUse = () => {
        if (!this.state.currentWordHelpUsed) {
            this.setState({
                currentWordHelpUsed: true,
                helpUsageNumber: this.state.helpUsageNumber + 1
            })
        }
    }

    getCorrectPercentage = () => {
        var total = this.state.correctAnswerNumber + this.state.helpUsageNumber
        if (total === 0) {
            return "Not yet available"
        }

        var percentage = (this.state.correctAnswerNumber / total).toFixed(2)
        return "" + percentage + "%"
    }

    render() {
        return (
            <div>
                <p style={{ textAlign: "center" }}>Correct answers: {this.state.correctAnswerNumber} - Help used: {this.state.helpUsageNumber}</p>
                <p style={{ textAlign: "center" }}>Correct percentage: {this.getCorrectPercentage()}</p>
                <UserIO
                    onCorrectAnswer={this.onCorrectAnswer}
                    onSkipAnswer={this.onSkipAnswer}
                    onHelpUse={this.onHelpUse}
                    currentWord={this.state.currentWord}
                    currentAnswer={this.state.currentAnswer}
                    currentTranslation={this.state.currentTranslation}
                    currentKotusType={this.state.currentKotusType}
                    currentFormName={this.state.currentFormName}
                />
            </div >
        )
    }
}

export default WordManager
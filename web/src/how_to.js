import React from 'react'

const HowTo = () => {
    return (
        <div className="mx-auto card about">
            <h2>
                How to use
            </h2>
            <p>
                While entering the words, you can press:
            </p>
            <dl>
                <dt>Number 1</dt>
                <dd>Show the next letter of the answer</dd>
                <dt>Number 2</dt>
                <dd>Show the full answer</dd>
                <dt>Number 3</dt>
                <dd>Skip this question and generate a different word</dd>
            </dl>
        </div >
    )
}

export default HowTo
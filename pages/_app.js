// ensure all pages have Bootstrap CSS
//import '../styles/bootstrap-custom.scss';

import React, { Component } from 'react';
import Intro from '../components/intro';
import Quiz from '../components/quiz';
import quizQuestions from '../api/quizQuestions';
import Result from '../components/result';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';

const numQuestions = 5;
 
class App extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      counter: 0,
	      questionId: 1,
	      question: '',
	      image: '',
		  answer: '',
	      answersCount: 0,
	      stage: 0,
	      quizQs: []
	    };

	    this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
	    this.startQuiz = this.startQuiz.bind(this);
	}

	/**
	 * Shuffles array in place. ES6 version
	 * @param {Array} a items An array containing the items.
	 */
	shuffle(a) {
	    for (let i = a.length - 1; i > 0; i--) {
	        const j = Math.floor(Math.random() * (i + 1));
	        [a[i], a[j]] = [a[j], a[i]];
	    }
	    return a;
	}

	startQuiz() {
		let Qs = this.shuffle(quizQuestions) 
	  	this.setState({
	      answer: Qs[0].answer,
	      image: Qs[0].image,
	      quizQs: Qs,
	      stage: 1
	    });
	}

	handleAnswerSelected(answer) {
    	this.setUserAnswer(answer);
    	if (this.state.questionId < numQuestions) {
     		this.setNextQuestion();
     	} else {
     		this.setState({ stage: 2});
     	}
	}

	setUserAnswer(answer) {
		if(answer) {
			this.setState({
	      		answersCount: this.state.answersCount + 1
	    	});	
		}
	}

	setNextQuestion() {
		const counter = this.state.counter + 1;
		const questionId = this.state.questionId + 1;

		this.setState({
		  counter: counter,
		  questionId: questionId,
		  answer: this.state.quizQs[counter].answer,
		  image: this.state.quizQs[counter].image
		});
	}

	renderQuiz() {
	    return (
	      <Quiz
	        answer={this.state.answer}
	        image={this.state.image}
	        questionId={this.state.questionId}
	        questionTotal={numQuestions}
	        onAnswerSelected={this.handleAnswerSelected}
	      />
	    );
  	}

  	renderResult() {
    	return <Result correctAnswers={this.state.answersCount} />;
  	}

  	renderIntro() {
  		return <Intro callback={this.startQuiz}/>;
  	}

	render() {
		switch(this.state.stage){
			case 1:
				return this.renderQuiz();
				break;
			case 2:
				return this.renderResult();
				break;
			default:
				return this.renderIntro();
		}
	}
}

export default App;
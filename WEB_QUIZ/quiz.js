'use strict';

var Quiz = Quiz || {};
Quiz.Q1ans = {
	'A) HAL 9000': ["Incorrect: The HAL 9000 is a fictional computer from Arthur C. Clarke's 2001: A Space Odyssey."],
	'B) FERUT': ["Correct: The machine arrived in Canada on April 30, 1952.  Named FERUT (FERranti U of T), it was used to compute changes in water levels due to the opening of the St. Lawrence Seaway."],
	'C) ILLIAC': ["Incorrect: The ILLIAC was built at the University of Illinois. It was the first von Neumann architecture computer built and owned by an American university. It was put into service on September 22, 1952."],
	'D) UNIVAC': ["Incorrect:  The UNIVAC was the first commericial computer produced in the United States, and was designed by J. Presper Eckert and John Mauchly.  The United States Census Department received delivery of the first UNIVAC in May 1952."]
};
Quiz.Q2choice = ["loop", "inline", "keyboard", "interpreter", "function", "block", "character", "variable"];
Quiz.Q3name = ["a) Daniel Wigdor", "b) Stephen Cook", "c) Geoff Hinton", "d) Karan Singh", "e) Diane Horton",
 "f) Raquel Urtasun", "g) David Levin", "h) Mike Brudno"];
Quiz.Q3answers = {"a) Daniel Wigdor": ["Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars"], 
"b) Stephen Cook": ["Pioneer in machine learning, now Distinguished Researcher at Google"], 
"c) Geoff Hinton": ["Taught a first-year course while an undergraduate student in our department"], 
"d) Karan Singh": ["Academy Award for Ryan (software research and development director)"], 
"e) Diane Horton": ["Turing Award winner for work in computational complexity"],
"f) Raquel Urtasun": ["Associate Research Scientist at Disney Research before joining the faculty"], 
"g) David Levin": ["Winner of both the President's Teaching Award and OCUFA teaching award"], 
"h) Mike Brudno": ["Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital"]};

Quiz.Q3setup = {"a) Daniel Wigdor": ["Associate Research Scientist at Disney Research before joining the faculty"], 
"b) Stephen Cook": ["Taught a first-year course while an undergraduate student in our department"], 
"c) Geoff Hinton": ["Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars"], 
"d) Karan Singh": ["Academy Award for Ryan (software research and development director)"], 
"e) Diane Horton": ["Pioneer in machine learning, now Distinguished Researcher at Google"],
"f) Raquel Urtasun": ["Winner of both the President's Teaching Award and OCUFA teaching award"], 
"g) David Levin": ["Turing Award winner for work in computational complexity"], 
"h) Mike Brudno": ["Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital"]};

Quiz.Q3rcol = ["Associate Research Scientist at Disney Research before joining the faculty", 
"Taught a first-year course while an undergraduate student in our department",
"Canada Research Chair in Machine Learning and Computer Vision, researching self-driving cars",
"Academy Award for Ryan (software research and development director)",
"Pioneer in machine learning, now Distinguished Researcher at Google",
"Winner of both the President's Teaching Award and OCUFA teaching award",
"Turing Award winner for work in computational complexity",
"Scientific Director of the Centre for Computational Medicine at Sick Kids Hospital"];
Quiz.Q3ans = ["f", "c", "a", "d", "b", "g", "e", "h"];
Quiz.Q3alphabet = ["a", "b", "c", "d", "e", "f", "g", "h"];
Quiz.Q4ans = ["First Computer Program", "The First Computer Network", 
"First Compiler for Electronic Computer: A-0 System", "First Open Source Software: A-2 System", 
"First Popular High-Level Language: FORTRAN", "First Object Oriented Programming Language: Simula", 
"First Microprocessor: Intel 4004"];
Quiz.Q4year = ["1841", "1940", "1951", "1953", "1957", "1967", "1971"];
// variable to record the total score of the quiz
var totalScore = 0;
// variable to record first time finish all questions
var first_finish = 0;

Quiz.buildQ1 = function() {
	let i = 1;
	var alreadyClicked = [];
	var showAllDisplayed = false;
	let firstClick = true;
	// create the showAll button
	var showAll = document.createElement("button");
	var showAllText = document.createTextNode("SHOW ALL");
	showAll.appendChild(showAllText);
	showAll.onclick = function() {
		var buttons = document.getElementById("q1").getElementsByTagName("INPUT");
		for (let j in buttons) {
			if (!isNaN(j)) {
				buttons[j].onclick();
			}
		}
	}

	for (let key in Quiz.Q1ans) {
		// create radio button for the choices
		var btn = document.createElement("INPUT");
		btn.setAttribute("type", "radio");
		btn.setAttribute("name","question1");
		let cur_btn = "ans" + i.toString();
		let cur_key = key;
		document.getElementById(cur_btn).appendChild(btn);
		var anstext = document.createTextNode(key);
		document.getElementById(cur_btn).appendChild(anstext);

		btn.onclick = function() {
			if (firstClick && cur_btn == "ans2") {
				totalScore += 1;
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 1/1");
				score.appendChild(scoreText);
				document.getElementById("q1score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				Quiz.finalScoreAlert();
			} else if (firstClick && cur_btn != "ans2") {
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 0/1");
				score.appendChild(scoreText);
				document.getElementById("q1score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				Quiz.finalScoreAlert();
			}
			firstClick = false;
			if (!showAllDisplayed) {
				document.getElementById("showAll").appendChild(showAll);
				showAllDisplayed = true;
			}
			if (alreadyClicked.indexOf(cur_btn) == -1) { 
					alreadyClicked.push(cur_btn);
					var p = document.createElement("p");
					var explaination = document.createTextNode(Quiz.Q1ans[cur_key]);
					p.appendChild(explaination);
					document.getElementById(cur_btn).appendChild(p);
			};
		}
		i++;
	}
};

Quiz.buildQ2 = function() {
	var answers = [];
	var result = "";
	var incorrect = "";
	let firstSubmit = true;
	// build checkboxes for all the choices
	for (let i = 0; i < Quiz.Q2choice.length; i++) {
		var btn = document.createElement("INPUT");
		btn.setAttribute("type", "checkbox");
		btn.setAttribute("id", Quiz.Q2choice[i])
		var btntext = document.createTextNode(Quiz.Q2choice[i]);
		document.getElementById("q2choice").appendChild(btn);
		document.getElementById("q2choice").appendChild(btntext);
		btn.onclick = function() {
			// add the choice to answers array if it has been checked
			if (document.getElementById(Quiz.Q2choice[i]).checked) {
				answers.push(Quiz.Q2choice[i]);
			} else {
				if (answers.indexOf(Quiz.Q2choice[i]) != -1) {
					answers.splice(answers.indexOf(Quiz.Q2choice[i]), 1);
				}
			}
		}
	}
	// create the submit button
	let submit_btn = document.createElement("button");
	let submit_btn_text = document.createTextNode("SUBMIT");
	submit_btn.appendChild(submit_btn_text);
	document.getElementById("q2submit").appendChild(submit_btn);
	var submit_result = document.createElement("p");
	var submit_result_text = document.createTextNode(result);
	submit_result.appendChild(submit_result_text);
	document.getElementById("q2result").appendChild(submit_result);

	submit_btn.onclick = function() {
		if (answers.length < 2) {
			result = 'Selected only one word: "Your answer is incomplete.  Please select another word."';
		} else if (answers.length > 2) {
			result = 'Selected too many words:  "Only two words can be selected. Please try again."';
		} else if ((answers.indexOf("function") != -1) && (answers.indexOf("variable") != -1) 
			&& (answers.indexOf("variable") != (answers.indexOf("function")))) {
			result = 'Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.';
			if (firstSubmit) {
				totalScore += 2;
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 2/2");
				score.appendChild(scoreText);
				document.getElementById("q2score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				firstSubmit = false;
				Quiz.finalScoreAlert();
			}
		} else if ((answers.indexOf("function") != -1) && (answers.indexOf("variable") == -1) ) {
			if ((answers.indexOf("function") == 0)) {
				incorrect = answers[1];
			} else {
				incorrect = answers[0];
			}
			result = 'One word correct: "Incorrect: You picked "function" correctly, but "' 
			+ incorrect + '" is one of the words that Professors Gotlieb and Hume got credit for."';
			if (firstSubmit) {
				totalScore += 1;
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 1/2");
				score.appendChild(scoreText);
				document.getElementById("q2score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				firstSubmit = false;
				Quiz.finalScoreAlert();
			}
		} else if ((answers.indexOf("variable") != -1) && (answers.indexOf("function") == -1)) {
			if ((answers.indexOf("variable") == 0)) {
				incorrect = answers[1];
			} else {
				incorrect = answers[0];
			}
			result = 'One word correct: "Incorrect: You picked "variable" correctly, but "' 
			+ incorrect + '" is one of the words that Professors Gotlieb and Hume got credit for."';
			if (firstSubmit) {
				totalScore += 1;
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 1/2");
				score.appendChild(scoreText);
				document.getElementById("q2score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				firstSubmit = false;
				Quiz.finalScoreAlert();
			}
		} else {
			result = 'Neither word correct:  "Incorrect: Both words you chose are words that Professors Gotlieb and Hume were quoted for in the OED."';
			if (firstSubmit) {
				totalScore += 0;
				let score = document.createElement("p");
				let scoreText = document.createTextNode("Score: 0/2");
				score.appendChild(scoreText);
				document.getElementById("q2score").appendChild(scoreText);
				//change the total score
				document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
				firstSubmit = false;
				Quiz.finalScoreAlert();
			}
		}
		var oldchild = document.getElementById("q2result").childNodes[0];
		var newpara = document.createElement("p");
		var newpara_text = document.createTextNode(result);
		newpara.appendChild(newpara_text);

		document.getElementById("q2result").replaceChild(newpara, oldchild);
	}
}

Quiz.buildQ3 = function() {
	let cur_click_left = "";
	let cur_ans = ["", "", "", "", "", "", "", ""];
	let left_clicked = false;
	let all_filled = false;
	let first_all_filled = true;
	var count_filled = 0;

	// create the button for the left part, ie the people's name column
	for (let i = 0; i < Quiz.Q3name.length; i++) {
		var lcol = document.createElement("p");
		var lcolumn = document.createElement("button");
		var lcolumntext = document.createTextNode(Quiz.Q3name[i]);
		lcolumn.appendChild(lcolumntext);
		lcol.appendChild(lcolumn);
		document.getElementById("leftcol").appendChild(lcol);
		lcol.onclick = function() {
			left_clicked = true;
			cur_click_left = Quiz.Q3alphabet[i];
		}
	}
	// create the button for the explaination part
	for (let key in Quiz.Q3setup) {
		let rcol = document.createElement("p");
		let rcolumn = document.createElement("button");
		let rcolumntext = document.createTextNode("___ " + Quiz.Q3setup[key][0]);
		rcolumn.appendChild(rcolumntext);
		rcol.appendChild(rcolumn);
		document.getElementById("rightcol").appendChild(rcol);
		rcol.onclick = function() {
			// if user has chosen one option from left column and the blank in right column has not been all filled
			if (left_clicked && !all_filled) {
				let rchoice = rcolumn.childNodes[0].textContent;
				// add the choice to the answer array
				cur_ans[Quiz.Q3rcol.indexOf(rchoice.substring(4, rchoice.length))] = cur_click_left;
				rcolumn.childNodes[0].textContent = "_" + cur_click_left + "_ " + rcolumn.childNodes[0].textContent.substring(4, rchoice.length);
				left_clicked = false;
				// if all answers has been filled
				count_filled = 0;
				for (let j = 0; j < 8; j++) {
					if (cur_ans[j] != "") {
						count_filled++;
					}
				}
				if (count_filled == 8) {
					all_filled = true;
					// first time all filled, we calculate the score
					if (first_all_filled) {
						let count_correct = 0;
						for (let m = 0; m < 8; m++) {
							if (cur_ans[m] == Quiz.Q3ans[m]) {
								count_correct++;
							}
						}
						totalScore += count_correct * 0.5;
						let score = document.createElement("p");
						let scoreText = document.createTextNode("Score: " + count_correct*0.5 + "/4");
						score.appendChild(scoreText);
						document.getElementById("q3score").appendChild(scoreText);
						//change the total score
						document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
						first_all_filled = false;
						Quiz.finalScoreAlert();
					}
					// post correct answers
					let rightColList = document.getElementById("rightcol").getElementsByTagName("button");
					for (let k = 0; k < 8; k++) {
						//wrong answer
						if (cur_ans[k] != Quiz.Q3ans[k]) {
							rightColList[k].childNodes[0].textContent = "_" + cur_ans[k] + "->" + Quiz.Q3ans[k] + "_ " + Quiz.Q3setup[Quiz.Q3name[k]][0];
							rightColList[k].style.color = "red";
						} else {// correct answer
							rightColList[k].style.color = "green";
						}
					}
				}
			}	
		}
	}
}

Quiz.buildQ4 = function() {
	let first_submit = true;
	let cur_score = 0;
	let numCorrect = 0;
	let numfilled = 0;
	let filled_all = false;
	//create the submit button
	let submit_btn = document.createElement("button");
	let submit_btn_text = document.createTextNode("SUBMIT");
	submit_btn.appendChild(submit_btn_text);
	document.getElementById("q4submit").appendChild(submit_btn);

	submit_btn.onclick = function() {
		numfilled = 0
		// check whether the answer box has been all filled
		for (let z = 1; z < 8; z++) {
			if (document.getElementById("a" + z).textContent != "") {
				numfilled++;
			}
		}
		if (numfilled == 7) {
			filled_all = true;
		}

		if (first_submit && filled_all) {
			for (let g = 1; g < 8; g++) {
				let content = document.getElementById("a" + g).textContent;
				if (document.getElementById("a" + g).textContent == Quiz.Q4ans[g-1]){
					numCorrect++;
					document.getElementById("a" + g).textContent += "---" + Quiz.Q4year[Quiz.Q4ans.indexOf(content)];
				} else {
					document.getElementById("a" + g).textContent += "---" + Quiz.Q4year[Quiz.Q4ans.indexOf(content)];
				}
			}
			if (numCorrect == 7) {
				totalScore += 1;
				cur_score = 1;
			}
			// create a paragraph to display score
			let score = document.createElement("p");
			let scoreText = document.createTextNode("Score: " + cur_score + "/1");
			score.appendChild(scoreText);
			document.getElementById("q4score").appendChild(scoreText);
			//change the total score
			document.getElementById("score").innerHTML="Total Score: " + totalScore + "/8";
			Quiz.finalScoreAlert();
			first_submit = false;

		}
		
	}
}

// a function for the alert to display final score
Quiz.finalScoreAlert = function() {
	if (first_finish == 3) {
		alert("Your final score is " + totalScore + "/8.");
	} else {
		first_finish++;
	}
}


Quiz.init = function() {
	this.buildQ1();
	this.buildQ2();
	this.buildQ3();
	this.buildQ4();
	
};
Quiz.init();
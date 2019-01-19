import { Component, OnInit } from '@angular/core';

import { ApibackendService } from '../apibackend.service';

import { ActivatedRoute, Router, ParamMap } from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  receivedData: any;
  done: boolean = false;

  index: any;
  id: any;

  questionNumber: any = 0;
  question: any;
  click = false;
  optionSelected: any = 0;
  lastquestion: any = false;
  toatalMarks = 0;

// MaxnumberQuestion=5;


  constructor(private api: ApibackendService, private router: Router, private activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
     this.api.fetchQuestionsData('http://localhost:3000/allQuestions').subscribe((res: any) => {
      this.receivedData = res;
    });
  }


  onclick(element, index) {
    let data = {
      answer: index
    };
    this.optionSelected = 1;

    this.api.postAnswer('http://localhost:3000/' + element.id, { answer: index }).subscribe((res: any) => {
      this.receivedData = res;
    });
  }


  showquestions() {
    this.click = true;
    this.question = this.receivedData[this.questionNumber];
  }


  next() {

    if (this.questionNumber <= 3 && this.optionSelected == 1) {
      if (this.questionNumber == 4) {
        this.lastquestion = true;
      }
      this.questionNumber++;
      this.optionSelected = 0;
      this.question = this.receivedData[this.questionNumber];
    }


    else if (this.questionNumber == 4 && this.optionSelected == 1) {
      alert("ready to submit");
      this.lastquestion = true;
      this.done = true;
    }
    else {
      alert("this is last question or select any option");
    }

  }

  previous() {
    if (this.questionNumber >= 1 && this.optionSelected) {

      this.questionNumber--;
      this.optionSelected = 0;
      this.question = this.receivedData[this.questionNumber];
    }

    else {
      alert("this is first question or you didn't select any option");
    }

  }


  submitQiz() {
    this.click = false;
    for (let i = 0; i < 5; i++) {
        if (this.receivedData[i].incorrect_answers[this.receivedData[i].answer] == this.receivedData[i].correct_answer)
        this.toatalMarks++;
     }

  }






}
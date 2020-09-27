import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(public router: Router, public quizService: QuizService) { }



  ngOnInit() {
    // tslint:disable-next-line: radix
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      // tslint:disable-next-line: radix
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      // tslint:disable-next-line: radix
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      // tslint:disable-next-line: triple-equals
      if (this.quizService.qnProgress == 10) {
        this.router.navigate(['/result']);
      }
      else {
        this.startTimer();
      }
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestion().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.startTimer();
        }
      );
    }
  }

  // ngOnInit(): void {
  //   this.quizService.seconds = 0;
  //   this.quizService.qnProgress = 0;
  //   this.quizService.getQuestion().subscribe(
  //     (data: any) => {
  //      this.quizService.qns = data;
  //      this.startTimer();
  //     });
  // }

  startTimer(){
this.quizService.timer = setInterval(() => {
  this.quizService.seconds++;
  localStorage.setItem('seconds', this.quizService.seconds.toString());
}, 1000);

  }
  Answer(qID,  choice ){
this.quizService.qns[this.quizService.qnProgress].answer = choice;
localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
this.quizService.qnProgress++;
localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
// tslint:disable-next-line: triple-equals
if (this.quizService.qnProgress == 10) {
clearInterval(this.quizService.timer);
this.router.navigate(['/result']);
}
  }
}

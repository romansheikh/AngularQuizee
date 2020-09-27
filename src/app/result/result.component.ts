import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {



  constructor(public quizService: QuizService, public router: Router) { }



  ngOnInit() {
    // tslint:disable-next-line: radix
    if (parseInt(localStorage.getItem('qnProgress')) == 10) {
      // tslint:disable-next-line: radix
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      // tslint:disable-next-line: radix
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));

      this.quizService.getAnswers().subscribe(
        (data: any) => {
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e, i) => {
            // tslint:disable-next-line: triple-equals
            if (e.answer == data[i]) {
              this.quizService.correctAnswerCount++;
            }
            e.correct = data[i];
          });
        }
      );
    }
    else {
      this.router.navigate(['/quiz']);
    }
  }


  //  ngOnInit() {

  //      this.quizService.getAnswers().subscribe(
  //        (data: any) => {
  //          this.quizService.correctAnswerCount = 0;
  //          this.quizService.qns.forEach((e, i) => {
  //            // tslint:disable-next-line: triple-equals
  //            if (e.answer == data[i]) {
  //              this.quizService.correctAnswerCount++;
  //            }
  //            e.correct = data[i];
  //          });
  //        }
  //      );
  //    }


  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('qnProgress', '0');
    localStorage.setItem('qns', '');
    localStorage.setItem('seconds', '0');
    this.router.navigate(['/quiz']);
  }

}

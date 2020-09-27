import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

 // -------------Helper Method--------------
export class QuizService {

  // --------Properties ---------
  readonly rootUrl = 'https://localhost:44367';
  qns: any[];
  seconds: number;
  timer: any;
  qnProgress: number;
  // tslint:disable-next-line: no-inferrable-types
  correctAnswerCount: number = 0;

  // ------------Http Methed---------------
  constructor(private http: HttpClient) { }
displayTimeElapsed(){
  return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
}

getParticipantName(){
  const participant = JSON.parse(localStorage.getItem('Participant'));
  return participant.Name;
}



  InsertParticipant( name: string, email: string)
  {
    const body = {
      Name: name,
      Email: email
    };
    return this.http.post(this.rootUrl + '/api/InsertParticipant', body);
  }

  getQuestion(){
    return this.http.get( this.rootUrl + '/api/Question');
  }

  getAnswers(){
   const body = this.qns.map(x => x.QuestionID);
   return this.http.post(this.rootUrl + '/api/Answers', body);
  }

  submitScore(){
    var body = JSON.parse(localStorage.getItem('Participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + '/api/UpdateOutput', body);
  }

}

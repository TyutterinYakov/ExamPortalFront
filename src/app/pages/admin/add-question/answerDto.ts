export class AnswerDto {
    id: string
    reply: string;
    correctly: boolean;
  
    constructor(id: any, reply: string, correctly: boolean) {
      this.id = id;
      this.reply = reply;
      this.correctly = correctly;
    }
  }
  
  export class QuestionDto {
    content: string;
    quizId: string;
    marks: number;
    time: number;
    answers: AnswerDto[];
    constructor(content: string, quizId: string, marks: number, time: number) {
      this.content = content;
      this.quizId = quizId;
      this.marks = marks;
      this.time = time;
      this.answers = [];
    }
  }
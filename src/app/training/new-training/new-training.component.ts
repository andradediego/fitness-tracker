import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises = [
    {
      name: 'Crunches',
      value: 'crunches'
    },
    {
      name: 'Touch Toes',
      value: 'touch-toes'
    },
    {
      name: 'Side lunges',
      value: 'side-lunges'
    },
    {
      name: 'Burpees',
      value: 'burpees'
    },
  ];
  @Output() trainingStart = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}

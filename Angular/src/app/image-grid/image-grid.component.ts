import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.css']
})
export class ImageGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  imageList = ['assets/images/arch.jpg', 'assets/images/baz.png', 'assets/images/cans.jpg', 'assets/images/car.jpeg']

}


// export class ExampleComponent {
//   array = [
//     {
//       guid: '900ea552-ef68-42cc-b6a6-b8c4dff10fb7',
//       age: 32,
//       name: 'Powers Schneider'
//     },
//     {
//       guid: '880381d3-8dca-4aed-b207-b3b4e575a15f',
//       age: 25,
//       name: 'Adrian Lawrence'
//     },
//     {
//       guid: '87b47684-c465-4c51-8c88-3f1a1aa2671b',
//       age: 32,
//       name: 'Boyer Stanley'
//     }
//   ];
// }

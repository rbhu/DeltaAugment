import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Image Augmentation';
}


// S3 IMAGE PULLING

// function listAlbums() {
//   s3.listObjects({Delimiter: '/'}, function(err, data) {
//     if (err) {
//       return alert('There was an error listing your albums: ' + err.message);
//     } else {
//       var albums = data.CommonPrefixes.map(function(commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace('/', ''));
//         return getHtml([
//           '<li>',
//             '<span onclick="deleteAlbum(\'' + albumName + '\')">X</span>',
//             '<span onclick="viewAlbum(\'' + albumName + '\')">',
//               albumName,
//             '</span>',
//           '</li>'
//         ]);
//       });
//       var message = albums.length ?
//         getHtml([
//           '<p>Click on an album name to view it.</p>',
//           '<p>Click on the X to delete the album.</p>'
//         ]) :
//         '<p>You do not have any albums. Please Create album.';
//       var htmlTemplate = [
//         '<h2>Albums</h2>',
//         message,
//         '<ul>',
//           getHtml(albums),
//         '</ul>',
//         '<button onclick="createAlbum(prompt(\'Enter Album Name:\'))">',
//           'Create New Album',
//         '</button>'
//       ]
//       document.getElementById('app').innerHTML = getHtml(htmlTemplate);
//     }
//   });
// }

// var params = {
//  Bucket: "img-bucket-irw",
//  MaxKeys: 2
// };
// s3.listObjects(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// //   /*
//   data = {
//    Contents: [
//       {
//      ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
//      Key: "example1.jpg",
//      LastModified: <Date Representation>,
//      Owner: {
//       DisplayName: "myname",
//       ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
//      },
//      Size: 11,
//      StorageClass: "STANDARD"
//     },
//       {
//      ETag: "\"9c8af9a76df052144598c115ef33e511\"",
//      Key: "example2.jpg",
//      LastModified: <Date Representation>,
//      Owner: {
//       DisplayName: "myname",
//       ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
//      },
//      Size: 713193,
//      StorageClass: "STANDARD"
//     }
//    ],
//    NextMarker: "eyJNYXJrZXIiOiBudWxsLCAiYm90b190cnVuY2F0ZV9hbW91bnQiOiAyfQ=="
//   }
//   */
// });

var OCRAD = require('ocrad.js');
var Canvas = require('canvas');
var Image = Canvas.Image;
var fs = require('fs');

fs.readFile(__dirname + '/img/img1.jpeg', function(err, src) {
  if (err) {
    throw err;
  }
  var img = new Image();
  img.src = src;
  var canvas = new Canvas.createCanvas(img.width, img.height);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  console.log(OCRAD(canvas));
});
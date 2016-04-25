var main = function () {
   "use strict";
   var processor = {   
      doLoad: function() {
         this.video = document.getElementById("dummy");
         this.canvas = document.getElementById("video");
         this.ctx = this.canvas.getContext("2d");
         //this.c2 = document.getElementById("c2");
         //this.ctx2 = this.c2.getContext("2d");
         var self = this;
         this.video.addEventListener("playing", function() {
            var divindex = Math.max( Math.floor(self.video.videoWidth/864), Math.floor(self.video.videoHeight/576) );
            if (divindex === 0) { divindex = 1; }
            self.width = self.video.videoWidth / divindex;
            self.height = self.video.videoHeight / divindex;
            self.ctx.drawImage(self.video, 0, 0, self.width, self.height);
            //self.fm1 = self.ctx1.getImageData(0, 0, self.width, self.height);
            self.timerCallback();
         }, false);
      },
      timerCallback: function() {
         /*
         if (this.video.paused || this.video.ended) {
            return;
         }
         */
         this.computeFrame();
         var self = this;
         setTimeout(function () {
            self.timerCallback();
         }, 0);
      },
      computeFrame: function() {
         this.ctx.drawImage(this.video, 0, 0, this.width, this.height);
         var frame = this.ctx.getImageData(0, 0, this.width, this.height);
         var l = frame.data.length / 4;

         for (var i = 0; i < l; i++) {
            var r = frame.data[i*4+0];
            var g = frame.data[i*4+1];
            var b = frame.data[i*4+2];
            var thresh = 80;
            if (g > thresh && r > thresh && b > thresh) {
               frame.data[i*4+0] = 255;
               frame.data[i*4+1] = 255;
               frame.data[i*4+2] = 255;
            } else {
               frame.data[i*4+0] = 0;
               frame.data[i*4+1] = 0;
               frame.data[i*4+2] = 0;
            }             
         }
         this.ctx.putImageData(frame, 0, 0);
         return;
      }
   };
   processor.doLoad();
};
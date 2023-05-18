


var bb = new Blob(["console.log('hello')"], {
    type: 'text/javascript'
  });

  // convert the blob into a pseudo URL
  var bbURL = URL.createObjectURL(bb);

  // Prepare the worker to run the code
  var worker = new Worker(bbURL);


  // add a listener for messages from the Worker
  worker.addEventListener('message', function(e){
    var string = (e.data).toString();
    console.log(string)
  }.bind(this));

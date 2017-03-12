var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../zsls/server');
var should = chai.should();

chai.use(chaiHttp);


describe('Test', function() {
  it('should list ALL sellers on /sellers GET', function(done) {
  	chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      done();
    });
});
  // it('should list a SINGLE blob on /blob/<id> GET');
  // it('should add a SINGLE blob on /blobs POST');
  // it('should update a SINGLE blob on /blob/<id> PUT');
  // it('should delete a SINGLE blob on /blob/<id> DELETE');
});

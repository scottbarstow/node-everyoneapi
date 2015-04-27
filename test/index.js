var nock = require("nock");
var api = require("..");

nock.disableNetConnect();

api.config.token = "token";
api.config.sid = "sid";

describe("getInfo()", function(){
  afterEach(function(){
    nock.cleanAll();
  });

  it("should be called with phone number", function(done){
    var r = nock("https://api.everyoneapi.com/v1").get("/phone/1234567890?account_sid=sid&auth_token=token").reply(200, {});
    api.getInfo("1234567890", function(err){
      if(err){
        return done(err);
      }
      r.isDone().should.be.true;
      done();
    });
  });

  it("should be called with phone number and data (simple string)", function(done){
    var r = nock("https://api.everyoneapi.com/v1").get("/phone/1234567890?account_sid=sid&auth_token=token&data=data").reply(200, {});
    api.getInfo("1234567890", "data",  function(err){
      if(err){
        return done(err);
      }
      r.isDone().should.be.true;
      done();
    });
  });

  it("should be called with phone number and data (array)", function(done){
    var r = nock("https://api.everyoneapi.com/v1").get("/phone/1234567890?account_sid=sid&auth_token=token&data=data1%2Cdata2").reply(200, {data: "data"});
    api.getInfo("1234567890", ["data1", "data2"],  function(err, res){
      if(err){
        return done(err);
      }
      r.isDone().should.be.true;
      res.should.eql({data: "data"});
      done();
    });
  });

  it("should fail if called without required params", function(done){
    api.getInfo(function(err){
      if(err){
        return done();
      }
      done(new Error("An error should be occured"));
    });
  });


  it("should fail on api error", function(done){
    var r = nock("https://api.everyoneapi.com/v1").get("/phone/1234567890?account_sid=sid&auth_token=token").reply(500);
    api.getInfo("1234567890", function(err){
      err.should.be.ok;
      done();
    });
  });

});

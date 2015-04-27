superagent = require("superagent");

module.exports = {
  config: {
    sid: "",
    token: "",
    baseUrl: "https://api.everyoneapi.com/v1/phone"
  },
  getInfo: function(number, data, callback){
    if(arguments.length < 2){
      callback = number;
      return callback(new Error("Missing required parameter phone number or callback"));
    }
    var query = {
      account_sid: this.config.sid,
      auth_token: this.config.token,
    };
    if(arguments.length === 2){
      callback = data;
      data = null;
    }
    if(data){
      query.data = Array.isArray(data)?data.join(","):data;
    }
    superagent.get(this.config.baseUrl + "/" + encodeURIComponent(number)).query(query).end(function(err, res){
      if(err){
        return callback(err);
      }
      callback(null, res.body);
    });
  }
};

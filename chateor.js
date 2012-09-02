//Messages = new Meteor.Collection('messages');

//Users = new Meteor.Collection('users');

if (Meteor.is_client) {

  Template.entry.events = {};

  Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function (text, event) {
      var nameEntry = Template.entry.signedin();
      if (nameEntry == undefined) {
        console.log("no nameEntry:" + nameEntry);
        nameEntry = document.getElementById("name");
      }
      console.log("nameEntry: " + nameEntry);
      console.log("nameEntry.value: " + nameEntry.value);
      if (nameEntry.value != "") {
        if (!exists_user(nameEntry, ip)) {
          Users.insert( { name: nameEntry.value, city: city, ip: ip } );
          Session.set('signedin', nameEntry);
          console.log("add " + nameEntry.value);
        }
        var ts = Date.now() / 1000;
        var os = platform();
        
        Messages.insert( { name: nameEntry.value, message: text, time: ts, today: today, city: city, os: os } );
        event.target.value = "";
        
      }
    }
  });

  Template.entry.signedin = function () {
    console.log("signedin");
    console.log("session get: " + Session.get('signedin'));
    return Session.get('signedin');
  };

  Template.messages.messages = function() {
    return Messages.find({}, {sort: { time: -1 } } );
  };


}
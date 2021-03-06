//Messages = new Meteor.Collection('messages');

//Users = new Meteor.Collection('users');

if (Meteor.is_client) {

  Template.entry.events = {};

  Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function (text, event) {
      var nameEntry = document.getElementById("name");
      if (nameEntry.value != "") {
        if (!exists_user(nameEntry, ip)) {
          Users.insert( { name: nameEntry.value, city: city, ip: ip } );
          console.log("add " + nameEntry.value);
        }
        else {
          alert ("Sorry, but this name is already taken.");
        }
        var ts = Date.now() / 1000;
        Messages.insert( { name: nameEntry.value, message: text, time: ts, today: today, city: city } );
        event.target.value = "";
        
      }
    }
  });

  Template.messages.messages = function() {
    return Messages.find({}, {sort: { time: -1 } } );
  };
}
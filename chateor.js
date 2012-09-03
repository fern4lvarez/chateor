if (Meteor.is_client) {

  Template.entry.events = {};

  Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function (text, event) {
      var nameEntry = Template.entry.signedin();
      var ts = Date.now() / 1000;
      var os = platform() || "Unkown OS";

      if (nameEntry == undefined) {
        nameEntry = document.getElementById("name");
      }

      if (nameEntry.value != "") {
        if (!exists_user(nameEntry, ip)) {
          Users.insert( { name: nameEntry.value, city: city, ip: ip } );
          Session.set('signedin', nameEntry);
        }
        
        Messages.insert( { name: nameEntry.value, message: text, time: ts, today: today, city: city, os: os } );
        event.target.value = "";
        
      }
    }
  });

  Template.entry.signedin = function () {
    return Session.get('signedin');
  };

  Template.messages.messages = function() {
    return Messages.find({}, {sort: { time: -1 } } );
  };
}
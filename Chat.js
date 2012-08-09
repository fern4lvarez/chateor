
Messages = new Meteor.Collection('messages');

var objToday = new Date(),
                curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
                curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = curHour + ":" + curMinute + curMeridiem;// + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

var city = "";

function your_callback(data) {
  // do something with data
  city = data.city || "Unknown";
}

if (Meteor.is_client) {
  ////////// Helpers for in-place editing //////////
  
  // Returns an event_map key for attaching "ok/cancel" events to
  // a text input (given by selector)
  var okcancel_events = function (selector) {
    return 'keyup '+selector+', keydown '+selector+', focusout '+selector;
  };
  
  // Creates an event handler for interpreting "escape", "return", and "blur"
  // on a text field and calling "ok" or "cancel" callbacks.
  var make_okcancel_handler = function (options) {
    var ok = options.ok || function () {};
    var cancel = options.cancel || function () {};
  
    return function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);
      } else if (evt.type === "keyup" && evt.which === 13) {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };
  };

  Template.entry.events = {};

  Template.entry.events[okcancel_events('#messageBox')] = make_okcancel_handler({
    ok: function (text, event) {
      var nameEntry = document.getElementById("name");
      if (nameEntry.value != "") {
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
var objToday = new Date(),
                curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
                curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
                curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
var today = curHour + ":" + curMinute + curMeridiem;// + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;

var city = "Unknown";
var ip = "0.0.0.0"
function your_callback(data) {
  // do something with data
  city = data.city || city;
  ip = data.host || ap;
}

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

// Determinates whether a user already exists
var exists_user = function (nameEntry) {
  if (Users.findOne( {name: nameEntry.value} ) == null) {
    console.log(nameEntry.value + " does not exist.");
    return false;
  }
  else {
    console.log(nameEntry.value + " already exists.");
    return true;
  }
};




var mongoose = require("mongoose");
var InvitationCodeSchema = require("../schemas/invitation-code");
var InvitationCode = mongoose.model("InvitationCode", InvitationCodeSchema);

module.exports = InvitationCode;
const { Schema, model } = require("mongoose");

const rejectedReasonSchema = new Schema(
  {
    code: { type: Number, require: true },
    reason: { type: String, require: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("RejectedReason", rejectedReasonSchema);

const { Schema, model } = require("mongoose");
const { candidateColumns } = require('./../data/configData')

const candidateSchema = new Schema(
  candidateColumns,
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Candidate", candidateSchema);

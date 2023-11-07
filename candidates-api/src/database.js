const mongoose = require("mongoose");
const Candidate = require("./models/Candidate");
const RejectedReason = require("./models/RejectedReason");
const { candidates } = require("./data/testData");
const { mapCandidates } = require("./mappers/candidateMappers");
const { rejectedReasons } = require('./data/configData')

console.log("Connecting to ", process.env.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async (db) => {
    console.log("Db is connected");
    
    // Check if the Candidate collection is empty
    const isEmptyCandidate = await Candidate.countDocuments() === 0;

    if (isEmptyCandidate) {
      console.log("Creating candidates...");
      const candidateMapped = candidates.map((candidate) => {
        return mapCandidates(candidate);
      });
  
      Candidate.insertMany(candidateMapped)
        .then((candidates) => {
          console.log("Candidates inserted:", candidates.length);
        })
        .catch((err) => {
          console.error("Error inserting candidates:", err);
        });
      console.log("Candidates created...");
    }

    // Check if the RejectedReasons collection is empty
    const isEmptyRejectedReasons = await RejectedReason.countDocuments() === 0;

    if (isEmptyRejectedReasons) {
      console.log("Creating rejected reasons...");
  
      RejectedReason.insertMany(rejectedReasons)
        .then((rejectedReasons) => {
          console.log("Rejected Reasons inserted:", rejectedReasons.length);
        })
        .catch((err) => {
          console.error("Error inserting rejected reasons:", err);
        });
      console.log("Rejected Reasons created...");
    }
    

    

    
  })
  .catch((err) => console.error(err));

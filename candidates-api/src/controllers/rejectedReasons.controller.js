const rejectedReasonCtrl = {};

const RejectedReason = require("../models/RejectedReason");

rejectedReasonCtrl.GetRejectedReasons = async (req, res) => {debugger
  try {   
    const rejectedReasons = await RejectedReason.find();

    res.json({
      rejectedReasons
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = rejectedReasonCtrl;

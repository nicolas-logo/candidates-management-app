const _ = require('lodash');

const candidatesCtrl = {};

const Candidate = require("../models/Candidate");
const { candidateColumns } = require("./../data/configData");
const columns = Object.keys(candidateColumns);

candidatesCtrl.GetCandidates = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page number, default to 1
  const pageSize = parseInt(req.query.pageSize) || 10; // Get the page size, default to 10
  const filter = req.query.filter;
  const { onlyMe } = req.query


  try {
    let query = {};

    if (!_.isNil(filter)) {
      // If a filter is provided, create a query that searches all candidate columns
      query = {
        $or: [
          ...columns.filter((column) => {
            // Exclude url columns (cv_zonajobs and cv_bumeran)
            if (column === 'cv_zonajobs' || column === 'cv_bumeran' || column === 'id' || column === '_id') {
              return false;
            }
            // Search other string columns with case-insensitive regex
            if (candidateColumns[column].type === String) {
              return true;
            }
            return false;
          }).map((column) => ({
            [column]: { $regex: filter, $options: "i" },
          }))
        ],
      };
    }

    if (!_.isNil(onlyMe)) 
      query.last_modified_by = { $regex: onlyMe, $options: "i" };
    
    const totalCandidates = await Candidate.countDocuments(query);
    const candidates = await Candidate.find(query)
      .skip((page - 1) * pageSize) // Skip the first (page-1) * pageSize documents
      .limit(pageSize); // Limit the results to pageSize

    res.json({
      candidates,
      totalPages: Math.ceil(totalCandidates / pageSize),
      currentPage: page,
      pageSize
    });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

candidatesCtrl.UpdateCandidate = async (req, res) => {
  try {
    const candidateUpdated = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.send({ candidateUpdated });
  } catch (err) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = candidatesCtrl;

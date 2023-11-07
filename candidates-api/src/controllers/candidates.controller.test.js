const candidatesCtrl = require('./candidates.controller'); 
const Candidate = require('./../models/Candidate'); 

jest.mock('./../models/Candidate');

describe('GetCandidates', () => {
  it('should return candidates', async () => {
    // Mock request and response objects
    const req = { query: {} };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };

    Candidate.countDocuments.mockResolvedValue(10);

    // Mock the Candidate.find method to return a query with an exec method
    const mockQuery = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue([
        { _id: '1', name: 'Aiden Armstrong' },
        { _id: '2', name: 'Alta Mathis' },
      ]),
    };

    Candidate.find.mockReturnValue(mockQuery);

    await candidatesCtrl.GetCandidates(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      candidates: expect.any(Object),
      totalPages: expect.any(Number),
      currentPage: expect.any(Number),
      pageSize: expect.any(Number),
    }));
  });

});

describe('UpdateCandidate', () => {
  it('should update a candidate and return the updated candidate', async () => {
    // Mock request and response objects
    const req = {
      params: { id: '123' },
      body: {
        reason: '1'
      },
    };
    const res = {
      send: jest.fn(),
    };

    const updatedCandidateData = { _id: '123' };
    Candidate.findByIdAndUpdate.mockResolvedValue(updatedCandidateData);

    await candidatesCtrl.UpdateCandidate(req, res);

    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      candidateUpdated: expect.any(Object),
    }));
  });
});

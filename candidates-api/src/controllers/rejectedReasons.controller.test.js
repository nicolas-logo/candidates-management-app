const rejectedReasonCtrl = require('./rejectedReasons.controller');
const RejectedReason = require('./../models/RejectedReason');

jest.mock('./../models/RejectedReason');

describe('GetRejectedReasons', () => {
  it('should return a list of rejected reasons', async () => {
    // Mock request and response objects
    const req = {};
    const res = {
      json: jest.fn(),
    };

    const mockRejectedReasons = [
      { _id: '1', reason: 'No estudia/o carreras deseadas' },
      { _id: '2', reason: 'Edad fuera de rango' },
    ];
    RejectedReason.find.mockResolvedValue(mockRejectedReasons);

    await rejectedReasonCtrl.GetRejectedReasons(req, res);

    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      rejectedReasons: expect.any(Array),
    }));
  });

  it('should handle errors', async () => {
    // Mock request and response objects
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    // Mock an error when calling RejectedReason.find
    const errorMessage = 'An error occurred';
    RejectedReason.find.mockRejectedValue(new Error(errorMessage));

    await rejectedReasonCtrl.GetRejectedReasons(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});

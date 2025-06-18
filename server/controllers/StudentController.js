const Student = require('../models/Student');
exports.confirmFee = async (req, res) => {
  try {
    const { studentId, response } = req.query;

    const status = response === 'yes' ? 'confirmed' : 'denied';
    const feeStatus = response === 'yes' ? 'paid' : 'not paid';
    const now = new Date();

    const student = await Student.findByIdAndUpdate(
      studentId,
      {
        confirmationStatus: status,
        feeStatus: feeStatus
      },
      { new: true }
    );

    if (!student) {
      return res.status(404).send('Invalid student ID.');
    }

    res.send(`
      <h2>Thank you, ${student.name}.</h2>
      <p>Your response "${response}" has been recorded on ${now.toLocaleString()}.</p>
    `);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error during confirmation.');
  }
};

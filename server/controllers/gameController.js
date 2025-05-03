exports.handleGameState = (req, res) => {
  const { index } = req.body;

  if (typeof index !== 'number' || index < 0 || index > 8) {
    return res.status(400).json({ message: 'fail', reason: 'Invalid index' });
  }

  console.log('Controller received cell index:' + index);

  res.json({ message: 'success' });
};
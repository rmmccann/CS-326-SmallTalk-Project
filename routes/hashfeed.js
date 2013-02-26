
/*
 * GET hash feed.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hashfeed' });
};
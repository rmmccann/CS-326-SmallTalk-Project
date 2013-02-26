
/*
 * GET hash feed.
 */

exports.feed = function(req, res){
  res.render('index', { title: 'Hashfeed' });
};
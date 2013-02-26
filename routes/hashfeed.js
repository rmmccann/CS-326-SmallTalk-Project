
/*
 * GET hash feed.
 */

exports.feed = function(req, res){
  res.render('hashfeed', { title: 'Hashfeed' });
};
var async = require('async');
var t = require('./t');
var log = t.log;

/**
 * 按顺序依次执行一组函数。每个函数产生的值，都将传给下一个。类似读数据库的操作，连接数据库->查询数据库->处理数据等。
 * 如果中途出错，后面的函数将不会被执行。错误信息将传给waterfall最终的callback。之前产生的结果被丢弃。
 *
 * 这个函数名为waterfall(瀑布)，可以想像瀑布从上到下，中途冲过一层层突起的石头。
 *
 * 注意，该函数不支持json格式的tasks
 */
// async.waterfall(tasks, [callback]);

/**
 * 所有函数正常执行，每个函数的结果都将变为下一个函数的参数。
 *
 * 注意，所有的callback都必须形如callback(err, result)，但err参数在前面各函数中无需声明，它被自动处理。
 */
// 1.1
async.waterfall([
    function(cb) { var n = 3; cb(null, n); },//cb是下一个函数，n是它的第一个参数
    function(n, cb) { n = n + 2; cb(null, n); },//cb是下一个函数，n是它的第一个参数
    function(n, cb) { n = n + 1; cb(null, n*n); }//cb是方括号后的函数，所以null就是err，n*n就是result
], function (err, result) {
    log('err: ', err);
    log('result: ', result);
});
//err: null
//result: 36

/**
* 中途有函数出错，其err直接传给最终callback，结果被丢弃，后面的函数不再执行。
*/
// 1.2
async.waterfall([
    function(cb) { log('1.2.1: ', 'start'); cb(null, 3); },
    function(n, cb) { log('1.2.2: ', n); t.inc(n, cb); },
    function(n, cb) { log('1.2.3: ', n); t.err('myerr', cb); },
    function(n, cb) { log('1.2.4: ', n); t.fire(n, cb); }
], function (err, result) {
    log('1.2 err: ', err);
    log('1.2 result: ', result);
});
//44.935> 1.2.1: start
//44.939> 1.2.2: 3
//45.140> 1.2.3: 4
//45.344> 1.2 err: myerr
//45.348> 1.2 result:

/**
* 注意： 以json形式传入tasks，将不会被执行!!
*/

var async = require('async');
var whois = require('./whois.js').whois;


/**
 * 对集合中的每一个元素，执行某个异步操作，得到结果。所有的结果将汇总到最终的callback里。
 * 与each的区别是，each只关心操作不管最后的值，而map关心的最后产生的值。
 *
 * 提供了两种方式：
 * 1. 并行执行。同时执行集合中的所有元素，结果汇总到最终callback里。出错，则立刻返回错误及已执行的结果，未执行的占个空位
 * 2. 顺序执行。依次执行集合中的元素，结果汇总到最终callback里。出错，则立刻返回错误及已执行的结果，未执行的被忽略。
 */
var num = ['nic', 'abc', '888', 'car', 'che', 'apple', 'iphone', 'mac', 'cnn', 'tea'];
var arr = num.map(function(val) {
    return val + '.com';
});

/**
 * 所有操作均正确执行，未出错。所有结果按元素顺序汇总给最终的callback。
 */
// 1.1
async.map(arr, function(val, callback) {
    whois(val, callback);
}, function(err, results) {
    console.log(results);
});
//最终whois的结果都存在results数组中

/**
* 顺序执行，一个完了才执行下一个。
*/
//1.2
async.mapSeries(arr, function(val, callback) {
    whois(val, callback);
}, function(err, results) {
    console.log(results);
});

/**
 * 并行执行，同时最多2个函数并行，传给最终callback。
 */
//1.3
async.mapLimit(arr, 2, function(val, callback) {
    whois(val, callback);
}, function(err, results) {
    console.log(results);
});





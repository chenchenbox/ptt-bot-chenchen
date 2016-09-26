
'use strict'

const S = require('string')
const assert = require('assert')
const cheerio = require('cheerio')
const request = require('request')
const winston = require('winston')

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      name: 'warn-file',
      filename: '../logs/MovieInfo.log',
      level: 'info',
      timestamp: () => {return new Date},
      json: false
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: '../logs/MovieInfo.log',
      level: 'error',
      timestamp: () => {return new Date},
      json: false
    })
  ]
})

/**callback(err,top20info)**/
function getTop20 (callback) {
  assert.ok(typeof callback === 'function','callback should be a funtion')

  request('http://dorama.info/tw/drama/d_box_office.php',(err,res,html) => {
    if (!err && res.statusCode === 200){
      var $ = cheerio.load(html)
      var Top20 = []
      var _movieDOM = $('.table_g[width="99%"] tr').has('.table2_g[width="100%"] .td2_g[height=40]')

      _movieDOM.each(function(i, ele){
        var cur = {}  
        
        var _rank = $(this).find('font').first().text()
        if (_rank){
          if(parseInt(_rank)===(i+1)) {
            cur.mRank = _rank
            cur.mRanktype = 'Taiwan'
          } else {
            cur.mRank = _rank
            cur.mRanktype = 'HongKong'
          }
        } else {
          cur.mRank = null
          cur.mRanktype = null
          logger.warn('In getTop20(), %s is null while parsing movie page DOM','_rank')
        }

        /** movie name and flim corporation **/
        var _nameANcor = $(this).find('.td2_g[height=40] a[target="_blank"]').has('.sz0').text()
        if (_nameANcor) {
          var _name = S(_nameANcor).parseCSV('／')[0]
          cur.mName = S(_name).trim().s
          cur.mFlimCor = S(_nameANcor).parseCSV('／')[1]
        }else {
          cur.mName = null
          cur.mFlimCor = null
          logger.warn('In getTop20(), %s is null while parsing movie page DOM','_nameANcor')
        }

        var _newFF = $(this).find('.td2_g[height=40] font[color="#FF9900"]')
        var _new00 = $(this).find('.td2_g[height=40] font[color="#00CC00"]')
        cur.mIsNew = (_newFF.length===1 || _new00.length===1)
        ? true
        : false
        
        /** movie id and link **/
        var _idANlink = $(this).find('.td2_g[height=40] a[target="_blank"]').has('.sz0').attr('href')
        if (_idANlink){
          cur.mID = S(_idANlink).between('drama-','.html').s
          cur.mLink = S('http://dorama.info/drama-{{mID}}.html').template(cur).s
        } else {
          cur.mID = null
          cur.mLink = null
          logger.warn('In getTop20(), %s is null while parsing movie page DOM','_idANlink')
        }

        var _boxOffice = $(this).find('.td_dt_g[width=115]').text()
        if (_boxOffice) cur.mboxOffice = _boxOffice
        else {
          cur.mboxOffice = null
          logger.warn('In getTop20(), %s is null while parsing movie page DOM','_boxOffice')
        }

        cur.mCast = []
        var _cast = $(this).find('.td2_g a[target="NEWWIN"]')
        _cast.each(function(){
          cur.mCast.push({
            actName: $(this).text(),
            actID: S($(this).attr('href')).between('pf-','.html').s,
            actLink: 'http://dorama.info'+$(this).attr('href')
          })
          
        })
        Top20.push(cur)
      })
      callback(null,JSON.stringify(Top20))
    }else if(err){
      logger.error('In getTop20(), err was thrown from the request.js, %s', err)
      callback(err,null)
    }else {
      logger.error('In getTop20(), request did not act normally, the res.statusCode is %s', res.statusCode)
      callback(new Error('Request did not act normally, view ..logs/MovieInfo.log'),null)
    }
  })
}

getDetails('180275',(err)=>{if (err) throw err})
//mID = mid or link
function getDetails(mID, callback){
  // var mid = 'http://dorama.info/drama-18027.html'
  // var mid = '18027'
  assert.ok(typeof mID === 'string','mID should be a string')
  assert.ok(typeof callback === 'function','callback should be a funtion')
  
  var _Link = (S(mID).contains('http://dorama.info/drama')) 
  ? mID
  : 'http://dorama.info/drama-' + mID + '.html'

  request(_Link, (err, res, html)=>{
    if(!err && res.statusCode === 200) {
      var $ = cheerio.load(html)
      if (S($('body').text()).contains('【錯誤訊息中心】')){
        if (S($('body').text()).contains('沒有這個檔案!!!')){
          logger.error('In getDetails(), make sure the movie link or id (%s) is valid', mID)
          callback(new Error('cant not find the document, plz make sure the movie link or id is valid'),null)
        }else{
          logger.error('In getDetails(), err was thrown from the website: %s', $('body').text())
          callback(new Error('err was thrown from the website: '+$('body').text()),null)
        }
      }

      /****code***/

    } else if(err){
      logger.error('In getDetails(), err was thrown from request.js: %s', err)
      callback(err,null)
    }else {
      logger.error('In getDetails(), request did not act normally, the res.statusCode is %s', res.statusCode)
      callback(new Error('Request did not act normally, view ..logs/MovieInfo.log'),null)
    }
    
    /*  var $ = cheerio.load(html)
      console.log(res.statusCode)
      console.log($('body').text())
      logger.error('Err occured during fetch html pages (%s) in getDetails, err contents: %s', _Link, $('body').text())
     */
  })

}

exports.getTop20 = getTop20
exports.getDetails = getDetails

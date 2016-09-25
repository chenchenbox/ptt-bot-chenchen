
'use strict'

const S = require('string')
const fs = require('fs')//JUST FOR TEST
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

getTop20(()=>{})

/**callback(err,top20info)**/
function getTop20 (callback) {
  assert.ok(typeof callback === 'function','Callback should be a funtion')
  
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
          logger.warn('%s is null while parsing movie page DOM','_rank')
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
          logger.warn('%s is null while parsing movie page DOM','_nameANcor')
        }

        var _new = $(this).find('.td2_g[height=40] font[color="#FF9900"]')
        cur.mIsNew = (_new.length===1)
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
          logger.warn('%s is null while parsing movie page DOM','_idANlink')
        }
        
        var _boxOffice = $(this).find('.td_dt_g[width=115]').text()
        if (_boxOffice) cur.mboxOffice = _boxOffice
        else {
          cur.mboxOffice = null
          logger.warn('%s is null while parsing movie page DOM','_boxOffice')
        }
        
        cur.mCast = []
        var _cast = $(this).find('.td2_g a[target="NEWWIN"]')
        _cast.each(function(){
          cur.mCast.push({
            actName: $(this).text(),
            actLink: 'http://dorama.info'+$(this).attr('href')
          })
          
        })

        Top20.push(cur)
      })

      console.log(JSON.stringify(Top20))
      callback(null,'top20info')
    }else if(err){
      logger.error('Error has been throw out in request.js, %s', err)
      callback(err,null)
    }else {
      logger.error('Request did not act normally, the res.statusCode is %s', res.statusCode)
      callback(new Error('Request did not act normally, view ..logs/MovieInfo.log'),null)
    }
  })
}

exports.getTop20 = getTop20
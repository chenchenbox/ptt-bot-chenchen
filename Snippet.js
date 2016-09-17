/**

功能 : 鄉民大聲說
Input : 某個特定電影的所有文章內容
Output : 挑選用來呈現在網頁上的文章片段 (Ex: johnaqu: 今天剛看完，我認為這部就是衝著影帝的演技才能這麼好看的)
Step 1. 先過濾文章 : 僅保留 [ 雷] 的電影心得
Step 2. 挑選符合資格的鄉民評價片段並進行排序 : 挑選具有代表性(有趣、獨特與吸引人) 定義了五個挑選準則
Step 3. 將文章進行排序 : 選擇哪些Doucument應該要呈現給使用者 (Doucument Ranking)

挑選片段的五個準則
(1)有客觀闡述電影的描述句，且越完整越好
分為一些Pattern架構 : (描述電影之詞彙 Adv. Adj. N. 都先人工挑選)
Adj. + N. + Adv. (Ex 好看的電影之一)
N. + Adj. (Ex 這部不悶)
Adv. + Adj. (Ex 有史以來最好看)
N. + Adv. + Adj. (Ex 演員之演技都很到位)
Adj. + N. (Ex 很棒的動畫)
每個片段之每個句子偵測是否包含該Pattern, 有包含到Pattern的句子越多越好

(2)是否包含一些特殊吸引人的關鍵字 (Keywords.)
Keywords為人工挑選的詞彙: Ex. 奧斯卡、彩蛋、影帝...等

(3)字數是否達 20~50 字
太多與太少均不妥

(4)刪除開頭為 '噓' 之片段 : 原因為與文章的立場不相似

(5)包含該特定電影的特殊原素 Ex : 導演名子(李安)，演員名子(湯姆漢克斯) 目前知識不足, 尚無法實作

!!!根據定義的準則先篩選後排序
篩選的標準:
至少含有一個(1)之Pattern,
(3)字數不足太多均不行,
(4)噓的片段必刪

排序的標準
含有(1)之Pattern越多越好, 每個Pattern之權重可以不一樣 Ex (Adj. + N. + Adv. 3分)(Adv. + Adj. 2分)
有Kwywords的加一些分
與(5)符合之有加分

node style: https://github.com/RisingStack/node-style-guide
https://github.com/feross/standard //snazzy
**/

'use strict'

const assert = require('assert')

const MoviePhrase = {
  Adj: [
    '感動', '好看', '動人', '有感覺', '值得看', '精彩', '感觸', '平穩', '無趣', '平淡', '無聊', '難看', '合口味',
    '推薦', '悶', '不錯', '四平八穩', '不賴', '欣賞', '張力', '高潮', '原汁原味', '印象深刻', '零散', '細緻',
    '緊繃', '草草的', '特別', '有感', '多'
  ],

  Adv: [
    '真心覺得', '很多', '非常', '最', '近期', '很深層', '真的', '超', '唯一', '滿滿的', '不', '個人覺得', '很',
    '很深', '一下', '好好', '太多', '讓人', '沒有', '莫名', '有史以來', '特別', '之一'
  ],

  N: [
    '電影', '心得', '導演', '真實事件', '電影院', 'IMAX', '預告', '重點', '普雷', '好雷', '負雷', '彩蛋', '結束',
    '畫面', '奧斯卡'
  ]
}

const SentencePattern = {
  '["Adj","N","Adv"]': 3,
  '["N","Adj"]': 3,
  '["Adv","Adj"]': 3,
  '["N","Adv","Adj"]': 3,
  '["Adj","N"]': 3
}

const invaluableType = {
  POSconflict: 'There are POS conflict in sentence'
}

var testS = new Snippet('朋友若很多要我推薦電影，我會推薦屍速，特別好看莫名')
console.dir(testS)
console.dir(testS.senPhrases)
console.dir(testS.senPOS)

function Snippet (str) {
  assert(typeof str === 'string', 'Notice that: str should be a string')

  this.value = {
    isIconic: true, // 具有代表性
    invaluableReason: undefined, // Reason for not isIconic, if isIconic is true, then invaluableReason = undefined
    scores: undefined // 完整性分數
  }
  this.content = str
  this.sentences = getSentences(str) // Snippet由Sentence組成
  this.numWords = str.length
  this.senPhrases = this.sentences.map(getSenPhrases)
  this.senPOSPattern = getSenPOS(this)
  this.senFittedPatterns = this.senPOSPattern.map(senFittedPatterns)
  this.author = 'who?'
  this.commentDate = 'when?'
  this.commentType = '推 | 噓 | ->?'

  function getSentences (str) {
    return str.split(/[\s,!，~！;。]+/)
  }

  function getSenPhrases (sen) {
    var Pharses = {
      Adj: [],
      Adv: [],
      N: []
    }

    for (var _ in MoviePhrase) {
      for (var _2 in MoviePhrase[_]) {
        if (sen.search(MoviePhrase[_][_2]) !== -1) Pharses[_].push(MoviePhrase[_][_2])
      }
    }
    return Pharses
  }

  function getSenPOS (_self) {
    var sens = _self.sentences
    var phrs = _self.senPhrases
    var POSlocs = []

    for (var _ in sens) { // for each sentence
      var loc = { // 偵測Sentence含MoviePhrases的詞性位置(POS Location), POS為Part Of Speech的縮寫
        Adj: [],
        Adv: [],
        N: []
      }

      for (var _2 in phrs[_]) { // for each type of POS
        for (var _3 in phrs[_][_2]) { // for each matched phrase
          loc[_2].push(sens[_].search(phrs[_][_2][_3]))
        }
        loc[_2] = loc[_2].filter(onlyUnique) // Avoid: '很' && '很多' get same location
        loc[_2] = loc[_2].sort(ascending) // 位置由小到大排序
      }

      POSlocs.push(loc)
    }

    // Special Case (Avoid: 同一詞彙兩種詞性表示)
    POSlocs = removePOSconflict(POSlocs, _self)

    /** 排序句子的POS, insert from loc to POSPattern one by one **/
    var senPOSPattern = POSlocs.map((loc) => {
      var POSPattern = [] // 句子的POS Pattern, e.g. ['Adv','Adj'] => 'Adv'+'Adj'
      var POSPatternloc = [] // POS位於句子中的位置, e.g. [3,7] => 'Adv':3, 'Adj':7

      for (var _ in loc) { // for each type of POS
        for (var _2 in loc[_]) { // for each phrase
          var current = POSPattern.length // current POS pointer in locs

          if (current === 0) {
            POSPattern.push(_)
            POSPatternloc.push(loc[_][_2])
          } else {
            var index // index for inserting in POSPattern

            /** Search pointer for inserting index **/
            for (var _3 in POSPatternloc) {
              if (loc[_][_2] > POSPatternloc[_3]) {
                if (parseInt(_3) === (POSPatternloc.length - 1)) {
                  if (_ === POSPattern[_3]) index = false
                  else index = _3 + 1
                }
              } else {
                if (_ === POSPattern[_3] || _ === POSPattern[_3 - 1]) index = false
                else index = _3
                break
              }
            }
            /** Inserting **/
            if (index) {
              POSPattern.splice(index, 0, _)
              POSPatternloc.splice(index, 0, loc[_][_2])
            }
          }
        }
      }
      return POSPattern
    })
    return senPOSPattern
  }

  function senFittedPatterns (sentence) {
    return true
  }
}

/** An callback for getting only unique value in arr.filter(callback) **/
function onlyUnique (value, index, _self) {
  return _self.indexOf(value) === index
}

/** An ascending callback for arr.sort(callback) **/
function ascending (a, b) {
  return a - b
}

/** Avoid: 同一詞彙兩種詞性表示, Ex: '特別' => 'Adj' & 'Adv' **/
function removePOSconflict (POSloc, _self) {
  for (var _ in _self.sentences) {
    var POS = Object.keys(POSloc[_])
    var Pairs = pairwise(POS)

    for (var _2 = 0; _2 < Pairs.length; _2++) {
      // Check if conflict happens
      if (haveSameElem(POSloc[_][Pairs[_2][0]], POSloc[_][Pairs[_2][1]])) {
        var sameEle = haveSameElem(POSloc[_][Pairs[_2][0]], POSloc[_][Pairs[_2][1]])

        // 將詞性重複的詞彙選擇為句中較缺少的詞性, 無法判定何為缺少時則設為非代表性
        if (POSloc[_][Pairs[_2][0]].length === POSloc[_][Pairs[_2][1]].length) {
          _self.value.isIconic = false
          _self.value.invaluableReason = invaluableType.POSconflict
        } else {
          // POS which is undesirable and going to removed
          var removal = (POSloc[_][Pairs[_2][0]].length > POSloc[_][Pairs[_2][1]].length)
          ? Pairs[_2][0]
          : Pairs[_2][1]
          // Reallocate the POSlocation, i.e. remove the conflict ones
          for (var _3 in sameEle) POSloc[_][removal].splice(POSloc[_][removal].indexOf(sameEle[_3]), 1)
        }
      }
    }
  }
  return POSloc
}

/** Return "pair combinations" of an array **/
function pairwise (arr) {
  var pairs = []

  for (var _ in arr) {
    for (var _2 in arr) {
      if (_ > _2) pairs.push([arr[_], arr[_2]])
    }
  }

  return pairs
}

/** 檢測兩陣列是否含有相同的元素, 同一詞彙其相同位置會出現在不同詞性 **/
function haveSameElem (arr1, arr2) {
  var lookup = {}
  var sameEle = []

  for (var _ in arr1) lookup[arr1[_]] = arr1[_]
  for (_ in arr2) if (typeof lookup[arr2[_]] !== 'undefined') sameEle.push(arr2[_])

  if (sameEle.length === 0) return false
  else return sameEle
}
// Snippet.prototype.setMovieMoviePhrase = function () {

// }

// Snippet.prototype.setMoviePatterns = function () {

// }

// Snippet.prototype.setMovieKeywords = function () {

// }

var hiphens = ['-powered', '-based', '-enabled'];
var words = ['AI', 'ML', 'Blockchain', 'IOT', 'Cloud', 'VR', 'AR', 'NLP'];

/**
 * Returns a random element from a list.
 * @param {Array} list
 * @return {Any}
 */
function getRandomValue(list) {
  let random = parseInt(Math.random() * 100);
  return list[random % list.length];
}

/**
 * Generates a buzzword.
 * @return {String}
 */
function generateBuzzword() {
  return `${getRandomValue(words)}${getRandomValue(hiphens)}`;
}

/**
 * Returns whether or not a string starts with a vowel.
 * @param {String} str
 * @return {Boolean}
 */
function startsWithVowel(str) {
  var vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.indexOf(str.toLowerCase()[0]) >= 0;
}

/**
 * Return "A" or "An" to be used based on the word.
 * @param {String} word Word for which to get A or An.
 * @param {String} existing Existing word occuring before the word (Used to determine case)
 * @return {String}
 */
function getAOrAn(word, existing) {
  if (!existing) {
    existing = 'A';
  }

  // Does `existing` start with upper case?
  var startsWithUpperCase = existing[0].toUpperCase() === existing[0];

  // First part of `word`
  var first = word.split('-')[0];

  // Is `first` an abbreviation?
  var isAbbr = first === first.toUpperCase();

  if (isAbbr) {
    return startsWithUpperCase ? 'An' : 'an';
  }

  console.log('word', word);
  if (startsWithVowel(word)) {
    return startsWithUpperCase ? 'An' : 'an';
  } else {
    return startsWithUpperCase ? 'A' : 'a';
  }
}

/**
 * Buzzwordifies a pitch.
 * @param {String} pitch
 * @return {String}
 */
function buzzwordify(pitch) {
  // Store for used buzzwords.
  var usedWords = [];

  var split = pitch.split(' ');
  split = split.filter(function(s) {
    return s.trim().length > 0;
  });
  lowerCaseSplit = split.map(function(s) {
    return s.toLowerCase();
  });

  // Put buzzword as first word if pitch doesn't start with "A" or "An".
  if (!(lowerCaseSplit[0] === 'a' || lowerCaseSplit[0] === 'an')) {
    var currentWord = generateBuzzword();
    usedWords.push(currentWord);
    split.splice(0, 0, currentWord);
  }
  // Put buzzword as second word if pitch starts with "A" or "An".
  else {
    var currentWord = generateBuzzword();
    usedWords.push(currentWord);
    split.splice(1, 0, currentWord);

    // Fix grammar.
    split[0] = getAOrAn(currentWord, split[0]);
  }

  // Split has changed, map again.
  lowerCaseSplit = split.map(function(s) {
    return s.toLowerCase();
  });

  // Put some buzzword a word before any occuring "for".
  var forIndex = lowerCaseSplit.indexOf('for');
  if (forIndex > 0) {
    var currentWord = generateBuzzword();

    // Don't use already-used jargon.
    while (usedWords.indexOf(currentWord) != -1) {
      currentWord = generateHyphenatedJargon();
    }
    split.splice(forIndex - 1, 0, currentWord);

    // Tries to satisfy Grammar Nazis a little bit.
    if (forIndex - 2 >= 0) {
      var s = split[forIndex - 2].toLowerCase();
      if (s === 'a' || s === 'an') {
        split[forIndex - 2] = getAOrAn(currentWord, split[forIndex - 2]);
      }
    }
  }

  // Generate pitch again.
  pitch = split.join(' ');

  return pitch;
}

/**
 * Initializes page.
 */
function initPage () {
  document.forms[0].addEventListener('submit', function (e) {
    e.preventDefault();

    var pitch = document.getElementById('pitch').value;
    if (!pitch) return;
    var newPitch = buzzwordify(pitch);
    document.getElementById('buzzwordified').value = newPitch;
  });

  document.forms[1].addEventListener('submit', function (e) {
    e.preventDefault();
  });
}

initPage();
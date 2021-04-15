function Search(text: string, word: string) {

    this.text = text;
    this.word = word;

    this.searchWordInText = function () {
        return this.text;
    };

    this.getWord = function () {
        return this.word;
    };

}

function SearchAdapter(adapter) {

    this.adapter = adapter;

    this.searchWordInText = function () {
        return `Эти слова ${this.adapter.getWord()} найдены в тексте ${this.adapter.searchWordInText()}`;
    };

}

const search = new Search('текст', 'слова');
const searchAdapter = new SearchAdapter(search);

console.log(searchAdapter.searchWordInText());

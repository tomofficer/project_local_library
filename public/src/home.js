function getTotalBooksCount(books) {
  return books.length;
}


function getTotalAccountsCount(accounts) {
  return accounts.length;
}



function getBooksBorrowedCount(books) {
  let total = [];
    books.forEach( book => {
    let keptBorrows = book.borrows.filter( borrow => {
      if(!borrow.returned){return borrow}
    })
    if(keptBorrows.length > 0){
      total.push(book)
    }
  })
  return total.length;
}


function getMostCommonGenres(books) {
  const genreOptions = books.map( book => book.genre);
  const common = [];
  genreOptions.map( genre => {
    const newGenre = common.findIndex( type => type.name === genre);
    if (newGenre >= 0) { common[newGenre].count += 1; }
    else common.push({name: genre, count: 1});
  });
  common.sort((a, b) => b.count - a.count);
  if (common.length > 5) {
    return common.slice(0, 5);
  }
  return common;
}


function getMostPopularBooks(books) {
  let results = [];
  const borrows = books.reduce((acc, book) => {results.push({name: book.title, count: book.borrows.length});},[]);
  return topFive(results); 
}


function getMostPopularAuthors(books, authors) {
  let mostPop = [];
  let matchingBook = books.filter( book => authors.find( author => author.id === book.authorId ));
  matchingBook.forEach( book => { 
    let author = authors.find( author => author.id === book.authorId);
    mostPop.push({ name: `${author.name.first} ${author.name.last}`,
                 count: book.borrows.length })
    });
  return topFive(mostPop);
}


//helper function to limit arrays to 5!
function topFive(array) {
  let results = array.sort((countA, countB) => (countA.count < countB.count ? 1 : -1)).slice(0, 5);
  return results;
}


module.exports = {
  topFive,
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

function findAuthorById(authors, id) {
  for (let i = 0; i < authors.length; i++) {
    if (authors[i].id === id) {
      return authors[i];
    }
  }
}


function findBookById(books, id) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
      return books[i];
    }
  }
}

function partitionBooksByBorrowedStatus(books) {
  let returned = [];
  let kept = [];

  books.forEach((book) => {
    let keptBorrows = book.borrows.filter((borrow) => {
      if(!borrow.returned){return borrow}
    })

    if(keptBorrows.length > 0){
      kept.push(book)
    }
    else(
      returned.push(book)
    )
  })

  return [kept, returned];
}


function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  const borrowers = borrows.map(({ id, returned }) => {
  const user = accounts.find( account => account.id === id);
  return {
  ...user,
  returned
  };
  })
  return borrowers
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

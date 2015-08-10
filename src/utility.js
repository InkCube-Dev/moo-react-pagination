
let Utility = {
  /**
   * Calculate total pages
   * @param  {Number} count
   * @param  {Number} perPage
   * @return {Number}
   */
  calcTotalPages(count, perPage) {
    return Math.ceil(count / perPage);
  },

  /**
   * Calculate start & end cells
   * @param  {Number} numberCells
   * @param  {Number} page
   * @param  {Number} totalPages
   * @return {Object}
   */
  calcStartEndCells(numberCells, page, totalPages) {
    let leftShift = 0,
        rightShift = 0,
        push = 0,
        toShift = false;
    if (totalPages > numberCells) {
      leftShift = Math.floor(numberCells / 2);
      rightShift = Math.ceil(numberCells / 2) - 1;
      toShift = true;
    }
    if (page - leftShift < 1) {
      push = leftShift - page + 1;
    }
    if (page + rightShift > totalPages) {
      push -= (page + rightShift) - totalPages;
    }
    return {
      startCell: toShift ? page - leftShift + push : 1,
      endCell: (toShift ? page + rightShift + push : totalPages),
    };
  },

  /**
   * Generate number range
   * @param  {Number} start
   * @param  {Number} end
   * @return {Array}
   */
  generateRange(start, end) {
    return Array.apply(null, Array(end - start + 1)).map((_, i) => {
      return i + start;
    });
  },
};

export default Utility;

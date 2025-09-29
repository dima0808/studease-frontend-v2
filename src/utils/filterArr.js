export const filterArr = (arr, { sortBy = "all", search }) => {
  return arr
    .filter(item => {
      if (sortBy === "all") return true
      if (sortBy === "active") return item.isActive === true
      if (sortBy === "unactive") return item.isActive === false
      if (sortBy === "inuse") return item.usedInTests > 0
      if (sortBy === "notinuse") return item.usedInTests === 0
      return true
    })
    .filter(item => {
      if (!search?.trim()) return true
      return item.name.toLowerCase().includes(search.toLowerCase())
    })
}

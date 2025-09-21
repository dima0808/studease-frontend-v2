export const filterTests = (tests, { sortBy, search }) => {
  return tests
    .filter(test => {
      if (sortBy === "all") return true
      if (sortBy === "active") return test.isActive === true
      if (sortBy === "unactive") return test.isActive === false
      return true
    })
    .filter(test => {
      if (!search?.trim()) return true
      return test.name.toLowerCase().includes(search.toLowerCase())
    })
}

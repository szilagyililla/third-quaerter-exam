function findPartner(customer, candidates) {
  const matchingCandidates = candidates.filter(candidate =>
    candidate.favoriteGenre === customer.favoriteGenre &&
    candidate.hobbies.some(hobby => customer.hobbies.includes(hobby))
  );

  if (matchingCandidates.length === 0) {
    return null;
  }

  return matchingCandidates.reduce((youngest, current) => 
    current.age < youngest.age ? current : youngest
  );
}

module.exports = findPartner
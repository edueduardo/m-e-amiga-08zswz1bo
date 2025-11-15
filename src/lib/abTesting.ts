export type ABTestGroup = 'A' | 'B'

const AB_TEST_GROUP_KEY = 'mae-amiga-ab-test-group'

/**
 * Assigns a user to an A/B test group randomly and stores it in localStorage.
 * If a group is already assigned, it returns the existing group.
 * @returns {ABTestGroup} The assigned group ('A' or 'B').
 */
export const getOrAssignABTestGroup = (): ABTestGroup => {
  let group = localStorage.getItem(AB_TEST_GROUP_KEY) as ABTestGroup | null

  if (!group || (group !== 'A' && group !== 'B')) {
    group = Math.random() < 0.5 ? 'A' : 'B'
    localStorage.setItem(AB_TEST_GROUP_KEY, group)
  }

  return group
}

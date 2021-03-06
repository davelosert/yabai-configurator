const { describe } = require('riteway');
const { planSpaces } = require('./planSpaces');

describe('planSpaces()', async assert => {
  assert({
    given: 'one space exists on a single screen and only one is needed',
    should: 'return 0 for that display',
    actual: planSpaces({ actualSpaces: [{ display: 1 }], desiredSpaces: [['ExampleApp']] }),
    expected: [0]
  });

  assert({
    given: 'one space exists on a single screen and two are needed',
    should: 'return 1 for that display',
    actual: planSpaces({ actualSpaces: [{ display: 1 }], desiredSpaces: [[['TestApp1'], ['TestApp2']]] }),
    expected: [1]
  });

  assert({
    given: 'three spaces exist on a single screen but only one is needed',
    should: 'return -2 for that display',
    actual: planSpaces({ actualSpaces: [{ display: 1 }, { display: 1 }, { display: 1 }], desiredSpaces: [[['TestApp1']]] }),
    expected: [-2]
  });

  assert({
    given: 'one space on the display but no app is given',
    should: 'keep the only space as it is not deletable',
    actual: planSpaces({ actualSpaces: [{ display: 1 }], desiredSpaces: [[]] }),
    expected: [0]
  });

  assert({
    given: 'one space exists on the second screen but three are needed',
    should: 'return three for that second display',
    actual: planSpaces({ actualSpaces: [{ display: 1 }, { display: 2 }], desiredSpaces: [[], [['App1'], ['App2'], ['App3']]] }),
    expected: [0, 2]
  });

  assert({
    given: 'one space on second display exists but is missing in desired spaces',
    should: 'leave it untouched',
    actual: planSpaces({ actualSpaces: [{ display: 1 }, { display: 2 }], desiredSpaces: [[['App1']]] }),
    expected: [0, 0]
  });

  assert({
    given: 'two spaces on second display exist but no configuration given in desired spaces',
    should: 'delete all but the last space for that display',
    actual: planSpaces({ actualSpaces: [{ display: 1 }, { display: 2 }, { display: 2 }], desiredSpaces: [[['App1']]] }),
    expected: [0, -1]
  });
});

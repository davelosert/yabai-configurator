const { describe } = require('riteway');
const { normalizeLayoutConfig } = require('./normalizeLayoutConfig');

const emptyTreeNode = {
  type: 'treeNode',
  split: 'vertical',
  windows: []
};

describe.only('normalizeLayoutConfig()', async assert => {
  assert({
    given: 'no window at all',
    should: 'return only space with with no windows',
    actual: normalizeLayoutConfig([[[]]]),
    expected: [{
      display: 1,
      index: 1,
      windowTree: emptyTreeNode
    }]
  });

  assert({
    given: 'empty spaces on two displays',
    should: 'set correct display index and an absolute space index',
    actual: normalizeLayoutConfig([
      [[]],
      [[]]
    ]),
    expected: [
      { display: 1, index: 1, windowTree: emptyTreeNode },
      { display: 2, index: 2, windowTree: emptyTreeNode }
    ]
  });

  assert({
    given: 'space with window as string',
    should: 'normalized treeNode with a single window with string in app field',
    actual: normalizeLayoutConfig([
      [['FireFox']]
    ]),
    expected: [
      {
        display: 1,
        index: 1,
        windowTree: {
          type: 'treeNode',
          split: 'vertical',
          windows: [{
            type: 'window',
            app: 'FireFox'
          }]
        }
      }
    ]
  });

  assert({
    given: 'space with a window as object',
    should: 'only add "type: window"',
    actual: normalizeLayoutConfig([
      [[{ app: 'FireFox', size: '4/4' }]]
    ]),
    expected: [
      {
        display: 1,
        index: 1,
        windowTree: {
          type: 'treeNode',
          split: 'vertical',
          windows: [{
            type: 'window',
            app: 'FireFox',
            size: '4/4'
          }]
        }
      }
    ]
  });

  assert({
    given: 'a space with only a horizontal split object',
    should: 'treat it as a tree node and insert windows as window objects',
    actual: normalizeLayoutConfig([
      [[
        { split: 'horizontal', windows: ['FireFox', 'iTerm2'] }]]
    ]),
    expected: [
      {
        display: 1,
        index: 1,
        windowTree: {
          type: 'treeNode',
          split: 'vertical',
          windows: [{
            type: 'treeNode',
            split: 'horizontal',
            windows: [{
              type: 'window',
              app: 'FireFox',
            },
            {
              type: 'window',
              app: 'iTerm2'
            }]
          }]
        }
      }
    ]
  });

  assert({
    given: 'a space with only a horizontal split object as root object',
    should: 'have the horizontal tree node as top level object',
    actual: normalizeLayoutConfig([
      [{ split: 'horizontal', windows: ['FireFox', 'iTerm2'] }]
    ]),
    expected: [
      {
        display: 1,
        index: 1,
        windowTree: {
          type: 'treeNode',
          split: 'horizontal',
          windows: [{
            type: 'window',
            app: 'FireFox',
          },
          {
            type: 'window',
            app: 'iTerm2'
          }]
        }
      }
    ]
  });
});
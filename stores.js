import { writable, get } from "svelte/store";

// Recursively delete children, by giving array of nodeKeys
let arr = [];
const recursiveDelete = (nodeKeys, nodes) => {
  arr = [...arr, ...nodeKeys];
  let children = [...nodes.entries()]
    .filter((k) => nodeKeys.includes(k[1].parent))
    .map((n) => n[0]);
  if (nodeKeys && nodeKeys.length > 0) {
    recursiveDelete(children, nodes);
  }
  return arr;
};

function nodesMap(map) {
  const { subscribe, update, set } = writable(map);
  const addNode = (node, nodeKey) => {
    update((nodes) => {
      map.set(nodeKey, node);
      return nodes;
    });
  };
  const removeNodes = (nodeKeys) => {
    update((nodes) => {
      recursiveDelete(nodeKeys, nodes).map((d) => map.delete(d));
      return nodes;
    });
  };
  const updateNode = (nodeKey, state) => {
    update((nodes) => {
      map.set(nodeKey, state);
      return nodes;
    });
    return nodes;
  };
  return {
    set,
    update,
    subscribe,
    addNode,
    updateNode,
    removeNodes
  };
}

function selected(selectedNodes) {
  const { subscribe, update, set } = writable(selectedNodes);

  const selectNode = (nodeKey) => {
    update((selectedNodes) => {
      if (!selectedNodes.includes(nodeKey)) {
        if (get(keysPressed).includes("SHIFT")) {
          return [...selectedNodes, nodeKey];
        } else {
          return [nodeKey];
        }
      } else if (
        selectedNodes.includes(nodeKey) &&
        !get(keysPressed).includes("SHIFT")
      ) {
        return [nodeKey];
      } else {
        let others = selectedNodes.filter((s) => s !== nodeKey);
        return [...others];
      }
    });
  };

  return { subscribe, update, set, selectNode };
}

export const nodesCount = writable(0);
export const nodes = nodesMap(new Map([]));
export const selectedNodes = selected([]);

export const keysPressed = writable([]);
export const inputFocused = writable(false);

// https://www.gavsblog.com/blog/find-closest-number-in-array-javascript
// export const xGuides = writable([]);
// export const yGuides = writable([]);

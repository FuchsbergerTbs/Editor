import { writable, get } from "svelte/store";

function nodesMap(map) {
  const { subscribe, update, set } = writable(map);
  const addNode = (node, nodeKey) => {
    update((nodes) => {
      map.set(nodeKey, node);
      return nodes;
    });
  };
  const updateNode = (nodeKey, state) => {
    update((nodes) => {
      map.set(nodeKey, state);
      return nodes;
    });
  };
  const removeNodes = (nodeKeys) => {
    update((nodes) => {
      nodeKeys.map((k) => map.delete(k));
      return nodes;
    });
  };
  return { set, update, subscribe, addNode, updateNode, removeNodes };
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

<script>
  import { nodes, selectedNodes, nodesCount } from "../../stores.js";
  import { pannable } from "../../pannable.js";

  export let index;
  export let parent;
  export let layout;
  export let parentLayout;
  export let transformation;

  $: if (
    $nodes.get(index).transformation.x.value !== 0 &&
    $nodes.has(parent) &&
    parentLayout === "Grid"
  ) {
    console.log(parentLayout);
    nodes.update(() => {
      $nodes.get(index).transformation.x.value = 0;
      $nodes.get(index).transformation.y.value = 0;
      return $nodes;
    });
  }

  const handlePanMove = e => {
    if (!$nodes.has(parent) || $nodes.get(parent).layout === "Frame") {
      if (!$selectedNodes.includes(index)) {
        nodes.update(() => {
          $nodes.get(index).transformation.x.value += e.detail.x;
          $nodes.get(index).transformation.y.value += e.detail.y;
          return $nodes;
        });
      } else {
        $selectedNodes.map(s => {
          nodes.update(() => {
            $nodes.get(s).transformation.x.value += e.detail.x;
            $nodes.get(s).transformation.y.value += e.detail.y;
            return $nodes;
          });
        });
      }
    }
  };

  const addNode = () => {
    console.log(layout);
    nodes.addNode(
      {
        parent: index,
        layout: "Grid",
        transformation: {
          x: { value: 0, type: "px" },
          y: { value: 0, type: "px" },
          width: {
            auto: false,
            value: 50,
            type: "%"
          },
          height: {
            auto: true,
            value: 50,
            type: "%"
          }
        }
      },
      $nodesCount
    );
    $nodesCount++;
  };
</script>

<style>
  .node {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    box-shadow: inset 0 0 0 1px black;
  }
  .node:hover {
    box-shadow: inset 0 0 0 2px blue;
    color: blue;
  }
  .selected {
    box-shadow: inset 0 0 0 1px blue;
    color: blue;
  }
  .add {
    max-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }
</style>

<div
	use:pannable
  on:click|stopPropagation={() => selectedNodes.selectNode(index)}
  on:panmove|stopPropagation={handlePanMove}
  class="node"
  class:selected={$selectedNodes.includes(index)}
  style="position: {parentLayout === "Grid" ? "relative" : "absolute"};
    width: {transformation.width.auto ? "auto" : transformation.width.value + transformation.width.type};
    height: {transformation.height.auto ? "auto" : transformation.height.value + transformation.height.type};
    transform: translate({transformation.x.value + transformation.x.type}, {transformation.y.value + transformation.y.type})">
    <div class="add" on:click={addNode}>+</div>
    {#each [...$nodes.entries()].filter(n => n[1].parent === index && n[1].parent !== -1) as [i, node]}
        <svelte:self index={i} parent={index} layout={node.layout} parentLayout={layout} transformation={node.transformation} />
    {/each}
</div>
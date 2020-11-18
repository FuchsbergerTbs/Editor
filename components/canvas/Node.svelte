<script>
  import { nodes, selectedNodes, nodesCount } from "../../stores.js";
  import { pannable } from "../../pannable.js";

  export let index;
  export let parent;
  export let transformation;

  const select = () => {
    selectedNodes.set([index]);
  };

  const handlePanStart = e => {
    select();
  };

  const handlePanMove = e => {
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
  };

  const addNode = () => {
    nodes.addNode(
      {
        parent: index,
        layout: {
          type: "frame",
          padding: 0
        },
        transformation: {
          x: { value: 0, type: "px" },
          y: { value: 0, type: "px" },
          width: {
            value: 50,
            type: "%"
          },
          height: {
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
  div {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    box-shadow: inset 0 0 0 1px black;
  }
  div:hover {
    box-shadow: inset 0 0 0 2px blue;
    color: blue;
  }
  .selected {
    box-shadow: inset 0 0 0 1px blue;
    color: blue;
  }
</style>

<div
	use:pannable
  on:click|stopPropagation={() => selectedNodes.selectNode(index)}
  on:panmove|stopPropagation={handlePanMove}
  class:selected={$selectedNodes.includes(index)}
  style="width: {transformation.width.value + transformation.width.type};
    height: {transformation.height.value + transformation.height.type};
    transform: translate({transformation.x.value + transformation.x.type}, {transformation.y.value + transformation.y.type})">
    <button on:click={addNode}>Add child</button>
    {#each [...$nodes.entries()].filter(n => n[1].parent === index && n[1].parent !== -1) as [i, node]}
        <svelte:self index={i} parent={index} transformation={node.transformation} />
    {/each}
</div>
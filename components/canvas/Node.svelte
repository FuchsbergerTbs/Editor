<script>
  import { nodes, selectedNodes, nodesCount } from "../../stores.js";
  import { pannable } from "../../pannable.js";

  export let index;
  export let parent;
  export let layout;
  export let parentLayout;
  export let transformation;
  export let node;

  // For Stack check clientHeight and clientWidth instead of transformations
  $: if (
    node.nodeRef &&
    layout.type === "Stack" &&
    layout.direction === undefined
  ) {
    transformation.height.value = node.nodeRef.clientHeight;
  }

  const handlePanMove = e => {
    if (!$nodes.has(parent) || $nodes.get(parent).layout.type === "Frame") {
      if (!$selectedNodes.includes(index)) {
        transformation.x.value += e.detail.x;
        transformation.y.value += e.detail.y;
        nodes.updateNode(index, node);
      } else {
        $selectedNodes.map(s => {
          $nodes.get(s).transformation.x.value += e.detail.x;
          $nodes.get(s).transformation.y.value += e.detail.y;
          nodes.updateNode(s, $nodes.get(s));
        });
      }
    }
  };

  const addNode = () => {
    nodes.addNode(
      {
        parent: index,
        layout: {
          type: "Frame",
          direction: undefined,
          padding: 0,
          margin: 0
        },
        transformation: {
          position: "absolute",
          x: { value: 0, type: "px" },
          y: { value: 0, type: "px" },
          width: {
            value: 100,
            type: "px"
          },
          height: {
            value: 100,
            type: "px"
          }
        }
      },
      $nodesCount
    );
    console.log($nodes);
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
    background-image: url("https://images.unsplash.com/photo-1605718665998-85fbd49c5eff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
    background-size: cover;
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
    position: absolute;
    right: 0;
    margin-top: -24px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }
</style>

<div
  bind:this={node.nodeRef}
	use:pannable
  on:click|stopPropagation={() => selectedNodes.selectNode(index)}
  on:panmove|stopPropagation={handlePanMove}
  class="node"
  class:selected={$selectedNodes.includes(index)}
  style="
    position: {parentLayout.type === "Stack" ? transformation.position = "relative" : "absolute"};
    width: {transformation.width.value + transformation.width.type};
    height: {layout.type === "Stack" ? "auto" : transformation.height.value + transformation.height.type};
    transform: translate({parentLayout.type === "Frame" ? transformation.x.value + transformation.x.type : 0}, {parentLayout.type === "Frame" ? transformation.y.value + transformation.y.type : 0})">
    <div class="add" on:click={addNode}>+</div>
    {#each [...$nodes.entries()].filter(n => n[1].parent === index && n[1].parent !== -1) as [i, childNode]}
        <svelte:self
          index={i}
          node={childNode}
          parent={index}
          layout={childNode.layout}
          parentLayout={layout}
          transformation={childNode.transformation} />
    {/each}
</div>
<script>
  import { nodes, selectedNodes, nodesCount } from "../../stores.js";
  import Item from "./Item.svelte";

  const addNode = () => {
    nodes.addNode(
      {
        parent: -1,
        layout: "Frame",
        transformation: {
          position: "absolute",
          x: { value: Math.round(Math.random() * 800), type: "px" },
          y: { value: Math.round(Math.random() * 400), type: "px" },
          width: {
            value: Math.round(Math.random() * (400 - 40) + 40),
            type: "px"
          },
          height: {
            value: Math.round(Math.random() * (400 - 40) + 40),
            type: "px"
          }
        }
      },
      $nodesCount
    );
    $nodesCount++;
  };
</script>

<style>
  .outliner {
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    padding: 16px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-right: 1px solid black;
    grid-area: outliner;
    display: flex;
    flex-direction: column;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .outliner::-webkit-scrollbar {
    display: none;
  }
  .item {
    padding: 8px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
  }
  .item:hover {
    color: blue;
  }
</style>

<div class="outliner">
  <small class="item" on:click={addNode}>+</small>
  {#each [...$nodes.entries()].filter(n => n[1].parent === -1) as [i, node]}
    <Item parent={-1} item={i} />
  {/each}
</div>
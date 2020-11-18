<script>
  import { nodes, selectedNodes, nodesCount } from "../../stores.js";

  export let item;
  export let parent;
</script>

<style>
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

<div class="item" on:click={()=> selectedNodes.selectNode(item)}>
	<small style="color: {$selectedNodes.includes(item) ? " blue" : "inherit" }">{$selectedNodes.includes(item) ? "->" : ""}
		Node Nr. {item}</small>
</div>
<div style="margin-left: 16px">
{#each [...$nodes.entries()].filter(n => n[1].parent === item && n[1].parent !== -1) as [i, node]}
  <svelte:self parent={item} item={i} />
{/each}
</div>
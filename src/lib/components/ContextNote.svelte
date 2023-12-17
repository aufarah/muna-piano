<script>
    export let note_id
    import {scale_config} from "./stores.js"

    let delete_note = () => {
        delete $scale_config.mode.values[note_id] 
        $scale_config = $scale_config
        note_id-=1
    }
</script>


<div role="tooltip" class="absolute z-10 inline-block text-sm text-darkgreen transition-opacity duration-300 bg-chocomilk border border-darkgreen rounded-lg shadow-sm w-72">
    <div class="p-3 space-y-2">
        <button class="font-semibold" on:click={delete_note}>Delete</button>
    </div>
</div>